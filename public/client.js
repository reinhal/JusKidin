
//const {childAge} = require('../userinfo_model');

///////////// Overlay Form Functions ///////////////////////
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

function openChild(evt, childID) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(childID).style.display = "block";
    evt.currentTarget.className += " active";
}

//document.getElementById("defaultOpen").click();
var userID = '5b291d8aeb29f2314f219591';
var childName = 'Lisa'
// var childName = $('#child-first-name').val();
var childAge = "10"
var drawerTitle = "Soccer"
var serverBase = '//localhost:8080/';
var ACCOUNT_URL = serverBase + 'api/account';
var CHILDPROFS_URL = serverBase + `api/account/${userID}?select=childProfs`;
var ASSETS_URL = serverBase + `api/account/${userID}?select=asset`;

var childProfileTemplate = function (childName, childAge, childID) { 
    
    $('.dropdown-prof').append(
        `<button class="tablinks dropbtn-prof" onclick="editProf(); openChild(event, '${childID}')"> ${childName} </br> ${getChildAge(childAge)}</button>` +
        `<div id="${childID}" class="tabcontent"></div>`
    )

    $('.child-dropbtn').append(
        `<a href="#">${childName}</a>`
    )
}
//check for child name already exisiting for this profile

function addChildProfile(userInfoSchema) {
    console.log('Adding new child profile: ' + userInfoSchema);
    $.ajax({
      method: 'POST',
      url: CHILDPROFS_URL,
      data: JSON.stringify(userInfoSchema),
      success: function(data) {
        getAndDisplayChildProfiles();
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
        var element = $(childProfileTemplate(userInfoSchema.firstName, userInfoSchema.birthDate, userInfoSchema._id ))
        element.attr('id', userInfoSchema._id);
        return element
      });
    //   $('.tablinks').html(childProfileElements);
    });
}

function getChildAge(toBeABDayStr) {
    var bday = toBeABDayStr;
    // var mdate = $(02/06/2008).val().toString();
    var birthYear = parseInt(bday.substring(0,4), 10);
    var birthMonth = parseInt(bday.substring(5,7), 10);
        
    var today = new Date();
    var birthday = new Date(birthYear, birthMonth-1,);
        
    var differenceInMilisecond = today.valueOf() - birthday.valueOf();
        
    var currentAge = Math.floor(differenceInMilisecond / 31536000000);
    
    return currentAge;
}

function handleChildProfileAdd() {
    // define variables
    $('.child-age-form').submit(function(e) {
        e.preventDefault();
        addChildProfile({
            childName: Stella, 
            //$(e.currentTarget).find('#child-first-name').val(),
            //validate childName ==== '#child-first-name').val()
            childAge: 7,
            //getChildAge("02/06/2008")
        });
    });
}

function deleteChildProfile(userID) {
    console.log('Deleting child profile');
    $.ajax({
      url: CHILDPROFS_URL,
      method: 'DELETE',
      success: getAndDisplayChildProfile
    });
}

function handleChildProfileDelete() {
    $('.dropdown-childProfile').on('click', '.child-profile-delete', function(e) {
      e.preventDefault();
      deleteChildProfile(
        $(e.currentTarget).closest('.dropbtn-prof').attr('id'));
    });
}

function editChildProfile() {

}

function deleteChildProfile() {
// add fa icon to delete childProf
// hoverable window to check are you sure? 
}

///////////// Google Search Functions ///////////////////////

function googleSearch(childAge, callback) {
    url = 'https://content.googleapis.com/customsearch/v1?cx=013625144872242568916%3Alitmhr5z8f8&q=' + `${getChildAge(childAge)}` + '%20year%20old%20developmental%20milestones&key=AIzaSyDFTLfTan551XimeNSNeKPxZcVgpfY-Z8A',
    $.getJSON(url, callback)
}

function displayGoogleSearch(gsearch) {
    console.log(gsearch, 'gsearch');
    for ( let i = 0; i < gsearch.items.length; i ++) {
        let data = gsearch.items[i]
        if (data.pagemap.cse_thumbnail) {
            $('.tabcontent').append(`<h2>${data.title} </h2>
                <ul>
                    <li class="google-image"><img src="${data.pagemap.cse_thumbnail[0].src}"></li>
                    <li class="google"><a href="${data.link}">${data.link}</a></li>
                    <li class="google">${data.snippet}</li>
                </ul>`)
        } else {
            $('.tabcontent').append(`<h2>${data.title} </h2>
                <ul>
                    <li class="google"><a href="${data.link}">${data.link}</a></li>
                    <li class="google">${data.snippet}</li>
                </ul>`)
        }
        
    }
}

// googleSearch(2, displayGoogleSearch);

function watchSubmit() {
    $('.child-age-form').submit(event => {
      event.preventDefault();
      let queryTarget = $(event.currentTarget).find('.child-birth-date');
      let query = queryTarget.val();
      queryTarget.val("");
      googleSearch(query, displayGoogleSearch);
    });
}
  
$(watchSubmit);

///////////// Account Functions ///////////////////////

function createNewAccount() {
// this function will create a new user, with password and authentication
// it will take first name, last name, email
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

function openDrawer(evt, drawerName) {
    var i, assettabcontent, tablinks;
    assettabcontent = document.getElementsByClassName("assettabcontent");
    for (i = 0; i < assettabcontent.length; i++) {
        assettabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(drawerName).style.display = "block";
    evt.currentTarget.className += " active";
}

var drawerTemplate = function(drawerTitle) {

    $('.dropdown-asset').append(
        `<button class="tablinks dropbtn-asset" onclick="editProf(); openChild(event, '${drawerTitle}')"> ${drawerTitle}</button>` +
        `<div id="${drawerTitle}" class="assettabcontent"></div>`
    )

    $('.asset-dropbtn').append(
        `<a href="#">${drawerTitle}</a>`
    )
}

function addDrawer(userInfoSchema) {
   
}
function getAndDisplayDrawer() {
   
// This function will take information from the #addDrawerForm to create a new drawer to hold user uploaded assets
// from the #drawer-name field it need to create a new .tab button element on the asset.html page 
// this drawer will hold assets uploaded by user
}

function handleDrawerAdd() {
    $('#addDrawerForm').submit(function(e) {
        e.preventDefault();
        var drawerTemplate = function(drawerTitle) {

            $('.dropdown-asset').append(
                `<button class="tablinks dropbtn-asset" onclick="editProf(); openChild(event, '${drawerTitle}')"> ${drawerTitle}</button>` +
                `<div id="${drawerTitle}" class="assettabcontent"></div>`
            )
        
            $('.asset-dropbtn').append(
                `<a href="#">${drawerTitle}</a>`
            )
        }
        // addChildProfileTab({
        //     drawerTitle: $(e.currentTarget).find('#drawer-name').val(),
        // });
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

function editAsset() {
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

$(function() {
    //addChildProfile();
    getAndDisplayChildProfile();
    handleChildProfileAdd();
    deleteChildProfile();
    handleChildProfileDelete();
    handleDrawerAdd();
});