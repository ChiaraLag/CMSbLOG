'use strict';
module.exports = function(app) {
  var blogArticolo = require('../controllers/blogArticoloController');

  // blogArticolo Routes
  app.route('/articles')
    .get(blogArticolo.list_all_articles)
    .post(blogArticolo.create_an_article);

    
  app.route('/articles/:articleId')
    .get(blogArticolo.read_an_article)
    .put(blogArticolo.update_an_article)
    .delete(blogArticolo.delete_an_article)
    .patch(blogArticolo.patch_an_article);



  // Comments Routes

  app.route('/comments')
    .get(blogArticolo.list_all_comments)
    .post(blogArticolo.create_a_comment);


  app.route('/comments/:commentId')
    .get(blogArticolo.read_a_comment)
    .put(blogArticolo.update_a_comment)
    .delete(blogArticolo.delete_a_comment)
    .patch(blogArticolo.patch_a_comment);





  app.route('/users')
  .get(blogArticolo.get_user)
  .post(blogArticolo.create_a_user);

  app.route('/users/:userId')
    .get(blogArticolo.verify_user_exist);

};


