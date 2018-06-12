
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

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

///////////// JusKidin Functions ///////////////////////

function createNewAccount() {

}

function editAccount() {

}

function deleteAccount() {

}

function  addNewChild() {

}

function displayGoogleSearch() {

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