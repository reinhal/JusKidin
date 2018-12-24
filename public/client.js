'use strict';

// var userID = '5b35886a2ba1910d14830eb7';
var userID = '';
var username = '';
var password = '';
var dateUploaded = '';
var fileLocation = '';
var firstName = '';
var dateUploaded = '';
var notes = '';
var title = '';
var fileLocation = '';
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
  console.log('child name', childName);
  var childID = childName.replace(/\s+/g, '-').toLowerCase();
  console.log('child id', childID);
  var i, currentChild, tablinks;
  var gsearchContainer = document.getElementsByClassName('gsearchContainer');
  for (i = 0; i < gsearchContainer.length; i++) {
    if (gsearchContainer[i].style.display = 'block') {
      gsearchContainer[i].style.display = 'none';
    }
  }

  currentChild = document.getElementById(childID);
  console.log('current child',currentChild.style.display);
  currentChild.style.display = 'block';
  console.log('after current child',currentChild.style.display);

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
    `<button class="tablinks dropbtn-prof child-nav" onclick="openChild(event, '${childID}'), gsearchOn(), headerOff(), photosOff()"> ${childName} </br> ${getChildAge(birthDate)} years old</button>`
  );

  $('#GsearchResults').append(
    `<div id="${childID}" class="gsearchContainer"></div>`
  );
};

