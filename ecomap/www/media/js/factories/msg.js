app.factory('msg', function(toaster) {
  return msg = {
    editSuccess: function(msg) {
      toaster.pop('success', 'Редагування', 'Редагування ' + msg + ' здійснено успішно!');
    },
    deleteSuccess: function(msg) {
      toaster.pop('success', 'Видалення', 'Видалення ' + msg + ' здійснено успішно!');
    },
    createSuccess: function(msg) {
      toaster.pop('success', 'Додавання', 'Додавання ' + msg + ' здійснено успішно!');
    },
    editError: function(msg, type) {
      toaster.pop('error', 'Редагування', 'При редагуванні ' + msg + ' виникла помилка!' + type);
    },
    deleteError: function(msg, type) {
      toaster.pop('error', 'Видалення', 'При видаленні ' + msg + ' виникла помилка!' + type);
    },
    createError: function(msg, type) {
      toaster.pop('error', 'Додавання', 'При додаванні ' + msg + ' виникла помилка!' + type);
    },
    sendSuccess: function(msg, type) {
      toaster.pop('success', 'Відправлення', 'Відправлення ' + msg + ' здійснено успішно!');
    },
    sendError: function(msg, type) {
      toaster.pop('error', 'Відправлення', 'При відправленні ' + msg + ' виникла помилка!');
    },
    addCommentSuccess: function(msg, type) {
      toaster.pop('success', 'Додавання', 'Додавання ' + msg + 'виконано успішно!');
    },
    addCommentError: function(msg, type) {
      toaster.pop('error', 'Додавання', 'При додаванні ' + msg + ' виникла помилка!');
    },
    addCommentAnonimError: function(msg, type) {
      toaster.pop('error', 'Додавання', 'Виникла помилка при додаванні '+ msg +' необхідно зареєструватися або залогінитись!');
    },
    editNicknameError: function(msg, type) {
      toaster.pop('error', 'Редагування', 'Виникла помилка при редагуванні '+ msg +' даний псевдонім вже зайнятий');
    },
    restoreError: function(msg) {
      toaster.pop('error', 'Відновлення', 'При відновленні' + msg + ' виникла помилка!')
    },
    sendSuccessMailtoDelete : function(msg, type) {
      toaster.pop('success', 'Відправлення ' + msg + ' здійснено успішно! Підтвердіть видалення через імейл!');
    },
    registerSuccess: function() {
      toaster.pop('success', 'Профіль створено успішно', 'Дані про реєстрацію відправлені на Вашу електронну пошту.')
    }
  };
});
