// 1 *****************************
const actorName = 'Al';
const actorSurname = 'Pacino';
const shorter = actorName.length < actorSurname.length ? actorName : actorSurname;
console.group('1');
console.log( shorter );
console.groupEnd();

// 2 *****************************
const myName = 'Rolandas';
const mySurname = 'Zabulis';
const myDOB = 1980;
const currentYear = 2023;
console.group('2');
console.log(
    `Aš esu ${myName} ${mySurname}. Man yra ${ currentYear - myDOB} metai(ų).`
);
console.groupEnd();

// 3 *****************************
const initials = actorName[0] + actorSurname[0];
console.group('3');
console.log(initials.toUpperCase());
console.groupEnd();

// 4 *****************************
const initialsFromLast = actorName.substring( -1, 3 ).toUpperCase() +
    actorSurname.substring( -1, 3 ).toUpperCase();
console.group('4');
console.log( initialsFromLast );
console.groupEnd();

// 5 *****************************
const date = new Date();
const month = date.toLocaleString('lt-LT', { month: 'long' });
console.group('5');
console.log( month.charAt(0).toUpperCase() + month.slice(1) );
console.groupEnd();