
// var userID = '5b35886a2ba1910d14830eb7';
var userID = '';
var username = '';
var password = '';
var firstName = '';
var lastName = '';
var email = '';
var childName = '';
var childAge = '';
var drawerUploads = [];
var drawerTitle = "";
var serverBase = '//localhost:8080/';
var ACCOUNT_URL = serverBase + 'api/account';
var CHILDPROFS_URL = serverBase + `api/account/${userID}?select=childProfs`;
var ASSETS_URL = serverBase + `api/account/${userID}?select=asset`;

function getUserID() {
    return userID;
}

function setUserID(id) {
    userID = id;
}

///////////// Overlay Form Functions ///////////////////////
function loginOn() {
    document.getElementById("loginoverlay").style.display = "block";
}

function loginOff() {
    document.getElementById("loginoverlay").style.display = "none";
}

function newAccountOn() {
    document.getElementById("new-account-overlay").style.display = "block";
}

function newAccountOff() {
    document.getElementById("new-account-overlay").style.display = "none";
}

function accountOn() {
    document.getElementById("accountoverlay").style.display = "block";
}

function accountOff() {
    document.getElementById("accountoverlay").style.display = "none";
}

function childOn() {
    document.getElementById("childoverlay").style.display = "block";
}

function childOff() {
    document.getElementById("childoverlay").style.display = "none";
}

function assetOn() {
    document.getElementById("assetoverlay").style.display = "block";
}

function assetOff() {
    document.getElementById("assetoverlay").style.display = "none";
}

function drawerOn() {
    document.getElementById("draweroverlay").style.display = "block";
}

function drawerOff() {
    document.getElementById("draweroverlay").style.display = "none";
}

