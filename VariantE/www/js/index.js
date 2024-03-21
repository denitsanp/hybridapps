function takePhoto() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 25,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccess(imageData) {
    let image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
    image.style.display = 'block';

}

function onFail(message) {
    alert('Failed to get picture' + message);
}
