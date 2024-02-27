function triangleArea(arr){
    arr = arr.map(Number);

    let sideA = arr[0];
    let sideB = arr[1];
    let sideC = arr[2];

    let semiperim = (sideA  + sideB + sideC) / 2;

    let area = Math.sqrt(semiperim * (semiperim - sideA) * (semiperim - sideB) * (semiperim - sideC));

    console.log(area);
;}
triangleArea(['3', '4', '5']);