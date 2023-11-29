function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 6 *****************************
const inputString = 'Once upon a time in hollywood';
const replaced = inputString.replaceAll('o', '*').replaceAll('O', '*')
console.group('6');
console.log( replaced );
console.groupEnd();

// 7 *****************************
const var1 = rand(0, 2);
const var2 = rand(0, 2);
const var3 = rand(0, 2);

const count0 = +( var1 === 0 ) + +(var2 === 0) + +(var3 === 0);
const count1 = +( var1 === 1 ) + +(var2 === 1) + +(var3 === 1);
const count2 = +( var1 === 2 ) + +(var2 === 2) + +(var3 === 2);

console.group('7');
console.log(`Random numbers: ${var1}, ${var2}, ${var3}`);
console.log(`Number of 0: ${count0}`);
console.log(`Number of 1: ${count1}`);
console.log(`Number of 2: ${count2}`);
console.groupEnd();

// 8 *****************************
const var4 = rand(0, 4);
const var5 = rand(0, 4);
const greaterVar = Math.max( var4, var5 );
const smallerVar = Math.min( var4, var5 );
const divided = greaterVar / smallerVar;

console.group('8');
console.log(`Random vars: ${var4}, ${var5}`);
console.log(greaterVar);
console.log(divided);
console.log(divided.toFixed(2));
console.groupEnd();

// 9 *****************************
const var6 = rand(0, 25);
const var7 = rand(0, 25);
const var8 = rand(0, 25);
let middleNumber;

if ((var6 <= var7 && var7 <= var8) || (var8 <= var7 && var7 <= var6)) {
    middleNumber = var7;
} else if ((var7 <= var6 && var6 <= var8) || (var8 <= var6 && var6 <= var7)) {
    middleNumber = var6;
} else {
    middleNumber = var8;
}

console.group('9');
console.log(`Random vars: ${var6}, ${var7}, ${var8}`);
console.log(`The middle number is: ${middleNumber}`);
console.groupEnd();

// 10 *****************************
const letter1 = rand(97, 120);
const letter2 = rand(97, 120);
const letter3 = rand(97, 120);

console.group('10');
console.log(`Generated numbers: ${letter1}, ${letter2}, ${letter3}  `);
console.log(`Generated string: ${String.fromCharCode(letter1) + String.fromCharCode(letter2) + String.fromCharCode(letter3) }  `);
console.groupEnd();
