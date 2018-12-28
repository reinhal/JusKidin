'use strict';

// var userID = '5b35886a2ba1910d14830eb7';
var userID = '';
var username = '';
var password = '';
var dateUploaded = '';
var fileLocation = '';
var firstName = '';
var notes = '';
var title = '';
var lastName = '';
var email = '';
var childName = '';
var childAge = '';
var drawerUploads = [];
var drawerTitle = '';
// var serverBase = '//localhost:8080/'; //remove this from all endpoints
var ACCOUNT_URL = 'api/account';

function getUserID() {
  return userID;
}

function setUserID(id) {
  userID = id;
}

///////////// Overlay Form Functions ///////////////////////
function directionsOn() {
  document.getElementById('directionsoverlay').style.display = 'block';
}

function directionsOff() {
  document.getElementById('directionsoverlay').style.display = 'none';
}

function deleteOn() {
  document.getElementById('deleteoverlay').style.display = 'block';
}

function deleteOff() {
  document.getElementById('deleteoverlay').style.display = 'none';
}

function loginOn() {
  document.getElementById('loginoverlay').style.display = 'block';
}

function loginOff() {
  document.getElementById('loginoverlay').style.display = 'none';
}

function logoffOn() {
  document.getElementById('logoffoverlay').style.display = 'block';
}

function logoffOff() {
  document.getElementById('logoffoverlay').style.display = 'none';
}

function updateAccountOn() {
  document.getElementById('update-accountoverlay').style.display = 'block';
}

function updateAccountOff() {
  document.getElementById('update-accountoverlay').style.display = 'none';
}

function accountOn() {
  document.getElementById('accountoverlay').style.display = 'block';
}

function accountOff() {
  document.getElementById('accountoverlay').style.display = 'none';
}

function childOn() {
  document.getElementById('childoverlay').style.display = 'block';
}

function childOff() {
  document.getElementById('childoverlay').style.display = 'none';
}

function updateChildOn() {
  document.getElementById('update-childoverlay').style.display = 'block';
}

function updateChildOff() {
  document.getElementById('update-childoverlay').style.display = 'none';
}

function assetOn() {
  document.getElementById('assetoverlay').style.display = 'block';
}

function assetOff() {
  document.getElementById('assetoverlay').style.display = 'none';
}

function drawerOn() {
  document.getElementById('draweroverlay').style.display = 'block';
}

function drawerOff() {
  document.getElementById('draweroverlay').style.display = 'none';
}

function gsearchOn() {
  document.getElementById('GsearchResults').style.display = 'block';
}

function gsearchOff() {
  document.getElementById('GsearchResults').style.display = 'none';
}

function headerOn() {
  document.getElementById('home-title').style.display = 'block';
}

function headerOff() {
  document.getElementById('home-title').style.display = 'none';
}

function photosOff() {
  document.getElementById('photo-grid').style.display = 'none';
}

function photosOn() {
  document.getElementById('photo-grid').style.display = 'block';
}

function drawerDisplayOff() {
  document.getElementById('asset-display').style.display = 'none';
}

function drawerDisplayOn() {
  document.getElementById('asset-display').style.display = 'block';
}

///////////// Child(ren) Page Functions ///////////////////////

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn-prof')) {
    var dropdowns = document.getElementsByClassName('dropdown-prof');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

function openChild(evt, childName) {
  var childID = childName.replace(/\s+/g, '-').toLowerCase();
  var i, currentChild, tablinks;
  var gsearchContainer = document.getElementsByClassName('gsearchContainer');
  for (i = 0; i < gsearchContainer.length; i++) {
    if (gsearchContainer[i].style.display = 'block') {
      gsearchContainer[i].style.display = 'none';
    }
  }

  currentChild = document.getElementById(childID);
  currentChild.style.display = 'block';
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  document.getElementById(`${childID}`).style.display = 'block';
  evt.currentTarget.className += ' active';

  var currentAge =  $(evt.target).text().match(/\d+/)[0];
  googleSearch(currentAge, displayGoogleSearch(childID));
}

var childProfileTemplate = function (childName, birthDate) {
  var childID = childName.replace(/\s+/g, '-').toLowerCase();
  $('.child-dropbtn').append(
    `<button class="tablinks dropbtn-prof child-nav" onclick="openChild(event, '${childID}'), gsearchOn(), headerOff(), photosOff(), drawerDisplayOff()"> ${childName} </br> ${getChildAge(birthDate)} years old</button>`
  );

  $('#GsearchResults').append(
    `<div id="${childID}" class="gsearchContainer">You are currently viewing resources for <span class="drawer-title-display">${getChildAge(birthDate)} year old ${childName}</span>.</div>`
  );
};

