'use strict';
const bcrypt = require('bcrypt');

var mongoose = require('mongoose'),
  Article = mongoose.model('Articles'),
  Comment = mongoose.model('Comments'),
  User = mongoose.model('Users');

exports.list_all_articles = function(req, res) {
  var query = req.query;
  if(query.password && query.username){
    
    User.findOne( {username: query.username}, function(err, user) {
      if(user){
      if (err)
        res.send(err);
      bcrypt.compare(query.password, user.password, function(err, result){
        if(err)
          res.send(err);
        if(result){
          Article.find( {}, function(err, article) {
          if(Array.isArray(article)){
            article.sort(function(a,b){
              if(a.featured == true && b.featured == false){
                  return -1;
              }else if(a.featured == false && b.featured == true){
                return 1;
              }else{
                return 0;
              }
            });
          }
          if (err)
            res.send(err);
          res.json(article);
        });
        }else{
          res.send("password errata");
        }
      })
    }else{
      res.send("username errato o inesistente");
    }
    });
  }else{
    Article.find( {public: true}, function(err, article) {
    if(Array.isArray(article)){
      article.sort(function(a,b){
        if(a.featured == true && b.featured == false){
            return -1;
        }else if(a.featured == false && b.featured == true){
          return 1;
        }else{
          return 0;
        }
      });
    }
    if (err)
      res.send(err);
    res.json(article);
  });
  }
};




exports.create_an_article = function(req, res) {
  var new_article = new Article(req.body);
  new_article.save(function(err, article) {
    if (err)
      res.send(err);
    res.json(article);
  
  });
};


exports.read_an_article = function(req, res) {
  
  var query = req.query;
  if(query.password && query.username){
    
    User.findOne( {username: query.username}, function(err, user) {
      if(user){
      if (err)
        res.send(err);
      bcrypt.compare(query.password, user.password, function(err, result){
        if(err)
          res.send(err);
        if(result){
          Article.findOne(req.params.articleId, function(err, article) {
          if (err)
            res.send(err);
          res.json(article);
        });
        }else{
          res.send("password errata");
        }
      })
    }else{
      res.send("username errato o inesistente");
    }
    });
  }else{  
    Article.findById({_id: req.params.articleId,public: true}, function(err, article) {
    if (err)
      res.send(err);
      res.json(article);
  });
  }



};


exports.update_an_article = function(req, res) {
  var query = req.query;
  if(query.password && query.username){
    
    User.findOne( {username: query.username}, function(err, user) {
      if(user){
      if (err)
        res.send(err);
      bcrypt.compare(query.password, user.password, function(err, result){
        if(err)
          res.send(err);
        if(result){Article.findOneAndUpdate({_id: req.params.articleId}, req.body, {new: true}, function(err, article) {
          if (err)
            res.send(err);
          res.json(article);
        });
        }else{
          res.send("password errata");
        }
      })
    }else{
      res.send("username errato o inesistente");
    }
    });
  }else{
    res.send("Errore: inserire sia password che username");
  }

};
exports.patch_an_article = function(req, res) {
  var query = req.query;
  if(query.password && query.username){
    
    User.findOne( {username: query.username}, function(err, user) {
      if(user){
      if (err)
        res.send(err);
      bcrypt.compare(query.password, user.password, function(err, result){
        if(err)
          res.send(err);
        if(result){Article.findOneAndUpdate({_id: req.params.articleId}, {$set: req.body}, {new: true}, function(err, article) {
          if (err)
            res.send(err);
          res.json(article);
        });
        }else{
          res.send("password errata");
        }
      })
    }else{
      res.send("username errato o inesistente");
    }
    });
  }else{
    res.send("Errore: inserire sia password che username");
  }


  
};

exports.delete_an_article = function(req, res) {
  var query = req.query;
  if(query.password && query.username){
    
    User.findOne( {username: query.username}, function(err, user) {
      if(user){
      if (err)
        res.send(err);
      bcrypt.compare(query.password, user.password, function(err, result){
        if(err)
          res.send(err);
        if(result){
          Article.remove({
          _id: req.params.articleId
        }, function(err, article) {
      
          Comment.remove({
            id_articolo: req.params.articleId
          }, function(err, comment) {
            if (err)
              res.send(err);
          });
      
          if (err)
            res.send(err);
          res.json({ message: 'Articolo rimosso con successo' });
        });
        }else{
          res.send("password errata");
        }
      })
    }else{
      res.send("username errato o inesistente");
    }
    });
  }else{
    res.send("Errore: inserire sia password che username");
  }

};



