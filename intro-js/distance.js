function calcDistance(data) {
    let V1 = data[0] * 1000 / 3600; 
    let V2 = data[1] * 1000 / 3600; 
    let time = data[2]; 

    let distanceObject1 = V1 * time;
    let distanceObject2 = V2 * time;

    let distance = Math.abs(distanceObject1 - distanceObject2);

    console.log(distance.toFixed(2)); 
}
calcDistance([15, 20, 3600]);