///////////// Child(ren) Page Functions ///////////////////////
function editProf() {
    document.getElementById("profDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn-prof')) {

    var dropdowns = document.getElementsByClassName("dropdown-prof");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function openChild(evt, childName) {
    console.log('child name', childName);
    var childID = childName.replace(/\s+/g, '-').toLowerCase();
    console.log('child id', childID);
    var i, currentChild, tablinks;
    var gsearchContainer = document.getElementsByClassName("gsearchContainer");
        for (i = 0; i < gsearchContainer.length; i++) {
            if (gsearchContainer[i].style.display = "block") {
                gsearchContainer[i].style.display = "none";
            }
    }

    currentChild = document.getElementById(childID);
    console.log('current child',currentChild.style.display);
    currentChild.style.display = "block";
    console.log('after current child',currentChild.style.display);

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(`${childID}`).style.display = "block";
    evt.currentTarget.className += " active";

    var currentAge =  $(evt.target).text().match(/\d+/)[0];
    googleSearch(currentAge, displayGoogleSearch(childID));
}

var childProfileTemplate = function (childName, birthDate) {
    var childID = childName.replace(/\s+/g, '-').toLowerCase();
    // console.log(birthDate);
    $('.dropdown-prof').append(
        `<button class="tablinks dropbtn-prof" onclick="openChild(event, '${childID}')"> ${childName} </br> ${getChildAge(birthDate)} years old</button>`
    )

    $('#GsearchResults').append(
        `<div id="${childID}" class="gsearchContainer"></div>`
    )

    $('.child-dropbtn').append(
        `<a href="#">${childName}</a>`
    )
}


function addChildProfile(firstName, birthDate) {
    console.log('Adding new child profile: ' + childName + birthDate);
    $.ajax({
      method: 'POST',
      url: `/api/account/${userID}/childProfiles`,
      data: JSON.stringify({firstName, birthDate}),
      success: function(data) {
        getAndDisplayChildProfile();
      },
      dataType: 'json',
      contentType: 'application/json'
    });
}

function getAndDisplayChildProfile() {
    console.log('Retrieving child profile');
    $.getJSON(CHILDPROFS_URL, function(items) {
      console.log('Rendering child profile');
      var childProfileElements = items.childProfs.map(function(userInfoSchema) {
        var element = $(childProfileTemplate(userInfoSchema.firstName, userInfoSchema.birthDate, userInfoSchema.id ))
        element.attr('id', userInfoSchema.id);
        return element
      });
    });
}

function getChildAge(birthDate) {
    var childAge = moment(birthDate, "MM/DD/YYYY").month(0).from(moment().month(0));
    let thenum = childAge.match(/\d+/)[0];
    return thenum;
}

function handleChildProfileAdd() {
    $('.child-age-form').submit(function(e) {
        var childName = $('#child-first-name').val();
        var birthDate = $('.child-birth-date').val();
        console.log("Child Info", childName, birthDate, $('.child-birth-date'))
        e.preventDefault();
        if (childName == '' || birthDate == '') {
            alert('Missing Information')
        } else {
            addChildProfile(childName, birthDate);
        }
    });
}

// function deleteChildProfile(userID, child_id) {
//     console.log('Deleting child profile');
//     $.ajax({
//       url: `/api/account/${userID}/childProfs/:child_id`,
//       method: 'DELETE',
//       success: getAndDisplayChildProfile
//     });
// }

// function handleChildProfileDelete() {
//     $('.dropdown-childProfile').on('click', '.child-profile-delete', function(e) {
//       e.preventDefault();
//       deleteChildProfile(
//         $(e.currentTarget).closest('.dropbtn-prof').attr('id'));
//     });
// }

// function handleChildProfileUpdate() {
//     $('.dropdown-childProfile').on('click', '.child-profile-edit', function(e) {
//         e.preventDefault();
//         editChildProfile(
//             $(e.currentTarget).closest('dropbtn-prof').attr('id'));
//     })
// }

// function editChildProfile(userID, child_id) {
//     console.log('Editing child profile');
//     $.ajax({
//         url: `/api/account/${userID}/childProfs/:child_id`,
//         method: 'PUT',
//         success: getAndDisplayChildProfile
//     });
// }

///////////// Google Search Functions ///////////////////////

function googleSearch(childAge, callback) {
    console.log("childAge", childAge);
    url = `https://content.googleapis.com/customsearch/v1?cx=013625144872242568916%3Alitmhr5z8f8&q=${childAge}%20years%20old%20developmental%20milestones&key=AIzaSyDFTLfTan551XimeNSNeKPxZcVgpfY-Z8A`,
    $.getJSON(url, callback)
}

function displayGoogleSearch(childName) {
    return function(gsearch) {
    var childID = childName.replace(/\s+/g, '-').toLowerCase();
        console.log('gsearch', gsearch);
            for ( let i = 0; i < gsearch.items.length; i ++) {
            let data = gsearch.items[i]
            if (data.pagemap.cse_thumbnail) {
                $(`#${childID}`).append(`<h2>${data.title} </h2>
                    <ul>
                        <li class="google-image"><img src="${data.pagemap.cse_thumbnail[0].src}"></li>
                        <li class="google"><a href="${data.link}">${data.link}</a></li>
                        <li class="google">${data.snippet}</li>
                    </ul>`)
            } else {
                $('.gsearchContainer').append(`<h2 #${childID}>${data.title} </h2>
                    <ul>
                        <li class="google"><a href="${data.link}">${data.link}</a></li>
                        <li class="google">${data.snippet}</li>
                    </ul>`)
            }    
        }
    }
}

function watchSubmit() {
    $('dropbtn-prof').submit(event => {
      event.preventDefault();
      let queryTarget = $(event.currentTarget).find('.child-birth-date');
      let query = queryTarget.val();
      queryTarget.val("");
    });
}
  
$(watchSubmit);

///////////// Account Functions ///////////////////////

function createNewAccount(username, password, firstName, lastName, email) {
    console.log('Creating new Account: ' + username + password + firstName + lastName + email);
    $.ajax({
      method: 'POST',
      url: ACCOUNT_URL,
      data: JSON.stringify({username, password, firstName, lastName, email}),
      success: function(data) {
        alert('New Account Created');
        //getAndDisplayAccount();
      },
      dataType: 'json',
      contentType: 'application/json'
    });
}

function handleAccountAdd() {
    $('.account-form').submit(function(e) {
        var username = $('#user-name').val();
        var password = $('#password').val();
        var firstName = $('#first-name').val();
        var lastName = $('#last-name').val();
        var email =$('#account-email').val();
        console.log("Account Info 276", username, password, firstName, lastName, email)
        e.preventDefault();
        if (username == '' || password == ''|| firstName == '' || lastName == '' || email == '') {
            alert('Missing Information')
        } else {
            createNewAccount(username, password, firstName, lastName, email);
        }
    });
}

function handleLogInUser() {
    $('.login-form').submit(function(e) {
        var username = $('#user-name').val();
        var password = $('#password2').val();
            e.preventDefault();
        if (username == '' || password == '') {
            alert('Missing Information') 
        } else {
            attemptLogInUser(username, password);
        }
    })
}

function attemptLogInUser(username, password) {
    console.log('Logging in user:' + username + password);
    $.ajax({
        method: 'POST',
        url: '/api/auth/login',
        data: JSON.stringify({username, password}),
        success: function(resData) {
            console.log('resData 316 is authToken', resData);
            alert('You have successfully logged in!');
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}

function editAccount() {
//this function will be able to edit the account information, to a tbd extent
//at least change password, get password help
}

function deleteAccount() {
//delete account
}

///////////// Drawer and Asset Functions ///////////////////////////

function editAsset() {
    document.getElementById("assetDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn-asset')) {

    var dropdowns = document.getElementsByClassName("dropdown-asset");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function openDrawer(evt, drawerTitle) {
    console.log("this drawer title", drawerTitle);
    var drawerID = drawerTitle.replace(/\s+/g, '-').toLowerCase();
    console.log('DrawerID', drawerID);
    var i, currentDrawer, tablinks;
    var uploadContainer = document.getElementsByClassName('uploadContainer');
        for (i=0; i < uploadContainer.length; i++ ) {
            if (uploadContainer[i].style.display === 'block') {
                uploadContainer[i].style.display = 'none';
            }
    }

    currentDrawer = document.getElementById(drawerID);
    currentDrawer.style.display = "block";

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(`${drawerID}`).style.display = "block";
    evt.currentTarget.className += " active";
}

//when click Pirate Ship button, give me pirateship image elements, append those the id of the div below the button

var drawerTemplate = function(drawerTitle) {
console.log('Right Here', drawerTitle);
var drawerID = drawerTitle.replace(/\s+/g, '-').toLowerCase();
    $('.dropdown-asset').append(
        `<button class="tablinks dropbtn-asset" onclick="editAsset(); openDrawer(event, '${drawerTitle}')"> ${drawerTitle}</button>`
    )

    $('#Drawer1').append(
        `<div id="${drawerID}" class="uploadContainer"></div>`
    )

    $('.asset-dropbtn').append(
        `<a href="#">${drawerTitle}</a>`
    )
}

var uploadTemplate = function(drawerTitle, title, notes, fileLocation) {
var drawerID = drawerTitle.replace(/\s+/g, '-').toLowerCase();
    $(`#${drawerID}`).append(
        `<section role="region">  
            <div class='col-4'>
                 <div class='asset'>
                 <img class='asset-image' src="${fileLocation}" alt="${title}">
                 <div>
                 <p class="asset-content"><strong>${title}</strong></p>
                 <p class="asset-content">${notes}</p>
             </div>
        </section>`
    )
}

function getAndDisplayDrawer() {
    console.log('retrieving drawer');
    $.getJSON(ASSETS_URL, function(items) {
        console.log('Rendering drawer', items);
        function uniqueDrawerTitles(input) {
            var output = [];
            for(var i=0; i < input.asset.length; i++) {
              if(output.indexOf(input.asset[i].drawerTitle) === -1)
              output.push(input.asset[i].drawerTitle);
            }
        return output;
        }
        items = uniqueDrawerTitles(items);
        var drawerElement = items.map(function(item) {
            var element = $(drawerTemplate(item))
            element.attr('id', item);
            return element
        });
        getAndDisplayUploads();
    });   
}

function getAndDisplayUploads() {
    console.log('retrieving uploads');
    $.getJSON(ASSETS_URL, function(items) {
        console.log('Rendering Uploads', items);
        drawerUploads = items.asset;
        console.log("drawer uploads", drawerUploads);
        drawerUploads.forEach(item => {
            console.log('item', item.drawerTitle);
            const drawerID = item.drawerTitle.replace(/\s+/g, '-').toLowerCase();
            $(`#${drawerID}`).append(
                `<section role="region">  
                    <div class='col-4'>
                        <div class='asset'>
                        <img class='asset-image' src="${item.fileLocation}" alt="${item.title}">
                        <div>
                        <p class="asset-content"><strong>${item.title}</strong></p>
                        <p class="asset-content">${item.notes}</p>
                    </div>
                </section>`
            )
        })
    })
}

function filterUploads() {
    console.log('drawer uploads here', drawerUploads);
   $('.tablinks').click(function() {
     //getElementById
   });
//    console.log ('uploads array', uploadsArray);
}
// text of drawer Jquery into html this.attr to specifiy the element
// this create a new array
// loop over and the appropriate html to each item
// assign 343 to a new variable
function handleDrawerAdd() {
    $('#addDrawerForm').submit(function(e) {
        e.preventDefault();
        var drawerTemplate = function(drawerTitle) {
            var drawerTitle = $('#drawer-name').val();
            $('.dropdown-asset').append(
                `<button class="tablinks dropbtn-asset" onclick="editProf(); openChild(event, '${drawerTitle}')"> ${drawerTitle}</button>` +
                `<div id="${drawerTitle}" class="assettabcontent"></div>`
            )
        
            $('.asset-dropbtn').append(
                `<a href="#">${drawerTitle}</a>`
            )
        }
        drawerTemplate("outdoor adventures");
    });
}

function editDrawer() {
//edit drawer title   
}

function deleteDrawer() {
    // console.log('Deleting drawer `' + userID + '`');
    // $.ajax({
    //   url: ASSETS_URL + '/' + userID,
    //   method: 'DELETE',
    //   success: getAndDisplayDrawer
    // }); 
}

function uploadAndDisplayAssets() {
// upload new asset from #uploadAssetForm 
// user will need to identify existing drawer to upload asset to
// asset will be added to asset.html page, under identified drawer, 
// populated with items from the #uploadAssetForm fields
}

function editUploads() {
// edit title, notes or drawer location for a particular asset
}

function deleteAsset() {
// delete a particular asset from the drawer
}

function searchAssets() {
// using search field in navbar to search title and notes input fields
// return results in search.html
}

function getAndDisplayImagesOnHomePage() {
// display six random user uploaded images on home page
}

function updateNavUser(userID) {
    $('#navAccountName').text('Log In'); 
    if (userID) {
        $('#navAccountName').text('Logged In');
    }
}

$(function() {
    // addChildProfile();
    // createNewAccount();
    if (getUserID()) {                //undefined implies not logged in, refactor later
        getAndDisplayChildProfile();
        getAndDisplayDrawer();
    }

    updateNavUser(getUserID());  //navbar handles logged in state
    handleLogInUser();
    handleChildProfileAdd();
    handleDrawerAdd();
    handleAccountAdd();
    // getAndDisplayChildProfile();
    // deleteChildProfile();
    // handleChildProfileDelete();
    // getAndDisplayDrawer();
    // getAndDisplayUploads();
    // filterUploads();
});
