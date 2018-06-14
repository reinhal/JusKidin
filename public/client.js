


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

function openChild(evt, childName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(childName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

function  addNewChild(firstName, birthDate, callback) {
    url = '',
    $.getJSON(url, callback)
// this function will need to take input from #child-age-form
// to get value for childAge var 
// and to create another a link in .dropdown-content in nav
// and to create another tab in tablinks
// the link and the tab will take the value of the input from #first-name
}

function editChild() {
// add fa icon to edit info input of #child-age-form
// I am holding off on this function for the time being
}

function deleteChild() {
// add fa icon to delete childProf
// maybe through a dropdown menu on hover of child
}

///////////// Google Search Functions ///////////////////////

function googleSearch(childAge, callback) {
    url = 'https://content.googleapis.com/customsearch/v1?cx=013625144872242568916%3Alitmhr5z8f8&q=' + childAge + '%20year%20old%20&key=AIzaSyDFTLfTan551XimeNSNeKPxZcVgpfY-Z8A',
    $.getJSON(url, callback)
}

function displayGoogleSearch(gsearch) {
    console.log(gsearch, 'gsearch');
    for ( let i = 0; i < gsearch.items.length; i ++) {
  $('.tabcontent').append(`<h2>${gsearch.items[i].title} </h2>
        <ul>
            <li class="google-image"><img src="${gsearch.items[i].pagemap.cse_thumbnail[i].src}" alt="" size="${gsearch.items[i].pagemap.cse_thumbnail[i].width}x${gsearch.items[i].pagemap.cse_thumbnail[i].height}"></li>
            <li class="google"><a href="${gsearch.items[i].link}">${gsearch.items[i].link}</a></li>
            <li class="google">${gsearch.items[i].snippet}</li>
        </ul>`)
    }
}

googleSearch(7, displayGoogleSearch);

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

///////////// Drawer and Asset Functions ///////////////////////

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

function createDrawer() {
// This function will take information from the #addDrawerForm to create a new drawer to hold user uploaded assets
// from the #drawer-name field it need to create a new .tab button element on the asset.html page 
// this drawer will hold assets uploaded by user
}

function editDrawer() {
//edit drawer title   
}

function deleteDrawer() {
// delete drawer and all contents   
}

function uploadNewAsset() {
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