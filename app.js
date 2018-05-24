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

var MOCK_CHILD_PROFILE_INFO = {
    "childProfile": [
        {
            "id": "678678",
            "name": "Sweet Pea",
            "age": "10 months",
            "sex": "male",
        },
        {
            "id": "789789",
            "name": "Little Lovie",
            "age": "2 years old",
            "sex": "female"
        },
        {
            "id": "890890",
            "name": "Funny Guy",
            "age": "4 years old",
            "sex": "male"
        },
        {
            "id": "901901",
            "name": "Little Man",
            "age": "10 years old",
            "sex": "female"
        },
        {
            "id": "012012",
            "name": "Funky Dance",
            "age": "12 years old",
            "sex": "female"
        },
    ]
};

function getChildInfo(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_CHILD_PROFILE_INFO)}, 100);
}

function displayChildInfo(data) {
    for (index in data.childProfile) {
        $('body').append(
            '<p>' + data.childProfile[index].text + '</p>');
    }
}

function getAndDisplayChildInfo() {
    getChildInfo(displayChildInfo);
}

$(function() {
    getAndDisplayChildInfo();
})

var MOCK_RESOURCE_INFO = {
    "resourceInfo": [
        {
            "channel": "movie",
            "summary": "Description of list",
            "url": "http://www.commonsensemedia.org/lists/url-to-recommended-list-title",
            "uuid": "140fd905-17ff-4154-9405-c309085afb80",
            "title": "Title of the Recommended List",
            "created": "1409003520",
            "author": "Common Sense Media",
            "reviews": [
                {
                "title": "The title of this item",
                "id": 1234567,
                "url": "http://www.commonsensemedia.org/url-to-title",
                "summary": "A short description of the item.",
                "ageRating": 10
                }
            ],
            "otherPicks": [
                {
                "title": "The title of this item",
                "id": 1234567,
                "uuid": "140fd905-17ff-4154-9405-c309085afb80",
                "url": "http://www.commonsensemedia.org/url-to-title",
                "summary": "A short description of item"
                }
            ],
            "intro": "Introductory text",
            "categories": {
                "23926": "Movies"
            },
            "ages": {
                "min": 5,
                "max": 13
            }
        },
    ]
};

function getResourceInfo(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_RESOURCE_INFO)}, 100);
}

function displayResourceInfo(data) {
    for (index in data.resourceInfo) {
        $('body').append(
            '<p>' + data.resourceInfo[index].text + '</p>');
    }
}

function getAndDisplayResourceInfo() {
    getResourceInfo(displayResourceInfo);
}

$(function() {
    getAndDisplayResourceInfo();
})

