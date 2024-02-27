function biggest ([num1, num2, num3]){
    [num1, num2, num3] - [num1, num2, num3].map(Number);
    console.log(Math.max(num1, num2, num3));
}

biggest(['2', '67', '90']);
biggest(['167', '-22', '44']);
biggest(['33333', '2', '54']);
