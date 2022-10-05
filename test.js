var today = new Date();
var milisToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)

console.log(milisToday)
console.log(milisToday - 1000)
console.log(new Date(milisToday))