function addChildProfile(firstName, birthDate) {
  userID =  localStorage.getItem('userID');
  $.ajax({
    method: 'POST',
    url: `/api/account/${userID}/childProfiles`,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    data: JSON.stringify({firstName, birthDate}),
    success: function() {
      getAndDisplayChildProfile();
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function getAndDisplayChildProfile() {
  userID =  localStorage.getItem('userID');
  var CHILDPROFS_URL = `api/account/${userID}?select=childProfs`;
  $.ajax({
    method: 'GET',
    url: CHILDPROFS_URL,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: function(data) {
      var childProfileElements = data.childProfs.map(function(userInfoSchema) {
        var element = $(childProfileTemplate(userInfoSchema.firstName, userInfoSchema.birthDate, userInfoSchema.id ));
        element.attr('id', userInfoSchema.id);
        return element;
      });
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function getChildAge(birthDate) {
  var childAge = moment(birthDate, 'MM/DD/YYYY').month(0).from(moment().month(0));
  let thenum = childAge.match(/\d+/)[0];
  return thenum;
}

function handleChildProfileAdd() {
  $('#addChildForm').on('click', '#childoverlaybutton', function(e) {
    var childName = $('#child-first-name').val();
    var birthDate = $('.child-birth-date').val();
    e.preventDefault();
    window.location.reload(true);
    if (childName === '' || birthDate === '') {
      $('.feedback-messages').text('Missing Information'); 
    } else {
      addChildProfile(childName, birthDate);
    }
  });
}

////These functions will be fully implemented in future development////////////
function handleChildProfileUpdate() {
  $('body').on('click', '.updatechildoverlaybutton', function(e) {
    $(e.currentTarget).closest('.dropbtn-prof').attr('ChildID');
    var childName = $('#newChildName').val();
    var birthDate = $('#newBirthDate').val();
    e.preventDefault();
    if (childName === '' || birthDate === '') {
      $('.feedback-messages').text('Missing Information'); 
    } else {
      editChildProfile(childName, birthDate);
    }
    // editChildProfile(
    //   $(e.currentTarget).closest('dropbtn-prof').attr('id'));
  });
}

function editChildProfile(userID, childID, childName, birthDate) {
  userID =  localStorage.getItem('userID');
  $.ajax({
    method: 'PUT',
    url: `/api/account/${userID}/childProfs/${childID}`,
    data: JSON.stringify({childName, birthDate}),
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: function(data) {
      $('.success-messages').text('Child Profile Successfully Updated!');
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function getAndDisplayCurrentChildInfo() {
  userID =  localStorage.getItem('userID');
  var CURRENTCHILD_URL = `api/account/${userID}/childProfs/`;
  $.ajax({
    method: 'GET',
    url: CURRENTCHILD_URL,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: function(data) {
      $('.updateChild').append(
        `<button class ="close-form" type="submit" onclick="updateChildOff()"><i class="fas fa-times"></i></button>
          <form class="update-child-age-form">
            <ul class="flex-outer">
              <p class="form-title">Edit Child Information</p>
              <li>
                <label class="label" for="newChildName">First Name</label>
                <input type="text" id="newChildName" placeholder="Enter child's first name here">
              </li>
              <li>
                <label class="label" for="newBirthDate">Child's Birth Date</label>
                <input type="text" class="newBirthDate" id="birth-date" placeholder="mm/dd/yyyy">
              </li>
              <li>
                <button class="updatechildoverlaybutton">Update</button>
              </li>
            </ul>
            <p class="delete-child-text">Click here to <a class="delete-child-link" click="" href="javascript:void(0)">delete</a> this child profile.</p>
            <p class="feedback-messages"></p>
          </form>`);
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}
function deleteChildProfile(userID, childID) {
  $.ajax({
    url: `/api/account/${userID}/childProfs/${childID}`,
    method: 'DELETE',
    success: getAndDisplayChildProfile
  });
}
function handleChildProfileDelete() {
  $('.delete-child-link').on('click', '.child-profile-delete', function(e) {
    e.preventDefault();
    deleteChildProfile(
      $(e.currentTarget).closest('.dropbtn-prof').attr('id'));
  });
}

///////////// Google Search Functions ///////////////////////

function googleSearch(childAge, callback) {
  $.getJSON(
    `https://content.googleapis.com/customsearch/v1?cx=013625144872242568916%3Alitmhr5z8f8&q=${childAge}%20years%20old%20developmental%20milestones&key=AIzaSyDFTLfTan551XimeNSNeKPxZcVgpfY-Z8A`,
    callback);
}
// somehow limit to 10 results

function displayGoogleSearch(childName) {
  return function(gsearch) {
    var childID = childName.replace(/\s+/g, '-').toLowerCase();
    for (let i = 0; i < gsearch.items.length; i ++) {
      let data = gsearch.items[i];
      if (data.pagemap.cse_thumbnail) {
        $(`#${childID}`).append(`<ul class="gsearch-ul">
            <li>
              <div class="gsearch-result"><img class="google-image" src="${data.pagemap.cse_thumbnail[0].src}"><h2 class="gsearch-title">${data.title}</h2>
                <p class="google-snippet">
                  ${data.snippet}<br><a class="google-link" href="${data.link}">Click Here to Read Full Article</a>
                </p>
              </div>
            </li>
          </ul>
          <style type="text/css">
          .displayTabcontent {
            background-color: white;
            color: 	#303030;
            padding: 12px 12px;
            border: 5px solid darkturquoise;
            margin: 0 50px 50px 50px;
          }
          </style>`);
      } else {
        $(`#${childID}`).append(`<ul class="gsearch-ul">
        <li>
          <div class="gsearch-result"><h2 class="gsearch-title">${data.title}</h2>
            <p class="google-snippet">
              ${data.snippet}<br><a class="google-link" href="${data.link}">Click Here to Read Full Article</a>
            </p>
          </div>
        </li>
      </ul>
          <style type="text/css">
          .displayTabcontent {
            background-color: white;
            color: 	#303030;
            padding: 12px 12px;
            border: 5px solid darkturquoise;
            margin: 0 50px 50px 50px;
          }
          </style>`);
      }    
    }
  };
}

function watchSubmit() {
  $('dropbtn-prof').submit(event => {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.child-birth-date');
    let query = queryTarget.val();
    queryTarget.val('');
  });
}
  
$(watchSubmit);

////////////////////////////////// Account Functions //////////////////////////////////

function createNewAccount(username, password, firstName, lastName, email) {
  $.ajax({
    method: 'POST',
    url: ACCOUNT_URL,
    data: JSON.stringify({username, password, firstName, lastName, email}),
    success: function(data) {
      attemptLogInUser(username, password);
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function handleAccountAdd() {
  $('.account-form').submit(function(e) {
    var username = $('#new-user-name').val();
    var password = $('#password').val();
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var email =$('#account-email').val();
    e.preventDefault();
    if (username == '' || password == ''|| firstName == '' || lastName == '' || email == '') {
      $('.feedback-messages').text('Missing Information'); 
      // alert('Missing Information');
    } else {
      createNewAccount(username, password, firstName, lastName, email);
    }
  });
}

function handleLogInUser() {
  $('.login-form').submit(function(e) {
    var username = $('#login-user-name').val();
    var password = $('#password2').val();
    e.preventDefault();
    if (username === '' || password === '') {
      $('.feedback-messages').text('Missing Information'); 
    } else {
      attemptLogInUser(username, password);
    }
  });
}

function handleLogOffUser() {
  $('.logoff-link').click(function(e) {
    e.preventDefault();
    attemptLogOffUser();
  });
}

function attemptLogOffUser() {
  localStorage.clear();
  window.location.reload(true); 
}

function attemptLogInUser(username, password) {
  $.ajax({
    method: 'POST',
    url: '/api/auth/login',
    data: JSON.stringify({username, password}),
    success: function(resData) {
      localStorage.setItem('token', resData.authToken);
      var JWT = jwt_decode(resData.authToken);
      userID = JWT.user._id;
      localStorage.setItem('userID', userID);
      window.location.reload(true);
      $.ajax({
        method: 'GET',
        url: `/api/account/${userID}`,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        success: function(data) {
        }
      });
    },
    error: function() {
      $('.feedback-messages').text('Invalid Login Information'); 
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function handleEditAccount(username, firstName, lastName, email) {
  $('body').on('click', '.updateaccountoverlaybutton',function(e) {
    var username = $('#newUserName').val();
    var firstName = $('#newFirstName').val();
    var lastName = $('#newLastName').val();
    var email =$('#newEmail').val();
    e.preventDefault();
    if (username == '' || firstName == '' || lastName == '' || email == '') {
      $('.feedback-messages').text('Missing Information'); 
    } else {
      editAccount(username, firstName, lastName, email);
    }
  });
}

function editAccount(username, firstName, lastName, email) {
  userID =  localStorage.getItem('userID');
  $.ajax({
    method: 'PUT',
    url: `/api/account/${userID}`,
    data: JSON.stringify({username, firstName, lastName, email}),
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: function(data) {
      $('.success-messages').text('Account Successfully Updated!');
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function getAndDisplayCurrentAccountInfo() {
  userID =  localStorage.getItem('userID');
  var CURRENTACCOUNT_URL = `api/account/${userID}`;
  $.ajax({
    method: 'GET',
    url: CURRENTACCOUNT_URL,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: function(data) {
      $('.updateAccount').append(
        `<button class ="close-form" data-a11y-dialog-hide aria-label="Close this dialog window" type="submit" onclick="updateAccountOff()"><i class="fas fa-times"></i></button>
            <form class="updateAccountForm">
              <ul class="flex-outer">
                <p class="form-title">Edit Account Information</p>
                <li>
                  <label for="user-name">Username</label>
                  <input type="text" id="newUserName" value= "${data.username}">
                </li>
                <li>
                  <label for="first-name">First Name</label>
                  <input type="text" id="newFirstName" value= "${data.firstName}">
                </li>
                <li>
                  <label for="last-name">Last Name</label>
                  <input type="text" id="newLastName" value= "${data.lastName}">
                </li>
                <li>
                  <label for="account-email">email</label>
                  <input type="text" class="email" id="newEmail" value= "${data.email}">
                </li>
                <li>
                  <button class="updateaccountoverlaybutton">Update Account</button>
                </li>
              </ul>
              <p class="delete-account-text">Click here to <a class="delete-account-link">delete account</a>.</p>
              <p class="feedback-messages"></p>
            </form>`);
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function handleDeleteAccount() {
  $('body').on('click', '.delete-account-link', function(e){
    e.preventDefault();
    deleteAccount();
  });
}

function deleteAccount() {
  $.ajax({
    method: 'DELETE',
    url: `/api/account/${userID}`,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: attemptLogOffUser,
    dataType: 'json',
    contentType: 'application/json'
  });
}

///////////// Drawer and Asset Functions ///////////////////////////

function editAsset() {
  document.getElementById('assetDropdown').classList.toggle('show');
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn-asset')) {

    var dropdowns = document.getElementsByClassName('dropdown-asset');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

function openDrawer(evt, drawerTitle) {
  var drawerID = drawerTitle.replace(/\s+/g, '-').toLowerCase();
  var i, currentDrawer, tablinks;
  var uploadContainer = document.getElementsByClassName('uploadContainer');
  for (i=0; i < uploadContainer.length; i++ ) {
    if (uploadContainer[i].style.display === 'block') {
      uploadContainer[i].style.display = 'none';
    }
  }

  currentDrawer = document.getElementById(drawerID);
  currentDrawer.style.display = 'block';

  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(`${drawerID}`).style.display = 'block';
  evt.currentTarget.className += ' active';
}

var drawerTemplate = function(drawerTitle) {
  var drawerID = drawerTitle.replace(/\s+/g, '-').toLowerCase();
  $('.asset-dropbtn').append(
    `<button class="tablinks dropbtn-asset" onclick="editAsset(); openDrawer(event, '${drawerTitle}'), headerOff(), photosOff(), drawerDisplayOn(), gsearchOff()"> ${drawerTitle}</button>`
  );

  $('#Drawer1').append(
    `<div id="${drawerID}" class="uploadContainer">You are currently viewing the <span class="drawer-title-display">${drawerTitle}</span> drawer.</div>`
  );

  $('.drawer-title').append(
    `<option value=${drawerTitle}>${drawerTitle}</option>`
  );
};

var uploadTemplate = function(drawerTitle, title, notes, fileLocation) {
  var drawerID = drawerTitle.replace(/\s+/g, '-').toLowerCase();
  $('.asset-section').append(
    `<section role="region">  
        <div id="${drawerID}" class='col-4'>
          <div class='asset'>
          <img class='asset-image' src="${fileLocation}" alt="${title}">
          <div>
          <p class="asset-content"><strong>${title}</strong></p>
          <p class="asset-content">${notes}</p>
          <p class="icon"><i class="fas fa-pencil-alt"></i>Edit</p>
          <p class="icon"><i class="fas fa-trash-alt"></i>Delete</p>
        </div>
    </section>`
  );
};

function getAndDisplayDrawer() {
  userID =  localStorage.getItem('userID');
  var ASSETS_URL = `api/account/${userID}?select=asset`;
  $.ajax({
    method: 'GET',
    url: ASSETS_URL,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: function(data) {
      function uniqueDrawerTitles(input) {
        var output = [];
        for(var i=0; i < input.asset.length; i++) {
          if(output.indexOf(input.asset[i].drawerTitle) === -1)
            output.push(input.asset[i].drawerTitle);
        }
        return output;
      }
      data = uniqueDrawerTitles(data);
      var drawerElement = data.map(function(item) {
        var element = $(drawerTemplate(item));
        element.attr('id', item);
        return element;
      }); 
      getAndDisplayUploads();
    }
  });
}

function handleDrawerAdd() {
  $('.drawer-age-form').submit(function(e) {
    var newDrawerTitle = $('#new-drawer-title').val();
    e.preventDefault();
    //window.location.reload(true);
    if (newDrawerTitle === '') {
      alert('Missing Information');
    } else { drawerTemplate(newDrawerTitle);
    }
  });
}

function getAndDisplayUploads() {
  userID =  localStorage.getItem('userID');
  var ASSETS_URL = `api/account/${userID}?select=asset`;
  $.ajax({
    method: 'GET',
    url: ASSETS_URL,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: function(data) {
      drawerUploads = data.asset;
      drawerUploads.forEach(item => {
        const drawerID = item.drawerTitle.replace(/\s+/g, '-').toLowerCase();
        $(`#${drawerID}`).append(
          `<section role="region"> 
            <div class='col-4'>
              <div class='asset'>
              <img class='asset-image' src="${item.fileLocation}" alt="${item.title}">
              <div>
              <p class="asset-content"><strong>${item.title}</strong></p>
              <p class="asset-content">${item.notes}</p>
              <p class="icon"><i class="fas fa-pencil-alt"></i>Edit</p>
              <p class="icon"><i class="fas fa-trash-alt"></i>Delete</p>
            </div>
          </section>`
        );
      });

    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function handleImageConnect() {
  $('.connect-image-form').submit(function(e) {
    var title = $('#title').val(); 
    var notes = $('#notes').val();
    var dateUploaded = $('#date-uploaded').val();
    var fileLocation = $('#image-url').val();
    var drawerTitle = $('#drawer-title').val();
    e.preventDefault();
    window.location.reload(true);
    if (title === '' || notes === '' || fileLocation === '' || drawerTitle === '' || dateUploaded === '' ) {
      alert('Missing Information');
    } else { 
      connectImage(title, notes, dateUploaded, fileLocation, drawerTitle);
    }
  });
}

function connectImage(title, notes, dateUploaded, fileLocation, drawerTitle) {
  userID =  localStorage.getItem('userID');
  var ASSETS_URL = `api/account/${userID}?select=asset`;
  $.ajax({
    method: 'POST',
    url: `/api/account/${userID}/uploads`,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    data: JSON.stringify({title, notes, dateUploaded, fileLocation, drawerTitle}),
    success : function(data) {
      // alert('You have succesfully connected the image!')
      res.redirect(assets.html);
      getAndDisplayUploads();
    },
    dataType: 'json',
    contentType: 'application/json'
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

function updateNavUser(userID) {
  $('.topnav').addClass('hideNav');
  if (userID) {
    $('.topnav').removeClass('hideNav');
    $('.account-section').addClass('hideNav');
  }
}

$(function() {
  if (getUserID()) {                //undefined implies not logged in, refactor later
    getAndDisplayChildProfile();
    getAndDisplayUploads();
    getAndDisplayDrawer();
    handleLogOffUser();
    getAndDisplayCurrentAccountInfo();
  }
  getAndDisplayCurrentAccountInfo();
  handleDeleteAccount();
  getAndDisplayDrawer();
  getAndDisplayChildProfile();
  updateNavUser(getUserID());  //navbar handles logged in state
  handleLogInUser();
  handleLogOffUser();
  getAndDisplayCurrentChildInfo();
  handleChildProfileAdd();
  handleChildProfileDelete();
  handleChildProfileUpdate();
  handleImageConnect();
  handleAccountAdd();
  handleEditAccount();
});
