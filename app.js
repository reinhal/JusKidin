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

$(function() {
    getAndDisplayChildInfo();
})

var MOCK_NEWS_INFO = {
    "newsInfo": {
        "status": "ok",
        "totalResults": 1747,
            "articles": [
        {
        "source": {
        "id": "engadget",
        "name": "Engadget"
        },
        "author": "Katrina Filippidis",
        "title": "Apple blocks Steam Link on iOS for 'business conflicts'",
        "description": "Valve's Steam Link was on course to come to mobile this week. While the beta version arrived on Google Play just fine, the iOS app appears to have hit an unexpected roadblock. Valve said in a statement that Apple approved then withdrew it from the App Store: …",
        "url": "https://www.engadget.com/2018/05/25/apple-blocks-steam-link-ios/",
        "urlToImage": "https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fs.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F4e8ce82cc303430619a6dff2c3c4592c%2F206403772%2Fsteam_link_beta_1.png&client=cbc79c14efcebee57402&signature=786de7334c5e601163931c85936005316c9b1a9f",
        "publishedAt": "2018-05-25T12:40:00Z"
        },
        {
        "source": {
        "id": "wired",
        "name": "Wired"
        },
        "author": "Lauren Goode",
        "title": "What to Think About Before Buying a Used Smartphone",
        "description": "New isn’t always better, but there are three key things to consider before you take the pre-owned plunge.",
        "url": "https://www.wired.com/story/how-to-buy-a-used-phone/",
        "urlToImage": "https://media.wired.com/photos/5b0765e2c13be438098d2a3c/191:100/pass/usedphones.jpg",
        "publishedAt": "2018-05-25T12:00:00Z"
        },
        {
        "source": {
        "id": null,
        "name": "Cnet.com"
        },
        "author": "Laura Hautala",
        "title": "Why it’s meaningless to accept a privacy policy - CNET",
        "description": "You're drowning in these thanks to the GDPR. But they leave out something important.",
        "url": "https://www.cnet.com/news/why-its-meaningless-to-accept-a-privacy-policy-gdpr/",
        "urlToImage": "https://cnet2.cbsistatic.com/img/LHpm9f7q8_ahs6n-Ra4JcLCm5Wo=/2018/05/24/3df11af6-90ea-4e9a-932a-484ad4b8c72a/gettyimages-955944642.jpg",
        "publishedAt": "2018-05-25T12:00:16Z"
        },
        {
        "source": {
        "id": "business-insider",
        "name": "Business Insider"
        },
        "author": "Reuters",
        "title": "Meghan Markle gives gold demand a boost",
        "description": "AP Photo/ Dominic Lipinski, Pool US gold demand in the first quarter was the strongest since 2009, the World Gold Council says. Meghan Merkle favors yellow gold and sellers say she was a driving force in its revival. (Reuters) - The Meghan Markle effect has s…",
        "url": "http://www.businessinsider.com/r-meghan-markle-makes-gold-sales-sparkle-2018-5",
        "urlToImage": "https://amp.businessinsider.com/images/5a5e2d0928eecc420c8b4f2e-640-320.jpg",
        "publishedAt": "2018-05-25T10:59:00Z"
        },
        {
        "source": {
        "id": null,
        "name": "Slashdot.org"
        },
        "author": "BeauHD",
        "title": "Android Creator Puts Essential Up For Sale, Cancels Next Phone",
        "description": "Bloomberg reports that Andy Rubin's Essential Products business is considering selling itself and has canceled development of a new smartphone. The news comes several months after numerous reports suggested that the Essential Phone's sales were tepid. From th…",
        "url": "https://hardware.slashdot.org/story/18/05/24/2230249/android-creator-puts-essential-up-for-sale-cancels-next-phone",
        "urlToImage": "https://a.fsdn.com/sd/topics/business_64.png",
        "publishedAt": "2018-05-25T00:20:00Z"
        }, 
    ]
    },
};

function getNewsInfo(callbackFn) {
    setTimeout(function(){callbackFn(MOCK_NEWS_INFO)}, 1);
}

function displayNewsInfo(data) {
    for (index in data.newsInfo) {
        $('body').append(
            '<p>' + data.newsInfo[index].title + '</p>');
    }
}

function getAndDisplayNewsInfo() {
    getNewsInfo(displayNewsInfo);
}

$(function() {
    getAndDisplayNewsInfo();
})

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

$(function() {
    getAndDisplayAssetInfo();
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
                '<p>' + data.resourceInfo[index].summary + '</p>');
        }
    }
    
    function getAndDisplayResourceInfo() {
        getResourceInfo(displayResourceInfo);
    }
    
    $(function() {
        getAndDisplayResourceInfo();
    })
    