function distancaPoints([x1, y1, x2, y2]){
    let vectOne = Math.pow((Number(x2) - Number(x1)), 2);
    let vectTwo = Math.pow((Number(y2) - Number(y1)), 2);

    let result = Math.sqrt(vectOne + vectTwo);

    console.log(result);
}

distancaPoints(['2', '4', '5', '0']);