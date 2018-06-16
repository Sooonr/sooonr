'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Quote = require('./model/quote');
var Event = require('./model/event');
var Follow = require('./model/follow');
var Register = require('./model/register');
var User = require('./model/user');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

mongoose.connect('mongodb://localhost:27017/sooonr');
// mongoose.connect('mongodb://vald:xeule2@ds125288.mlab.com:25288/esgi_test');

router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

app.use('/api', router);

app.listen(port, function() {
 console.log(`api running on port ${port}`);
});

router.route('/quote/update/:id')
 //retrieve a quote from the database by id
 .post(function(req, res) {
     const id = req.originalUrl.split('/')[4];
     //body parser lets us use the req.body
     Quote.findById(id, function(err, quote) {
       if (err)
         res.send(err);
         quote.name = req.body.name;
         quote.quote = req.body.quote;
         quote.save(function(err) {
           if (err)
             res.send(err);
             res.json({ message: 'Quote successfully updated!' });
        });
     });
 });

router.delete('/:id',function(req, res) {
     const reqId = req.originalUrl.split('/')[3];
     const id = reqId.split('=')[1];
     var ObjectId = require('mongodb').ObjectID;

     Quote.deleteOne({ "_id" : ObjectId(id) }, function(err, quotes) {
       if (err)
         res.send(err);
         //responds with a json object of our database quotes.
         res.json(quotes)
    });
 });

 router.route('/quote/:id')
 //retrieve a quote from the database by id
 .get(function(req, res) {
     const id = req.originalUrl.split('/')[3];
     //looks at our Quote Schema
     Quote.findById(id, function(err, quotes) {
       if (err)
         res.send(err);
         //responds with a json object of our database quotes.
         res.json(quotes)
    });
 });

router.route('/quotes')
 //retrieve all quotes from the database
 .get(function(req, res) {
     //looks at our Quote Schema
     Quote.find(function(err, quotes) {
     if (err)
       res.send(err);
       //responds with a json object of our database quotes.
       res.json(quotes)
    });
 })
 //post new quote to the database
 .post(function(req, res) {
     var quote = new Quote();
     //body parser lets us use the req.body
     quote.name = req.body.name;
     quote.quote = req.body.quote;
     if (quote.name && quote.quote) {
        quote.save(function(err) {
           if (err)
             res.send(err);
             res.json({ message: 'Quote successfully added!' });
        });
     } else {
       res.json({ error: true, message: 'Missing parameters' });
     }
 });

// Events

router.route('/event/:id')
//retrieve a event from the database by id
.get(function(req, res) {
    const id = req.originalUrl.split('/')[3];
    //looks at our event Schema
    Event.findById(id, function(err, event) {
      if (err)
        res.send(err);
        //responds with a json object of our database quotes.
        res.json(event)
   });
});

router.route('/events')
 //retrieve all events from the database
 .get(function(req, res) {
     //looks at our event Schema
     Event.find(function(err, events) {
     if (err)
       res.send(err);
       //responds with a json object of our database quotes.
       res.json(events)
    });
 })
 //post new event to the database
 .post(function(req, res) {
    var event = new Event();
    //body parser lets us use the req.body
    event.description = req.body.description;
    event.title = req.body.title;
    event.creator = req.body.creator;
    event.save(function(err) {
        if (err) {
            res.send(err);
            err = false;
        } else {
            res.json({ message: 'Event successfully added!' });
        }
    });
 });

router.route('/event/:id')
 //retrieve an event from the database by id
 .get(function(req, res) {
     const id = req.originalUrl.split('/')[3];
     //looks at our Quote Schema
     Event.findById(id, function(err, event) {
       if (err)
         res.send(err);
         //responds with a json object of our database quotes.
         res.json(event)
    });
 });

 //Follows

 router.route('/follows')
 //retrieve all followers from the database
 .get(function(req, res) {
     //looks at our Follow Schema
     Follow.find(function(err, follows) {
     if (err)
       res.send(err);
       //responds with a json object of our database quotes.
       res.json(follows)
       console.log("yeeees : ", follows);
    });
 })
 .post(function(req, res) {
  var follow = new Follow();
  //body parser lets us use the req.body
  follow.idUser = req.body.idUser;
  follow.idArtist = req.body.idArtist;
  console.log(follow);
  if (follow.idUser && follow.idArtist) {
     follow.save(function(err) {
        if (err)
          res.send(err);
          res.json({ message: 'Follow successfully added!' });
     });
  } else {
    res.json({ error: true, message: 'Missing parameters' });
  }
});

//Register

router.route('/registers')
//retrieve all followers from the database
.get(function(req, res) {
    //looks at our Follow Schema
    Follow.find(function(err, registers) {
    if (err)
      res.send(err);
      //responds with a json object of our database quotes.
      res.json(registers)
      console.log("yeeees : ", registers);
   });
})
.post(function(req, res) {
 var register = new Register();
 //body parser lets us use the req.body
 register.idUser = req.body.idUser;
 register.idArtist = req.body.idArtist;
 console.log(register);
 if (register.idUser && register.idArtist) {
    follow.save(function(err) {
       if (err)
         res.send(err);
         res.json({ message: 'Register successfully added!' });
    });
 } else {
   res.json({ error: true, message: 'Missing parameters' });
 }
});

// Users

router.route('/login')
  //login a user
  .post(function(req, res) {
    const username = req.body.username
    const password = req.body.password

    User.findOne({ username: username }, function(err, user) {
      if (err) { res.send(err) }
      if (!user) {
        res.send({error: true, message: 'Les identifiants sont incorrects'})
      } else {
          user.comparePassword(password, function(err, isMatch) {
            if (err) res.send(err);
            if (isMatch) {
              res.send({error: false, user })
            } else {
              res.send({error: true, message: 'Les identifiants sont incorrects'})
            }
          });
        }
    });
  });

  router.route('/user/:id')
  //retrieve a user from the database by id
  .get(function(req, res) {
      const id = req.originalUrl.split('/')[3];
      //looks at our User Schema
      User.findById(id, function(err, user) {
        if (err)
          res.send(err);
          //responds with a json object of our database quotes.
          res.json(user)
     });
  });

 router.route('/users')
  //retrieve all users from the database
  .get(function(req, res) {
      //looks at our User Schema
      User.find(function(err, users) {
      if (err)
        res.send(err);
        //responds with a json object of our database quotes.
        res.json(users)
     });
  })
  //post new user to the database
  .post(function(req, res) {
      var user = new User();
      //body parser lets us use the req.body
      user.username = req.body.username
      user.password = req.body.password
      user.role = req.body.role
      user.email = req.body.email
      user.name = req.body.name
      user.inscriptionDate = req.body.inscriptionDate
      user.save(function(err) {
        if (err)
          res.send(err);
          res.json({ message: 'User successfully added!' });
      });
  });
