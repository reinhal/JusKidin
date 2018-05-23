import { callbackify } from "util";

var MOCK_USER_INFO = {
    "userInfo": [
        {
            "id": "123123",
            "name": "Swarming Bees",
            "email": "sb@thehive.com"
        },
        {
            "id": "234234",
            "name": "Queen Bee",
            "email": "qb@thehive.com"
        },
        {
            "id": "345345",
            "name": "Working Bees",
            "email": "wb@thehive.com"
        },
        {
            "id": "456456",
            "name": "Drone Bees",
            "email": "db@thehive.com"
        },
        {
            "id": "567567",
            "name": "Honey Bees",
            "email": "hb@thehive.com"
        },
    ]
};

function getUserInfo(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_USER_INFO)}, 100);
}

function displayUserInfo(data) {
    for (index in data.userInfo) {
        $('body').append(
            '<p>' + data.userInfo[index].text + '</p>');
    }
}

function getAndDisplayUserInfo() {
    getUserInfo(displayUserInfo);
}

$(function() {
    getAndDisplayUserInfo();
})