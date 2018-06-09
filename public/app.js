//import { callbackify } from "util";

var MOCK_USER_INFO = {
    "UserInfo": [
        {
            "id": "123123",
            "firstName": "Swarming",
            "lastName": "Hive",
            "email": "sb@thehive.com",
            "childProfs": [
                {
                    "id": "654654",
                    "firstName": "Sweet",
                    "lastName": "Hive",
                    "birthDate": "10/30/18",
                    "sex": "male"
                },
                {
                    "id": "154154",
                    "firstName": "Little",
                    "lastName": "Hive",
                    "birthDate": "08/22/16",
                    "sex": "female"
                }
            ],
            "asset": [
                {
                    "title": "pic1",
                    "dateUploaded": "11/27/18", 
                    "fileLocation": "/IMG_0032.jpg"
                },
                {
                    "title": "pic2",
                    "dateUploaded": "05/28/17", 
                    "fileLocation": "/IMG_0006.jpg"
                },
                {
                    "title": "mov1",
                    "dateUploaded": "05/25/15", 
                    "fileLocation": "/IMG_0016.m4v"
                }
            ]
        },
        {
            "id": "234234",
            "firstName": "Queen",
            "lastName": "Lady",
            "email": "qb@thehive.com",
            "childProfs": [
                {
                    "id": "876876",
                    "firstName": "Dina",
                    "lastName": "Lady",
                    "birthDate": "04/22/15",
                    "sex": "male"
                },
                {
                    "id": "437437",
                    "firstName": "Nyle",
                    "lastName": "Lady",
                    "birthDate": "03/12/14",
                    "sex": "female"
                }
            ],
            "asset": [
                {
                    "title": "pic3",
                    "dateUploaded": "05/27/18", 
                    "fileLocation": "/IMG_0052.jpg"
                },
                {
                    "title": "pic4",
                    "dateUploaded": "05/26/18", 
                    "fileLocation": "/IMG_0009.jpg"
                },
                {
                    "title": "mov2",
                    "dateUploaded": "05/25/18", 
                    "fileLocation": "/IMG_0010.m4v"
                }
            ]
        },
        {
            "id": "345345",
            "firstName": "Working",
            "lastName": "Bees",
            "email": "wb@thehive.com",
            "childProfs": [
                {
                    "id": "097097",
                    "firstName": "Morwenna",
                    "lastName": "Bees",
                    "birthDate": "06/22/12",
                    "sex": "male"
                },
                {
                    "id": "842842",
                    "firstName": "Keavy",
                    "lastName": "Bees",
                    "birthDate": "10/14/16",
                    "sex": "female"
                }
            ],
            "asset": [
                {
                    "title": "pic4",
                    "dateUploaded": "03/02/17", 
                    "fileLocation": "/IMG_0252.jpg"
                },
                {
                    "title": "pic5",
                    "dateUploaded": "01/26/16", 
                    "fileLocation": "/IMG_0019.jpg"
                },
                {
                    "title": "mov3",
                    "dateUploaded": "09/18/14", 
                    "fileLocation": "/IMG_0023.m4v"
                }
            ]
        },
        {
            "id": "456456",
            "firstName": "Drone",
            "lastName": "Stinger",
            "email": "db@thehive.com",
            "childProfs": [
                {
                    "id": "398398",
                    "firstName": "Rafi",
                    "lastName": "Stinger",
                    "birthDate": "05/28/15",
                    "sex": "male"
                },
                {
                    "id": "877877",
                    "firstName": "Kaira",
                    "lastName": "Stinger",
                    "birthDate": "01/08/17",
                    "sex": "female"
                }
            ],
            "asset": [
                {
                    "title": "pic6",
                    "dateUploaded": "04/07/13", 
                    "fileLocation": "/IMG_0152.jpg"
                },
                {
                    "title": "pic7",
                    "dateUploaded": "10/16/14", 
                    "fileLocation": "/IMG_0109.jpg"
                },
                {
                    "title": "mov4",
                    "dateUploaded": "09/13/15", 
                    "fileLocation": "/IMG_0110.m4v"
                }
            ]
        },
        {
            "id": "567567",
            "firstName": "Honey",
            "lastName": "Comb",
            "email": "hb@thehive.com",
            "childProfs": [
                {
                    "id": "725725",
                    "firstName": "Lyndsey",
                    "lastName": "Comb",
                    "birthDate": "06/23/16",
                    "sex": "male"
                },
                {
                    "id": "197623",
                    "firstName": "Esa",
                    "lastName": "Comb",
                    "birthDate": "11/02/14",
                    "sex": "female"
                }
            ],
            "asset": [
                {
                    "title": "pic8",
                    "dateUploaded": "03/25/17", 
                    "fileLocation": "/IMG_0025.jpg"
                },
                {
                    "title": "pic29",
                    "dateUploaded": "02/22/15", 
                    "fileLocation": "/IMG_0019.jpg"
                },
                {
                    "title": "mov5",
                    "dateUploaded": "06/221/16", 
                    "fileLocation": "/IMG_0011.m4v"
                }
            ]
        }
    ]
}
function getUserInfo(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_USER_INFO)}, 1);
}

