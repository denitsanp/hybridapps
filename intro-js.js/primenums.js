function primeNums(number) {
    if (number < 2){
    console.log("Neither prime nor composite number");
    return;
    }
    for (let i = 2; i * i <= number; i++) {
        if (number % i === 0) {
        console.log("Composite number");
        return;
        }
    } 
    console.log("Prime number");
}
primeNums(1);
primeNums(6);
primeNums(7);
