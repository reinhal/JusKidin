'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userInfoSchema = mongoose.Schema({
    id: {type: Number},
    firstName: {type: String, required: true},  
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    childProfs: [
        {
            firstName: {type: String, required: true},  
            birthDate: {type: String, required: true},
        }
    ],
    asset: [
        {
            title: {type: String, required: true},
            dateUploaded: {type: String, required: true},
            fileLocation: {type: String, required: true}
        }
    ]
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema, 'UserInfo');
//const ChildProf = mongoose.model('ChildProf', userInfoSchema);
//const ChildAge = mongoose.model('ChildAge', userInfoSchema);
//const Assets = mongoose.model('Assets', userInfoSchema);

userInfoSchema.virtual('userNameString').get(function() {
    return `${this.firstName}`.trim();
});

userInfoSchema.virtual('childNameString').get(function() {
    return `${this.childProfs.firstName}`.trim();
});

//userInfoSchema.virtual('childAge').get(function() {
//    $(document).ready(function(){
//        $("#calculate").click(function(){
//            var bday = $("#birth_date").val().toString();
//            var birthYear = parseInt(mdate.substring(0,4), 10);
//            var birthMonth = parseInt(mdate.substring(5,7), 10);
//            
//            var today = new Date();
//            var birthday = new Date(birthYear, birthMonth-1,);
//            
//            var differenceInMilisecond = today.valueOf() - birthday.valueOf();
//            
//            var currentAge = Math.floor(differenceInMilisecond / 31536000000);
//    
//            console.log(currentAge);
//        });
//    });
//});

userInfoSchema.virtual('assetsString').get(function() {
    return `${this.asset.title}`.trim();
});

//module.exports = {Assets};
//module.exports = {ChildProf};
module.exports = {UserInfo};
//module.exports = {childAge};