function displayUserInfo(data) {
    for (index in data.userInfo) {
    }
}

function getAndDisplayUserInfo() {
    getUserInfo(displayUserInfo);
}

function getChildInfo(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_USER_INFO)}, 1);
}

function displayChildInfo(data) {
    for (index in data.userInfo.childProfs) {
    }
}

function getAndDisplayChildInfo() {
    getChildInfo(displayChildInfo);
}

function getAssetInfo(callbackFn) {
    setTimeout(function(){callbackFn(MOCK_USER_INFO)}, 1);
}

function displayAssetInfo(data) {
    for (index in data.userInfo) {
    }
}

function getAndDisplayAssetInfo() {
    getAssetInfo(displayAssetInfo);
} 

var MOCK_GSEARCH_INFO = {
    "gsearchInfo": [
        {
            "kind": "customsearch#result",
            "title": "Facts | Child Development | NCBDDD | CDC",
            "htmlTitle": "Facts | Child <b>Development</b> | NCBDDD | CDC",
            "link": "https://www.cdc.gov/ncbddd/childdevelopment/facts.html",
            "displayLink": "www.cdc.gov",
            "snippet": "Feb 22, 2018 ... Skills such as taking a first step, smiling for the first time, and waving “bye-bye” \nare called developmental milestones. Children reach milestones ...",
            "htmlSnippet": "Feb 22, 2018 <b>...</b> Skills such as taking a first step, smiling for the first time, and waving “bye-bye” <br>\nare called <b>developmental milestones</b>. Children reach milestones&nbsp;...",
            "cacheId": "AOZlm9RcR8IJ",
            "formattedUrl": "https://www.cdc.gov/ncbddd/childdevelopment/facts.html",
            "htmlFormattedUrl": "https://www.cdc.gov/ncbddd/child<b>development</b>/facts.html",
            "pagemap": {
              "cse_thumbnail": [
                {
                  "width": "318",
                  "height": "159",
                  "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQPcqChm5UMX0MSJen4ZlOiVxvw6J3_BHsydKUNaxZFatWYzItNSrHepxD"
                }
              ],
              "cse_image": [
                {
                  "src": "https://www.cdc.gov/ncbddd/childdevelopment/sm/sm-diverse-children-600x300.jpg"
                }
              ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Child Development Home | NCBDDD | CDC",
            "htmlTitle": "Child <b>Development</b> Home | NCBDDD | CDC",
            "link": "https://www.cdc.gov/ncbddd/childdevelopment/index.html",
            "displayLink": "www.cdc.gov",
            "snippet": "Nov 15, 2017 ... Development, milestones, and screening. ... Learn about Language Disorders, \nLearning Disorders, and other developmental conditions.",
            "htmlSnippet": "Nov 15, 2017 <b>...</b> <b>Development</b>, <b>milestones</b>, and screening. ... Learn about Language Disorders, <br>\nLearning Disorders, and other developmental conditions.",
            "cacheId": "U4q20VFJ9iUJ",
            "formattedUrl": "https://www.cdc.gov/ncbddd/childdevelopment/index.html",
            "htmlFormattedUrl": "https://www.cdc.gov/ncbddd/child<b>development</b>/index.html",
            "pagemap": {
              "cse_thumbnail": [
                {
                  "width": "318",
                  "height": "159",
                  "src": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTcxo0iXE3YdNx-S9EvGEc9bAFE9Sn3IVovesWYtCINY2XDUyHOBc6oJrE"
                }
                ],
              "cse_image": [
                {
                  "src": "https://www.cdc.gov/ncbddd/childdevelopment/sm/sm-father-reading-to-children-600x300.jpg"
                }
                ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Creative Play for Toddlers | Ask Dr Sears",
            "htmlTitle": "Creative Play for Toddlers | Ask Dr Sears",
            "link": "https://www.askdrsears.com/topics/parenting/child-rearing-and-development/bright-starts-babys-development-through-interactive-play/2-years-creative-play",
            "displayLink": "www.askdrsears.com",
            "snippet": "Gross Motor Development. From this time on, ... Fine Motor Development. Artistic \nskills using .... Main Developmental Milestones 2 years and up: One-on-one ...",
            "htmlSnippet": "Gross Motor Development. From this time on, ... Fine Motor Development. Artistic <br>\nskills using .... Main <b>Developmental Milestones</b> 2 years and up: One-on-one&nbsp;...",
            "cacheId": "MDH_ENE5UC0J",
            "formattedUrl": "https://www.askdrsears.com/...development/...development.../2-years-creative -play",
            "htmlFormattedUrl": "https://www.askdrsears.com/...<b>development</b>/...<b>development</b>.../2-years-creative -play",
            "pagemap": {
              "cse_thumbnail": [
                {
                  "width": "235",
                  "height": "214",
                  "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0GB36NUx-wUYfX_2ZhBGTQCFXuaZrEmngZyQHondkXOfdVT_yRkWivk"
                }
              ],
              "cse_image": [
                {
                  "src": "https://www.askdrsears.com/wp-content/uploads/2013/08/creative-play.jpg"
                }
                ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "8 Infant Sleep Facts Every Parent Should Know",
            "htmlTitle": "8 Infant Sleep Facts Every Parent Should Know",
            "link": "https://www.askdrsears.com/topics/health-concerns/sleep-problems/8-infant-sleep-facts-every-parent-should-know",
            "displayLink": "www.askdrsears.com",
            "snippet": "Yet, if you consider the developmental principle that infants sleep the way they .... \nMajor developmental milestones, such as sitting, crawling, and walking, drive ...",
            "htmlSnippet": "Yet, if you consider the developmental principle that infants sleep the way they .... <br>\nMajor <b>developmental milestones</b>, such as sitting, crawling, and walking, drive&nbsp;...",
            "cacheId": "MF0MMIFZJ7UJ",
            "formattedUrl": "https://www.askdrsears.com/.../8-infant-sleep-facts-every-parent-should-know",
            "htmlFormattedUrl": "https://www.askdrsears.com/.../8-infant-sleep-facts-every-parent-should-know",
            "pagemap": {
              "cse_thumbnail": [
                {
                  "width": "311",
                  "height": "162",
                  "src": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRVa_t-YgtTacLjW55mgK8BwWXavrMfN4DScL5AIuIqg1AswKsI9xY6q5H8"
                }
                ],
              "cse_image": [
                {
                  "src": "https://www.askdrsears.com/wp-content/uploads/2013/08/baby-sleep.png"
                }
                ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Developmental Milestones of Young Children by Redleaf Press",
            "htmlTitle": "<b>Developmental Milestones</b> of Young Children by Redleaf Press",
            "link": "https://www.goodreads.com/book/show/26196291-developmental-milestones-of-young-children",
            "displayLink": "www.goodreads.com",
            "snippet": "Developmental Milestones of Young Children has 3 ratings and 1 review. \nUnderstand the important milestones of development in children in five \ndevelopment...",
            "htmlSnippet": "<b>Developmental Milestones</b> of Young Children has 3 ratings and 1 review. <br>\nUnderstand the important milestones of development in children in five <br>\ndevelopment...",
            "cacheId": "7jwJEUn7SiIJ",
            "formattedUrl": "https://www.goodreads.com/.../26196291-developmental-milestones-of- young-children",
            "htmlFormattedUrl": "https://www.goodreads.com/.../26196291-<b>developmental</b>-<b>milestones</b>-of- young-children",
            "pagemap": {
              "cse_thumbnail": [
                {
                  "width": "310",
                  "height": "163",
                  "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQMsstPnn_QhGckDsp1Code5V-N8oDjTu-HlmHMQranMuVI_RxKoFs7dWi_"
                }
                ],
              "cse_image": [
                {
                  "src": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1445432998i/26196291._UY630_SR1200,630_.jpg"
                }
                ]
            }  
        }
    ]
}

function getGsearchInfo(callbackFn) {
    setTimeout(function(){callbackFn(MOCK_GSEARCH_INFO)}, 1);
}

function displayGsearchInfo(data) {
    for (index in data.gsearchInfo) {
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

//  Responsive Navigation Menu