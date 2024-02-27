function calculateConeProps([radius, height]) {
    let volume = (1/3) * Math.PI * radius * radius * height;
    let slantHeight = Math.sqrt(radius * radius + height * height);
    let baseArea = Math.PI * radius * radius;
    let lateralSurfaceArea = Math.PI * radius * slantHeight;
    let surfaceArea = baseArea + lateralSurfaceArea;

    console.log("Volume: " + volume.toFixed(1));
    console.log("Surface: " + surfaceArea.toFixed(1));
}


calculateConeProps([3, 5]);
