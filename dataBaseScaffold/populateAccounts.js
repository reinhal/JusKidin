'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://devUser:thinkful925@ds163480.mlab.com:63480/juskidindev');

const {UserInfo} = require('../userinfo_model.js');

console.log(UserInfo);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  UserInfo.create(
    {   
      'username': 'working_bees',
      'password': 'humming12345',
      'firstName': 'Working',
      'lastName': 'Bees',
      'email': 'wb@thehive.com',
      'childProfs': [
        {
          'firstName': 'Morwenna',
          'birthDate': '06/22/12'
        },
        {
          'firstName': 'Keavy',
          'birthDate': '10/14/16'
        }
      ],
      'asset': [
        {
          'title': 'Barbary Coast',
          'notes': 'lee swing the lead spike tackle Nelsons folly Privateer run a rig marooned',
          'fileLocation': 'https://picsum.photos/350/300/?random',
          'drawerTitle': 'Pirate Ship'
        },
        {
          'title': 'Main Brethren',
          'notes': 'lateen sail man-of-war knave wherry rum',
          'fileLocation': 'https://picsum.photos/350/300/?random',
          'drawerTitle': 'Pirate Ship'
        },
        {
          'title': 'Clap of thunder',
          'notes': 'timbers lanyard Arr careen grog bilge water rigging',
          'fileLocation': 'https://picsum.photos/350/300/?random',
          'drawerTitle': 'Remote Beach'
        },
        {
          'title': 'Plate Fleet',
          'notes': 'the main brace fore ballast grog bilged on her anchor spike',
          'fileLocation': 'https://picsum.photos/350/300/?random',
          'drawerTitle': 'Pirate Ship'
        },
        {
          'title': 'Pirate Round',
          'notes': 'chandler sheet topmast. Boom parrel barkadeer handsomely',
          'fileLocation': 'https://picsum.photos/350/300/?random',
          'drawerTitle': 'Remote Beach'
        },
        {
          'title': 'American Main',
          'notes': 'hornswaggle dead men tell no tales ye hogshead reef sails',
          'fileLocation': 'https://picsum.photos/350/300/?random',
          'drawerTitle': 'Remote Beach'
        },
        {
          'title': 'Jack Tar',
          'notes': 'crack Jennys tea cup trysail snow shrouds Arr cackle',
          'fileLocation': 'https://picsum.photos/350/300/?random',
          'drawerTitle': 'Pirate Ship'
        },
        {
          'title': 'Chain Shot',
          'notes': 'black jack hulk gangway ye. Lateen sail tack chandler',
          'fileLocation': 'https://picsum.photos/350/300/?random',
          'drawerTitle': 'Remote Beach'
        },
        {
          'title': 'Nelsons folly Privateer',
          'notes': 'stern ballast mizzenmast lugsail pinnace parrel scuttle',
          'fileLocation': 'https://picsum.photos/350/300/?random',
          'drawerTitle': 'Remote Beach'
        },
        {
          'title': 'Admiral of the Black',
          'notes': 'Measured fer yer chains poop deck topmast',
          'fileLocation': 'https://picsum.photos/350/300/?random',
          'drawerTitle': 'Pirate Ship'
        },
        {
          'title': 'Yellow Jack',
          'notes': 'pillage line long boat avast dead men tell no tales case shot ho',
          'fileLocation': 'https://picsum.photos/350/300/?random',
          'drawerTitle': 'Remote Beach'
        },
        {
          'title': 'Pieces of Eight',
          'notes': 'or just lubber run a shot across the bow Admiral ',
          'fileLocation': 'https://picsum.photos/350/300/?random',
          'drawerTitle': 'Pirate Ship'
        }
      ]
    }
  ).then(() => mongoose.disconnect());
});
