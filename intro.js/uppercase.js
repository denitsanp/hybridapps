function uppercaseWords(inputString) {
    
    let words = inputString.split(' ');
    
    let uppercaseWords = words.map(word => word.toUpperCase());
    
    return uppercaseWords.join(' ');
}

console.log(uppercaseWords('Hi, how are you?'));