function addChildProfile(firstName, birthDate) {
  userID =  localStorage.getItem('userID');
  console.log('Adding new child profile: ' + childName + birthDate);
  $.ajax({
    method: 'POST',
    url: `/api/account/${userID}/childProfiles`,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    data: JSON.stringify({firstName, birthDate}),
    success: function(data) {
      console.log('148', 'Child Added');
      getAndDisplayChildProfile();
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function getAndDisplayChildProfile() {
  userID =  localStorage.getItem('userID');
  var CHILDPROFS_URL = `api/account/${userID}?select=childProfs`;
  console.log('Retrieving child profile');
  $.ajax({
    method: 'GET',
    url: CHILDPROFS_URL,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: function(data) {
      console.log('child profiles here!', data);
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
  $('.child-age-form').submit(function(e) {
    var childName = $('#child-first-name').val();
    var birthDate = $('.child-birth-date').val();
    e.preventDefault();
    window.location.reload(true);
    if (childName == '' || birthDate == '') {
      alert('Missing Information!');
    } else {
      addChildProfile(childName, birthDate);
    }
  });
}

////These functions will be fully implemented in future development////////////

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
  console.log('childAge', childAge);
  // url = `https://content.googleapis.com/customsearch/v1?cx=013625144872242568916%3Alitmhr5z8f8&q=${childAge}%20years%20old%20developmental%20milestones&key=AIzaSyDFTLfTan551XimeNSNeKPxZcVgpfY-Z8A`,
  $.getJSON(
    `https://content.googleapis.com/customsearch/v1?cx=013625144872242568916%3Alitmhr5z8f8&q=${childAge}%20years%20old%20developmental%20milestones&key=AIzaSyDFTLfTan551XimeNSNeKPxZcVgpfY-Z8A`,
    callback);
}
// somehow limit to 10 results

function displayGoogleSearch(childName) {
  return function(gsearch) {
    var childID = childName.replace(/\s+/g, '-').toLowerCase();
    console.log('gsearch', gsearch);
    for (let i = 0; i < gsearch.items.length; i ++) {
      let data = gsearch.items[i];
      if (data.pagemap.cse_thumbnail) {
        $(`#${childID}`).append(`<h2>${data.title} </h2>
          <ul>
            <li class="google-image"><img class="google-image" src="${data.pagemap.cse_thumbnail[0].src}"></li>
            <li class="google"><a href="${data.link}">Click Here to Read Full Article</a></li>
            <li class="google">${data.snippet}</li>
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
        $(`#${childID}`).append(`<h2 #${childID}>${data.title} </h2>
          <ul>
            <li class="google"><a href="${data.link}">Click Here to Read Full Aricle</a></li>
            <li class="google">${data.snippet}</li>
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

///////////// Account Functions ///////////////////////

function createNewAccount(username, password, firstName, lastName, email) {
  console.log('Creating new Account: ' + username + password + firstName + lastName + email);
  $.ajax({
    method: 'POST',
    url: ACCOUNT_URL,
    data: JSON.stringify({username, password, firstName, lastName, email}),
    success: function(data) {
      alert('New Account Created');
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
    console.log('Account Info 276', username, password, firstName, lastName, email);
    e.preventDefault();
    if (username === '' || password === ''|| firstName === '' || lastName === '' || email === '') {
      alert('Missing Information');
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
    // } else if (!res.ok) {
    //   $('.login-messages').text('Invalid Login Information'); 
    } else {
      attemptLogInUser(username, password);
    }
  });
}

function handleLogOffUser() {
  $('.logoff-link').click(function(e) {
    e.preventDefault();
    attemptLogOffUser();
    console.log('user logged off');
  });
}

function attemptLogOffUser() {
  localStorage.clear();
  window.location.reload(true); 
}

function attemptLogInUser(username, password) {
  console.log('Logging in user:' + username + password);
  $.ajax({
    method: 'POST',
    url: '/api/auth/login',
    data: JSON.stringify({username, password}),
    success: function(resData) {
      localStorage.setItem('token', resData.authToken);
      var JWT = jwt_decode(resData.authToken);
      console.log('resData 316 is JWT.user._id', JWT.user._id);
      userID = JWT.user._id;
      localStorage.setItem('userID', userID);
      window.location.reload(true);
      $.ajax({
        method: 'GET',
        url: `/api/account/${userID}`,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        success: function(data) {
          console.log('you made it here!', data);
        }
      });
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function handleEditAccount(username, firstName, lastName, email) {
  $('.update-account-form').submit(function(e) {
    var username = $('#new-user-name').val();
    var firstName = $('#updated-first-name').val();
    var lastName = $('#updated-last-name').val();
    var email =$('#updated-email').val();
    console.log('Account Info 372', username, firstName, lastName, email);
    e.preventDefault();
    if (username == '' || firstName == '' || lastName == '' || email == '') {
      alert('Missing Information');
    } else {
      editAccount(username, firstName, lastName, email);
    }
  });
}

function editAccount(username, firstName, lastName, email) {
  console.log('Editing account: ' + username + firstName + lastName + email);
  userID =  localStorage.getItem('userID');
  $.ajax({
    method: 'PUT',
    url: `/api/account/${userID}`,
    data: JSON.stringify({username, firstName, lastName, email}),
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: function(data) {
      alert('Account Successfully Updated');
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

// var currentAccountTemplate = function (username, firstName, lastName, email) {
//    $('.updateAccount').append(`<form class="update-account-form">
//         <ul class="flex-outer">
//             <p class="form-title">Update Account Information</p>
//             <li>
//                 <label for="user-name">Username</label>
//                 <input type="text" id="new-user-name" placeholder="Current username: ${username}">
//             </li>
//             <li>
//                 <label for="first-name">First Name</label>
//                 <input type="text" id="updated-first-name" placeholder="Current first name: ${firstName}">
//             </li>
//             <li>
//                 <label for="last-name">Last Name</label>
//                 <input type="text" id="updated-last-name" placeholder="Current last name: ${lastName}">
//             </li>
//             <li>
//                 <label for="account-email">email</label>
//                 <input type="text" class="email" id="updated-email" placeholder="Current email: ${email}">
//             </li>
//             <li>
//                 <button id="update-accountoverlaybutton" type="submit">Update Account</button>
//             </li>
//         </ul>
//     </form>`)
// }

function getAndDisplayCurrentAccountInfo() {
  userID =  localStorage.getItem('userID');
  var CURRENTACCOUNT_URL = `api/account/${userID}`;
  console.log ('Getting current account information'+ username + firstName + lastName + email);
  $.ajax({
    method: 'GET',
    url: CURRENTACCOUNT_URL,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: function(data) {
      console.log('current account info here', data);
      $('.updateAccount').append(
        `<button class ="close-form" data-a11y-dialog-hide aria-label="Close this dialog window" type="submit" onclick="updateAccountOff()"><i class="fas fa-times"></i></button>
                <form class="update-account-form">
                    <ul class="flex-outer">
                        <p class="form-title">Update Account Information</p>
                        <li>
                            <label for="user-name">Username</label>
                            <input type="text" id="new-user-name" value= "${data.username}">
                        </li>
                        <li>
                            <label for="first-name">First Name</label>
                            <input type="text" id="updated-first-name" value= "${data.firstName}">
                        </li>
                        <li>
                            <label for="last-name">Last Name</label>
                            <input type="text" id="updated-last-name" value= "${data.lastName}">
                        </li>
                        <li>
                            <label for="account-email">email</label>
                            <input type="text" class="email" id="updated-email" value= "${data.email}">
                        </li>
                        <li>
                            <button id="update-accountoverlaybutton" type="submit">Update Account</button>
                        </li>
                    </ul>
            </form>`);
    },
    dataType: 'json',
    contentType: 'application/json'
  });
}

function handleDeleteAccount() {
  console.log('deleting account!');
  $('.delete-form').submit(function(e) {
    e.preventDefault();
    deleteAccount();
  });
}

function deleteAccount() {
  $.ajax({
    method: 'DELETE',
    url: `/api/account/${userID}`,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: alert('Account Deleted'),
    dataType: 'json',
    contentType: 'application/json'
  });
  localStorage.clear();
  window.location.reload(true);

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
  console.log('this drawer title', drawerTitle);
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
  currentDrawer.style.display = 'block';

  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(`${drawerID}`).style.display = 'block';
  evt.currentTarget.className += ' active';
}

var drawerTemplate = function(drawerTitle) {
  console.log('Right Here', drawerTitle);
  var drawerID = drawerTitle.replace(/\s+/g, '-').toLowerCase();
  $('.dropdown-asset').append(
    `<button class="tablinks dropbtn-asset" onclick="editAsset(); openDrawer(event, '${drawerTitle}')"> ${drawerTitle}</button>`
  );

  $('#Drawer1').append(
    `<div id="${drawerID}" class="uploadContainer"></div>`
  );

  $('.drawer-title').append(
    `<option value=${drawerTitle}>${drawerTitle}</option>`
  );
};

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
  );
};

function getAndDisplayDrawer() {
  console.log('retrieving drawer');
  userID =  localStorage.getItem('userID');
  var ASSETS_URL = `api/account/${userID}?select=asset`;
  $.ajax({
    method: 'GET',
    url: ASSETS_URL,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: function(data) {
      console.log('Rendering drawer', data);
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
    console.log ('creating drawer 430: ', newDrawerTitle);
    e.preventDefault();
    //window.location.reload(true);
    if (newDrawerTitle == '') {
      alert('Missing Information');
    } else { drawerTemplate(newDrawerTitle);
    }
  });
}

function getAndDisplayUploads() {
  userID =  localStorage.getItem('userID');
  var ASSETS_URL = `api/account/${userID}?select=asset`;
  console.log('retrieving uploads');
  $.ajax({
    method: 'GET',
    url: ASSETS_URL,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
    success: function(data) {
      console.log('pictures here!', data);
      console.log('Rendering Uploads', data);
      drawerUploads = data.asset;
      console.log('drawer uploads', drawerUploads);
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
    console.log('asset info 486', title, notes, dateUploaded, fileLocation, drawerTitle);
    e.preventDefault();
    window.location.reload(true);
    if (title === '' || notes === '' || fileLocation == '' || drawerTitle == '' || dateUploaded == '' ) {
      alert('Missing Information');
    } else { 
      connectImage(title, notes, dateUploaded, fileLocation, drawerTitle);
    }
  });
}

function connectImage(title, notes, dateUploaded, fileLocation, drawerTitle) {
  console.log('connecting image: ' + title + notes + dateUploaded + fileLocation + drawerTitle);
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
  handleChildProfileAdd();
  handleImageConnect();
  handleAccountAdd();
  handleEditAccount();
});
