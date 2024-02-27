// zad.2

function calcSumandVat(arr){
    let sum = 0;
    for(let price of arr){
        sum += Number(price);
    }
    console.log({sum});

    let vat = sum * 0.2;
    console.log({vat});

    let total = sum + vat;
    console.log({total});
}
calcSumandVat(['1.20', '2.60', '3.50']);