'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
  title: {
    type: String,
    default: 'Senza Titolo'
  },
  subtitle: {
    type: String,
    default: ''
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: 'Non puoi pubblicare un articolo senza testo'
  },
  public:{
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  archived: {
    type: Boolean,
    default: false
  },
  Ttags:{
    type: Array,
    default: ['ALL']
  },
  autore:{
    type: String,
    default: 'Anonimo'
  },
  img_source: {
    type: String
  }


});


var CommentSchema = new Schema({
  
  Created_date: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: 'Non puoi pubblicare un commento vuoto'
  },
  public:{
    type: Boolean,
    default: true
  },
  autore:{
    type: String,
    default: 'Anonimo'
  },
  id_articolo:{
    type: Schema.Types.ObjectId, 
    ref: 'Articles' ,
    required: "Per pubblicare un commento è necessario l'id dell'articolo a cui è rivolto"
  }

});

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});
/*
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});
/* 3/4 
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}
*/

module.exports = mongoose.model('Users', UserSchema);

module.exports = mongoose.model('Articles', ArticleSchema);
module.exports = mongoose.model('Comments', CommentSchema);