'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userInfoSchema = mongoose.Schema({
    firstName: {type: String},  
    lastName: {type: String},
    email: {type: String},
    childProfs: [
        {
            firstName: {type: String},  
            birthDate: {type: String},
        }
    ],
    asset: [
        {
            title: {type: String},
            dateUploaded: {type: String},
            fileLocation: {type: String}
        }
    ]
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);
//const ChildProf = mongoose.model('ChildProf', userInfoSchema);
const ChildAge = mongoose.model('ChildAge', userInfoSchema);
//const Assets = mongoose.model('Assets', userInfoSchema);

userInfoSchema.virtual('userNameString').get(function() {
    return `${this.firstName}`.trim();
});

userInfoSchema.virtual('childNameString').get(function() {
    return `${this.childProfs.firstName}`.trim();
});

// userInfoSchema.virtual('childAge').get(function() {
//    $(document).ready(function(){
//        $("#childoverlaybutton").click(function(){
//            var bday = $("#birth-date").val().toString();
//            var birthYear = parseInt(mdate.substring(0,4), 10);
//            var birthMonth = parseInt(mdate.substring(5,7), 10);
           
//            var today = new Date();
//            var birthday = new Date(birthYear, birthMonth-1,);
           
//            var differenceInMilisecond = today.valueOf() - birthday.valueOf();
           
//            var currentAge = Math.floor(differenceInMilisecond / 31536000000);
   
//            console.log(currentAge);
//        });
//    });
// });

userInfoSchema.virtual('assetsString').get(function() {
    return `${this.asset.title}`.trim();
});

//module.exports = {Assets};
//module.exports = {ChildProf};
module.exports = {UserInfo};
//module.exports = {childAge};