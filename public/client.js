


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

///////////// Child(ren) Tabbed View ///////////////////////

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

///////////// JusKidin Functions ///////////////////////

function createNewAccount() {

}

function editAccount() {

}

function deleteAccount() {

}

function  addNewChild() {

}

function editChild() {

}

function deleteChild() {

}

function uploadNewAsset() {

}

function deleteAsset() {

}

function searchAssets() {

}

function getAndDisplayImagesOnHomePage() {

}