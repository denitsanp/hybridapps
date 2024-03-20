const baseServiceUrl = "https://students-manager.azurewebsites.net/api/students/";
const username = "guest";
const password = "guest";
const base64Auth = btoa(username + ":" + password);

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    loadStudents();
}

function loadStudents() {
    fetch(baseServiceUrl, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Basic ' + base64Auth,
            'Content-Type': 'application/json; charset=utf-8'
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network error: ' + response.status);
        }
        return response.json();
    })
    .then(students => {
        displayStudents(students);
    })
    .catch(error => {
        alert('There was an error loading the students: ' + error.message);
    });
}


  function displayStudents(students) {
      document.getElementById('results').innerHTML = "";

    students.forEach(student => {
        
        let listitem = document.createElement('ons-list-item');
        let link = document.createElement('a');
        link.href = `#detailsPage`; 
        link.innerHTML = student.fullName;
        listitem.appendChild(link);
        document.getElementById('results').appendChild(listitem);

        link.addEventListener('click', function() {
            document.querySelector('#appNavigator').pushPage('detailsPage.html', {
                data: { student: student }
            });
        });
    });
    document.addEventListener('init', function(event) {
        let page = event.target;
    
        if (page.id == 'detailsPage') {
            let student = page.data.student;
            if (student) {
                setStudentDetails(student);
            }
        }
    });
    
  }

  function setStudentDetails(student) {

    document.getElementById('student-name').innerHTML = student.fullName;
    document.getElementById('student-faculty-number').innerHTML = student.facultyNumber;
    document.getElementById('student-email').innerHTML = student.email;
    document.getElementById('student-username').innerHTML = student.username;
    document.getElementById('student-picture-view').src = 'data:image/png;base64,' + student.pictureBase64;

      
  }

  function openPicturePage() {
    document.querySelector('#appNavigator').pushPage('picturePage.html');
    window.location.hash = 'picturePage';
  }

  function getPicture() {
    navigator.camera.getPicture(successCameraCallback, failedCameraCallback, {
        quality: 25,
        destinationType: Camera.DestinationType.DATA_URL
    })
    
  }

  function successCameraCallback(imageData) {
    let image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
    image.style.display = "block";
}

  function failedCameraCallback() {
    alert('Failed to get picture');
  }

 function sendPictureRequest() {
    document.getElementById('addPicture').disabled = true;
    let base64Image = document.getElementById('myImage').src.split(',')[1]; 
    let facultyNumber = document.getElementById('faculty-number').value;
    let password = document.getElementById('password').value;

    let data = {
        base64EncodedImage: base64Image, 
        facultyNumber: facultyNumber,
        password: password
    };

    fetch(baseServiceUrl + "picture", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64Auth 
        },
        body: JSON.stringify(data) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        if (response.headers.get("content-type")?.includes("application/json")) {
            return response.json();
        } else {
            return response.text();
        }
    })
    .then(responseData => {
        if (typeof responseData === 'object') {
            console.log("Picture uploaded successfully", responseData);
        } else {
            console.log("Response received", responseData);
        }
    })
    .catch(error => {
        console.error("Error sending picture:", error);
        alert('Failed to upload the picture: ' + error.message);
    });
}





