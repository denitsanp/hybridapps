function stringOfNumbers(lastNum){
    let result = '';
    for (let i = 1; i<= lastNum; i++){
        result += i;
    }
    console.log(result);
}

stringOfNumbers(5);
stringOfNumbers(15);