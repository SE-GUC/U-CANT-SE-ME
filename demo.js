// function add(x, y) {
//     return x + y;
// }

let code = "function (x, y) {return x + y;}";

var fun = new Function("return " + code)();

console.log(fun(4, 3));


var obj = {
    name: "A",
    age: 15,
    type: "retro"
}

var p = {
    name: "B",
    age: "123",
}

for(let field in obj) {
    console.log(typeof field);
    console.log(typeof p[field]);
    if(p.hasOwnProperty(field))
        console.log(field + " : " + p[field] + ",");
}