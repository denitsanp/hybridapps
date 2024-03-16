function testAction() {
    document.querySelector('ons-button').setAttribute('modifier', 'large');
    // let btn = document.querySelector('ons-button');
    // let modifier = btn.getAttribute('modifier');

    // if (modifier === 'quiet') {
    //     btn.setAttribute('modifier', 'large');
    // } else {
    //     btn.setAttribute('modifier', 'quiet');
    // }
}

document.addEventListener('deviceready', function () {
    displayDeviceVersion();
    window.addEventListener("batteryStatus", onBatteryStatus, false);
}, false);

function onBatteryStatus(status) {
    let batteryElement = document.getElementById('batteryStatus');
    ons.notification.alert("Включено зарядно: " + (status.isPlugged ? "Да" : "Не"));

    // if (batteryElement) {
    //     batteryElement.textContent = status.level + "%, Включено зарядно: " + (status.isPlugged ? "Да" : "Не");
    // }

    // if (status.level < 30 && !status.isPlugged) { 
    //     window.plugins.toast.showWithOptions({
    //         message: "Low battery! Only " + status.level + "% left.",
    //         duration: "2000", 
    //     });
    // }

    let batterySlider = document.getElementById('batterySlider');
    if (batterySlider) {
        batterySlider.value = status.level;
    }
}

function displayDeviceVersion() {
    let deviceElement = document.getElementById('deviceVersion');
    if (deviceElement) {
        deviceElement.textContent = "VERSION " + device.version + ". PLATFORM " + device.platform;
    }
}

