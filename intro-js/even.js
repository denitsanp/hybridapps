function oddorEven(number) {
    if (number % 1 == 0){
        if(number % 2 == 0){
            console.log("even");
        }else{
            console.log("odd");
        }
    }else{
        console.log("Invalid number");
    }
}

oddorEven(4);
oddorEven(7);
oddorEven(3.33);