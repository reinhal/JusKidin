'use strict';

const express = require('express');
const app = express();
const { PORT, DATABASE_URL } = require('./config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(express.json());

const jsonParser = bodyParser.json();
const {UserInfo} = require('./userinfo_model');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

//app.use(morgan('common'));

// Account Info Endpoints//

app.get('/api/account', (req, res) => {
  UserInfo
    .find()
    .select(req.query.select)
    .then(userinfo => {
        res.json(userinfo);
      })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.get('/api/account/:_id', (req, res) => {
  UserInfo
    .findOne({
      "_id": req.params._id
    })
    .select(req.query.select)
    .then(userinfo => {
        res.json(userinfo);
      })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/api/account', jsonParser, (req, res) => {
  
  const newUser = ['firstName', 'lastName', 'email'];
  
  for (let i=0; i<newUser.length; i++) {
    const field = newUser[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field} \`in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  UserInfo.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email})
  .then(function(newUser) {
    res.status(201).json(newUser);
  });
});

app.put('/api/account/:_id', jsonParser, (req, res) => {
  if (req.params._id !== req.body._id) {
    const message = `Request path id (${req.params._id}) and request body id (${req.body._id}) must match`;
    return res.status(400).send(message);
  }
  const updatedUser = ['firstName', 'lastName', 'email'];
  for (let i=0; i<updatedUser.length; i++) {
    const field = updatedUser[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      return res.status(400).send(message);
    }
  }
  UserInfo.findByIdAndUpdate(
    req.params._id,
    req.body,
    {new: true},
    (err, updatedUser) => {
      if(err) {
        return res.status(500).send(err)
      } 
      res.status(204).send(updatedUser);
    }
  )
});
// api/account/:id/asset/:WHATEVER THE IDENTIFIER
app.delete('/api/account/:id', (req, res) => {
  UserInfo
  .findByIdAndRemove(req.params.id)
  .then(() => {
      res.status(204).json({message: 'Success!!'});
  })
  .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'There is an error'});
  });
});

/////////// Child Profile Info Endpoints /////////////////////////////////////

app.post('/api/account/:_id/childProfiles', jsonParser, (req, res) => {
  const reqChildProfs = [req.body.firstName, req.body.birthDate];
  for (let i=0; i<reqChildProfs.length; i++) {
    const field = reqChildProfs[i];
    if (field == undefined) {
      const message = `Missing \`${field}\` in request body`
      return res.status(400).send(message);
    }
  }
  // ifs statements for each data
  UserInfo
    .findOne({
      "_id": req.params._id
    })
    .select(req.query.select)
    .then(userinfo => {
      userinfo.childProfs.push({firstName: req.body.firstName, birthDate: req.body.birthDate});
      userinfo.save()
        res.status(201);
        res.json(userinfo);
      })
    .catch(err => {
      res.status(500).json({ message: 'Internal server error' });
    });

});

app.put('/api/account/:_id/childProfs/:child_id', jsonParser, (req, res) => {
  if (req.params.childProfs !== req.body.childProfs) {
    const message = `Request path id (${req.params.childProf}) and request body id (${req.body.childProfs}) must match`;
    return res.status(400).send(message);
  }

  const updatedChildObject = ['firstName','birthDate'];
    for (let i=0; i<updatedChildObject.length; i++) {
      const field = updatedChildObject[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        return res.status(400).send(message);
      }
  }

  return UserInfo.findById(
    req.params._id)
    .then(thisUser => {
    for ( let i=0; i < thisUser.childProfs.length; i++ ) {
      if (req.params.child_id == thisUser.childProfs[i]._id) {
        thisUser.childProfs[i].firstName = req.body.firstName;
        thisUser.childProfs[i].birthDate = req.body.birthDate;
      }
    }

  return UserInfo.findByIdAndUpdate(
    req.params._id, {
      childProfs:thisUser.childProfs
    }
  ) 
    .then(updatedChild => {
      console.log (updatedChild);
      return res.status(201).send(updatedChild);
    })
  })
});

app.delete('/api/account/:_id/childProfs/:child_id', (req, res) => {
  UserInfo
  .findOne({
    "_id": req.params._id
  })
  .then(userinfo => {
    for (let index = 0; index < userinfo.childProfs.length; index++) {
      if(userinfo.childProfs[index].id === req.params.child_id){
        userinfo.childProfs.splice(index,1)
      }      
    }
    userinfo.save()
      res.status(204);
      res.json(userinfo);
    })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

// // Digital Assets Endpoints//

app.post('/api/account/:_id/uploads', jsonParser, (req, res) => {
  const updatedAssetObject = [req.body.title, req.body.notes, req.body.dateUploaded, req.body.fileLocation, req.body.drawerTitle];
  for (let i=0; i<updatedAssetObject.length; i++) {
    const field = updatedAssetObject[i];
    if (field == undefined) {
      const message = `Missing \`${field}\` in request body`
      return res.status(400).send(message);
    }
  }
  UserInfo
    .findOne({
      "_id": req.params._id
    })
    .select(req.query.select)
    .then(userinfo => {
      userinfo.asset.push({title: req.body.title, notes: req.body.notes, dateUploaded: req.body.dateUploaded, fileLocation: req.body.fileLocation, drawerTitle: req.body.drawerTitle});
      userinfo.save()
        res.status(201);
        res.json(userinfo);
      })
    .catch(err => {
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.put('/api/account/:_id/asset/:asset_id', jsonParser, (req, res) => {
  if (req.params.asset !== req.body.asset) {
    const message = `Request path id (${req.params.asset}) and request body id (${req.body.asset}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }

  const updatedAssetObject = ["title", "notes", "dateUploaded", "fileLocation", "drawerTitle"];
  for (let i=0; i<updatedAssetObject.length; i++) {
    const field = updatedAssetObject[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      return res.status(400).send(message);
    }
  }

  return UserInfo.findById(
    req.params._id)
    .then(thisAsset => {
    for ( let i=0; i < thisAsset.asset.length; i++ ) {
      if (req.params.asset_id == thisAsset.asset[i].id) {
       thisAsset.asset[i].title = req.body.title;
       thisAsset.asset[i].notes = req.body.notes;
       thisAsset.asset[i].dateUploaded = req.body.dateUploaded;
       thisAsset.asset[i].fileLocation = req.body.fileLocation;
       thisAsset.asset[i].drawerTitle = req.body.drawerTitle;
      }
    }

  return UserInfo.findByIdAndUpdate(
    req.params._id, {
      asset:thisAsset.asset
    }
  ) 
    .then(updatedAsset => {
      console.log (updatedAsset);
      return res.status(201).send(updatedAsset);
    })
  })
});

app.delete('/api/account/:_id/asset/:asset_id', (req, res) => {
  UserInfo
  .findOne({
    "_id": req.params._id
  })
  .then(userinfo => {
    for (let index = 0; index < userinfo.asset.length; index++) {
      if(userinfo.asset[index].id === req.params.asset_id){
        userinfo.asset.splice(index,1)
      }      
    }
    userinfo.save()
      res.status(204);
      res.json(userinfo);
    })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  });
});
let server;

function runServer(DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL, 8080).catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};