/* Comments methods */
exports.list_all_comments = function(req, res) {
  var query = req.query;
  if(query.password && query.username){
    
    User.findOne( {username: query.username}, function(err, user) {
      if(user){
      if (err)
        res.send(err);
      bcrypt.compare(query.password, user.password, function(err, result){
        if(err)
          res.send(err);
        if(result){
          Comment.find( query.id_articolo, function(err, comment) {
          if(Array.isArray(comment)){
            comment.sort(function(a,b){
              if(a.Created_date.getTime() > b.Created_date.getTime()){
                  return -1;
              }else if(a.Created_date.getTime() < b.Created_date.getTime()){
                return 1;
              }else{
                return 0;
              }
            });
          }
          if (err)
            res.send(err);
          res.json(comment);
        });
        }else{
          res.send("password errata");
        }
      })
    }else{
      res.send("username errato o inesistente");
    }
    });
  }else{
    query.public = true;
    Comment.find( query, function(err, comment) {
    if(Array.isArray(comment)){
      comment.sort(function(a,b){
        if(a.Created_date.getTime() > b.Created_date.getTime()){
            return -1;
        }else if(a.Created_date.getTime() < b.Created_date.getTime()){
          return 1;
        }else{
          return 0;
        }
      });
    }
    if (err)
      res.send(err);
    res.json(comment);
  });
  }
};

exports.create_a_comment = function(req, res) {
  
  Article.findById(req.body.id_articolo, function(err, article) {
      
    if(article){
      var new_comment = new Comment(req.body);
      new_comment.save(function(err, comment) {
        if (err)
          res.send(err);
        res.json(comment);
      
        });
    }else{
      res.send("Errore: L'id articolo non corrisponde a nessun articolo salvato");
    }
    if(err){
      res.send(err);
    }
  })
};


exports.read_a_comment = function(req, res) {
  
  var query = req.query;
  if(query.password && query.username){
    
    User.findOne( {username: query.username}, function(err, user) {
      if(user){
      if (err)
        res.send(err);
      bcrypt.compare(query.password, user.password, function(err, result){
        if(err)
          res.send(err);
        if(result){
          Comment.findById(req.params.commentId, function(err, comment) {
            if (err)
              res.send(err);
            res.json(comment);
          });
        }else{
          res.send("password errata");
        }
      })
    }else{
      res.send("username errato o inesistente");
    }
    });
  }else{
    res.send("Errore: inserire sia password che username");
  }

  Comment.findOne({_id: req.params.commentId, public: true} , function(err, comment) {
    if (err)
      res.send(err);
    res.json(comment);
  });
};

exports.update_a_comment = function(req, res) {

  var query = req.query;
  if(query.password && query.username){
    
    User.findOne( {username: query.username}, function(err, user) {
      if(user){
      if (err)
        res.send(err);
      bcrypt.compare(query.password, user.password, function(err, result){
        if(err)
          res.send(err);
        if(result){
          Comment.findOneAndUpdate({_id: req.params.commentId}, req.body, {new: true}, function(err, comment) {
            if (err)
              res.send(err);
            res.json(article);
          });
        }else{
          res.send("password errata");
        }
      })
    }else{
      res.send("username errato o inesistente");
    }
    });
  }else{
    res.send("Errore: inserire sia password che username");
  }

};
exports.patch_a_comment = function(req, res) {

  
  var query = req.query;
  if(query.password && query.username){
    
    User.findOne( {username: query.username}, function(err, user) {
      if(user){
      if (err)
        res.send(err);
      bcrypt.compare(query.password, user.password, function(err, result){
        if(err)
          res.send(err);
        if(result){
          Comment.findOneAndUpdate({_id: req.params.commentId}, {$set: req.body}, {new: true}, function(err, comment) {
            if (err)
              res.send(err);
            res.json(comment);
          });
        }else{
          res.send("password errata");
        }
      })
    }else{
      res.send("username errato o inesistente");
    }
    });
  }else{
    res.send("Errore: inserire sia password che username");
  }
};


exports.delete_a_comment = function(req, res) {

  
  var query = req.query;
  if(query.password && query.username){
    
    User.findOne( {username: query.username}, function(err, user) {
      if(user){
      if (err)
        res.send(err);
      bcrypt.compare(query.password, user.password, function(err, result){
        if(err)
          res.send(err);
        if(result){
          Comment.remove({
            _id: req.params.commentId
          }, function(err, comment) {
            if (err)
              res.send(err);
            res.json({ message: 'Commento rimosso con successo' });
          });
        }else{
          res.send("password errata");
        }
      })
    }else{
      res.send("username errato o inesistente");
    }
    });
  }else{
    res.send("Errore: inserire sia password che username");
  }
};


exports.get_user = function(req, res) {
  var query = req.query;
  if(query.password && query.username){
    
    User.findOne( {username: query.username}, function(err, user) {
      if(user){
      if (err)
        res.send(err);
      bcrypt.compare(query.password, user.password, function(err, result){
        if(err)
          res.send(err);
        if(result){
          res.json(user);
        }else{
          res.send("password errata");
        }
      })
    }else{
      res.send("username errato o inesistente");
    }
    });
  }else{
    res.send("Errore: inserire sia password che username");
  }
};


exports.create_a_user = function(req,res){
    
    bcrypt.hash(req.body.password, 10, function (err, hash){
      if (err) {
        return res.send(err);
      }
      req.body.password = hash;
      var new_user = new User(req.body);
      new_user.save(function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      
      });
    })

  }
  
exports.verify_user_exist = function(req, res) {
  User.find({username: req.params.userId}, function(err, user) {
    if (err)
      res.send(err);
    if(user){
      res.json(true);
    }else{
      res.json(false)
    }
  });
};