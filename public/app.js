//import { callbackify } from "util";

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
    setTimeout(function(){ callbackFn(MOCK_USER_INFO)}, 1);
}

function displayUserInfo(data) {
    for (index in data.userInfo) {
        $('body').append(
            '<p>' + data.userInfo[index].name + '</p>');
    }
}

function getAndDisplayUserInfo() {
    getUserInfo(displayUserInfo);
}

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
    setTimeout(function(){ callbackFn(MOCK_CHILD_PROFILE_INFO)}, 1);
}

function displayChildInfo(data) {
    for (index in data.childProfile) {
        $('body').append(
            '<p>' + data.childProfile[index].name + '</p>');
    }
}

function getAndDisplayChildInfo() {
    getChildInfo(displayChildInfo);
}

var MOCK_ASSET_INFO = {
    "assetInfo": [
    {
        "title": "pic1",
        "dateUploaded": "05/27/18", 
        "fileLocation": "/IMG_0052.jpg"
    },
    {
        "title": "pic2",
        "dateUploaded": "05/26/18", 
        "fileLocation": "/IMG_0009.jpg"
    },
    {
        "title": "mov1",
        "dateUploaded": "05/25/18", 
        "fileLocation": "/IMG_0010.m4v"
    }
    ]
}

function getAssetInfo(callbackFn) {
    setTimeout(function(){callbackFn(MOCK_ASSET_INFO)}, 1);
}

function displayAssetInfo(data) {
    for (index in data.assetInfo) {
        $('body').append(
            '<p>' + data.assetInfo[index].title + '</p>');
    }
}

function getAndDisplayAssetInfo() {
    getAssetInfo(displayAssetInfo);
} 

var MOCK_GSEARCH_INFO = {
    "gsearchInfo": [
        {
            "kind": "customsearch#result",
            "title": "Developmental Milestones 1",
            "htmlTitle": "Developmental Milestones 1",
            "link": "http://www.developmentalmilestones1.com",
            "displayLink": "www.developmentalmilestones1.com",
            "snippet": "Progress social intrapreneurship, strengthening infrastructure; collaborative consumption resist empower communities boots on the ground theory of change.",
            "htmlSnippet": "Shared vocabulary; B-corp program area; thought provoking invest revolutionary; design thinking; challenges and opportunities do-gooder mobilize parse entrepreneur big data leverage. Deep dive; commitment, our work dynamic thought provoking systems thinking collaborate.",
            "cacheId": "PgDo0AWWtvwJ"
        },
        {
            "kind": "customsearch#result",
            "title": "Developmental Milestones 2",
            "htmlTitle": "Developmental Milestones 2",
            "link": "http://www.developmentalmilestones2.com",
            "displayLink": "www.developmentalmilestones2.com",
            "snippet": "Thought leader, granular, revolutionary strengthening infrastructure capacity building problem-solvers.",
            "htmlSnippet": "Innovation uplift we must stand up; storytelling paradigm thought partnership systems thinking. Contextualize, collective impact co-creation; external partners; collaborative cities NGO collaborate peaceful.",
            "cacheId": "PgDo0ACCtvvJ"
        },
    ]
}

function getGsearchInfo(callbackFn) {
    setTimeout(function(){callbackFn(MOCK_GSEARCH_INFO)}, 1);
}

function displayGsearchInfo(data) {
    for (index in data.gsearchInfo) {
        $('body').append(
            '<p>' + data.gsearchInfo[index].title + '</p>');
    }
}

function getAndDisplayGsearchInfo() {
    getGsearchInfo(displayGsearchInfo);
} 

    $(function() {
        getAndDisplayAssetInfo();
        getAndDisplayGsearchInfo();
        getAndDisplayChildInfo();
        getAndDisplayUserInfo();
    })
