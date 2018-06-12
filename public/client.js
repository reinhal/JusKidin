


const {childAge} = require('../userinfo_model');

///////////// Overlay Form Functions ///////////////////////


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

function  addNewChild() {
// this function will need to take input from #child-age-form
// to get value for childAge var 
// and to create another a link in .dropdown-content in nav
// and to create another tab in tablinks
// the link and the tab will take the value of the input from #first-name
}

function editChild() {
// add fa icon to edit info input of #child-age-form
}

function deleteChild() {
// add fa icon to delete childProf
}

///////////// Google Search Functions ///////////////////////

function googleSearch(childAge, callback) {
    url = `https://content.googleapis.com/customsearch/v1?cx=013625144872242568916%3Alitmhr5z8f8&q=developmental%20milestones%20for%20" + {childAge} + "&key=AIzaSyDFTLfTan551XimeNSNeKPxZcVgpfY-Z8A`,
    $.getJSON(url, callback)
}

function displayGoogleSearch(gsearch) {
    console.log(gsearch);
  $('.tabcontent').html(`<h2>Web Resources: ${gsearch[0].title} </h2>
        <ul>
            <li>${gsearch[0].pagemap.cse_thumbnail.width}</li>
            <li>${gsearch[0].pagemap.cse_thumbnail.height}</li>
            <li>${gsearch[0].pagemap.cse_thumbnail.src}</li>
            <li>${gsearch[0].link} </li>
            <li>${gsearch[0].snippet}</li>
        </ul>`)
}

// need to increase the number of search result items to at least 5 or 6

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

}

function editAccount() {

}

function deleteAccount() {

}

///////////// Drawer Functions ///////////////////////

function createDrawer() {

}

function editDrawer() {
    
}

function deleteDrawer() {
    
}

function uploadNewAsset() {

}

function deleteAsset() {

}

function searchAssets() {

}

function getAndDisplayImagesOnHomePage() {

}