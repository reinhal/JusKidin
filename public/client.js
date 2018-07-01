
var userID = '5b328daf6994df88e5ab30f4';
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
    
}


///////////// Overlay Form Functions ///////////////////////
function deleteOn() {
    document.getElementById("deleteoverlay").style.display = "block";
}

function deleteOff() {
    document.getElementById("deleteoverlay").style.display = "none";
}

function loginOn() {
    document.getElementById("loginoverlay").style.display = "block";
}

function loginOff() {
    document.getElementById("loginoverlay").style.display = "none";
}

function updateAccountOn() {
    document.getElementById("update-accountoverlay").style.display = "block";
}

function updateAccountOff() {
    document.getElementById("update-accountoverlay").style.display = "none";
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

function editAssetOn() {
    document.getElementById("edit-assetoverlay").style.display = "block";
}

function editAssetOff() {
    document.getElementById("edit-assetoverlay").style.display = "none";
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
    console.log(birthDate);
    $('.dropdown-prof').append(
        `<button class="tablinks dropbtn-prof" onclick="openChild(event, '${childID}')"> ${childName} </br> ${getChildAge(birthDate)} years old</button>`
    )

    $('#GsearchResults').append(
        `<div id="${childID}" class="gsearchContainer"></div>`
    )

    // $('.child-dropbtn').append(
    //     `<a href="#">${childName}</a>`
    // )
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
        // console.log("Child Info", childName, birthDate, $('.child-birth-date'))
        e.preventDefault();
        window.location.reload(true);
        if (childName == '' || birthDate == '') {
            alert('Missing Information')
            } else { addChildProfile(childName, birthDate);
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

function editChildProfile(userID, child_id) {
    console.log('Editing child profile');
    $.ajax({
        url: `/api/account/${userID}/childProfs/:child_id`,
        method: 'PUT',
        success: getAndDisplayChildProfile
    });
}

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
                    </ul>
                    <style type="text/css">
                    .displayTabcontent {
                        background-color: white;
                        color: 	#303030;
                        padding: 12px 12px;
                        border: 5px solid #2980b9;
                        margin: 0 50px 50px 50px;
                    }
                    </style>`)
            } else {
                $(`#${childID}`).append(`<h2 #${childID}>${data.title} </h2>
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

function createNewAccount() {
    console.log('Creating new Account:', username + password + firstName + lastName + email);
    $.ajax({
      method: 'POST',
      url: ACCOUNT_URL,
      data: JSON.stringify({username, password, firstName, lastName, email}),
      success: function(data) {
        //getAndDisplayAccount();
        alert('You have successfully created your account');
      },
      dataType: 'json',
      contentType: 'application/json'
    });
}

function handleAccountAdd() {
    $('.account-form').submit(function(e) {
        var firstName = $('#first-name').val();
        var lastName = $('#last-name').val();
        var email = $('#account-email').val();
        console.log("Account Info", firstName, lastName, email)
        e.preventDefault();
        if (firstName == '' || lastName == '' || email == '' || password == '' || username == '' ) {
            alert('Missing Information')
            } else { addAccount(username, password, firstName, lastName, email);
        }
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

var drawerTemplate = function(drawerTitle) {
console.log('Right Here', drawerTitle);
var drawerID = drawerTitle.replace(/\s+/g, '-').toLowerCase();
    $('.dropdown-asset').append(
        `<button class="tablinks dropbtn-asset" onclick="editAsset(); openDrawer(event, '${drawerTitle}')"> ${drawerTitle}</button>`
    )

    $('#Drawer1').append(
        `<div id="${drawerID}" class="uploadContainer"></div>`
    )

    // $('.asset-dropbtn').append(
    //     `<a href="#">${drawerTitle}</a>`
    // )

    $('.new-drawer-title').append(
        `<option value=${drawerTitle}>${drawerTitle}</option>`
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
                 <p class="icon"><i class="fas fa-edit"></i>Edit</p>
                 <p class="icon"><i class="fas fa-trash-alt"></i>Delete</p>
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

function handleDrawerAdd() {
    $('.drawer-age-form').submit(function(e) {
        var newDrawerTitle = $('#new-drawer-title').val();
        console.log ('creating drawer 430: ', newDrawerTitle);
        e.preventDefault();
        window.location.reload(true);
        drawerTemplate(newDrawerTitle);
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
                        <a onclick="editAssetOn()" href="#" class="icon"><i class="fas fa-edit"></i></a>
                        <a onclick="deleteOn()" href="#" class="icon"><i class="fas fa-trash-alt"></i></a>
                    </div>
                </section>`
            )
        })
    })
}

function connectImage() {
    console.log('connecting image: ' + title + notes + dateUploaded + fileLocation + drawerTitle);
    $.ajax({
        method: 'POST',
        url: `/api/account/${userID}/uploads`,
        data: JSON.stringify({title, notes, dateUploaded, fileLocation, drawerTitle}),
        success : function(data) {
            alert('You have succesfully connected the image!')
            getAndDisplayUploads();
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}


function handleImageConnect() {
    $('#connectAssetForm').submit(function(e) {
        var title = $('#title').val(); 
        var notes = $('#date-uploaded').val();
        var dateUploaded = $('#notes').val();
        var fileLocation = $('#image-url').val();
        var drawerTitle = $('#drawer-title').val();
        console.log('asset info 476', title, notes, dateUploaded, fileLocation, drawerTitle);
        e.preventDefault();
        window.location.reload(true);
        if (title == '' || notes == '' || fileLocation == '' || drawerTitle == '' || dateUploaded == '' ) {
            alert('Missing Information')
            } else { connectImage(title, notes, dateUploaded, fileLocation, drawerTitle);
        }
    });
}


function editConnectedImages() {
// edit title, notes or drawer location for a particular asset
}

function deleteConnectedImages() {
// delete a particular asset from the drawer
}


function getAndDisplayImagesOnHomePage() {
// display six random user uploaded images on home page
}

$(function() {
    createNewAccount();
    getAndDisplayChildProfile();
    handleChildProfileAdd();
    handleImageConnect();
    getAndDisplayDrawer();
    // deleteChildProfile();
    // handleChildProfileDelete();
    handleDrawerAdd();
    // getAndDisplayUploads();
    // filterUploads();
});
