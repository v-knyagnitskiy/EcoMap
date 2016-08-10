# -*- coding: utf-8 -*-
"""
This module holds all views controls for
ecomap project.
"""
import os
import datetime

from flask_login import current_user
from jinja2 import Environment, FileSystemLoader
from flask import abort, render_template, session, request, \
                    make_response, Response, g

from admin_views import *
from user_views import *
from problem_views import *
from authorize_views import *
from ecomap.db import util as db
from ecomap.utils import parse_url
from ecomap.app import app, logger, auto, _CONFIG
from ecomap.permission import permission_control, check_permissions


@app.before_request
def load_users():
    """Function-decorator checks if user is authenticated, else creates
       Anonymous user instance.
       Launches before requests.
    """
    if current_user.is_authenticated:
        g.user = current_user
    else:
        anon = ecomap_user.Anonymous()
        g.user = anon
    logger.info('Current user is (%s), role(%s)' % (unicode(g.user),
                                                    g.user.role))


@app.after_request
def clear_cookie(responce):
    """Function-decorator deletes cookie if user id from
       cookie doesn`t exist in database.
       Launches after each requests
    """
    if not db.get_user_by_id(current_user.get_id()):
        for i in ['id', 'role', 'remember_token']:
            responce.delete_cookie(i)
    return responce


@app.before_request
def check_access():
    """Global decorator for each view.
    Checks user permission to access application resources before each request.
    Gets dynamic request params(user role, url, request method) from each
    request context and compares it with admin permissions stored in db.
    :return: nested function returns true or 403 status and denies access.
    """
    if 'access_control' not in session:
        session['access_control'] = permission_control.get_dct()
    access_rules = session['access_control']
    route = parse_url(request.url)

    access_result = check_permissions(current_user.role,
                                      route, request.method, access_rules)
    if not access_result['error']:
        access_status = access_result['status']
        logger.info('ACCESS STATUS: %s DETAILS:(url= %s[%s], user ID:%s (%s))',
                    access_status, route, request.method, current_user.uid,
                    current_user.role)
    else:
        logger.info('ACCESS: FORBIDDEN! DETAILS:(url= %s[%s],'
                    'user ID:%s (%s), errors=%s)'
                    % (route, request.method, current_user.uid,
                        current_user.role, access_result['error']))
        abort(403)


@app.route('/', methods=['GET'])
@auto.doc()
@app.cache.cached(timeout=_CONFIG['ecomap.static_cache_timeout'])
def index():
    """Controller starts main application page.
    Shows initial data of application, renders template with built-in Angular
    JS.

    :return: renders html template with angular app.
    """
    return render_template('index.html')



@app.route('/api/getTitles', methods=['GET'])
@auto.doc()
def get_titles():
    """This method returns short info about all defined static pages.

    :return: list of dicts with title, id, alias and is_enabled
    :rtype: JSON
    :JSON sample:
        ``[{'is_enabled': 1,
        'alias': 'alias_Tag',
        'id': 1,
        'title': 'Custom_Title'},
        {'is_enabled': 1,
        'alias': 'Tag',
        'id': 2,
        'title': 'AnotherTitle'}]``

    """
    if request.method == 'GET':
        pages = db.get_pages_titles()
        result = []
        if pages:
            for page in pages:
                result.append({'id': page[0],
                               'title': page[1],
                               'alias': page[2],
                               'is_enabled': page[3]})
        return Response(json.dumps(result), mimetype="application/json")


@app.route('/api/resources/<alias>', methods=['GET'])
@auto.doc()
def get_faq(alias):
    """This method retrieves exact faq page(ex-resource) via
    alias, passed to it.

    :param alias: url path to specific static page.

    :return: object with all page's attributes within a list or ``404``
        status.
    :rtype: JSON
    :JSON sample:
       ``[{'id': 1, 'title': 'title', 'alias': 'tag',
       'description': 'small description of page',
       'content': 'main article content',
       'meta_keywords': 'keyword1, keyword2',
       'meta_description': 'meta-description of content',
       'is_enabled': 1}]``

    """
    if request.method == 'GET':
        page = db.get_page_by_alias(alias)
        result = []
        status_code = 404
        if page:
            result = [{'id': page[0],
                       'title': page[1],
                       'alias': page[2],
                       'description': page[3],
                       'content': page[4],
                       'meta_keywords': page[5],
                       'meta_description': page[6],
                       'is_enabled': page[7]}]
            status_code = 200
        return Response(json.dumps(result), mimetype="application/json",
                        status=status_code)


@app.route('/documentation')
def documentation():
    """Hepler route for auto_documentation module.
    :return: rendered html with documentation api list.
    """
    return auto.html()

@app.route('/sitemap', methods=['GET'])
@auto.doc()
def get_sitemap():
    """This method generates XML for EcoMap application.

    :return: list of dicts with id, alias, created_date
    :rtype: XML
    :XML sample:
        <url>
            <loc>http://ecomap.new/#/map</loc>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>

    """
    if request.method == 'GET':
        resources = db.get_pages_titles()
        all_problems = db.get_all_problems()
        all_comments = db.get_all_comments()
        comments=[]
        for each_comment in all_comments:
            comment = [{'id': each_comment[0],
            'created_date':datetime.date.fromtimestamp(each_comment[1]),
            'problem_id': each_comment[2]
            }]
            comments.append(comment)
        problems = []
        for each_problem in all_problems:
            problem = [{'id': each_problem[0],
            'created_date': datetime.date.fromtimestamp(each_problem[7])}]
            problems.append(problem)
        base_dir = os.environ['CONFROOT']
         # Configure jinja for internal templates
        env = Environment(
        autoescape=True, 
        extensions=['jinja2.ext.i18n'],
        loader=FileSystemLoader(os.path.join(base_dir, 'templates')))
        url_root = request.url_root
        sitemap_xml = env.get_template("XML_Ecomap.xml").render(
        problems=problems, comments=comments, resources=resources, 
        url_root=url_root)
        response = make_response(sitemap_xml)
        response.headers['Content-Type'] = "application/xml"
    return response


if __name__ == '__main__':
    app.run()