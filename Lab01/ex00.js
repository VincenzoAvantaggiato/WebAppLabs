'use strict'

function funct1(str){
    if(str.length<2) return '';
    if(str.length===2) return str+str;
    return str.slice(0,2)+str.slice(str.length-2,str.length);
}

let a='spring'
console.log(funct1(a));

a='it'
console.log(funct1(a));

a='cat'
console.log(funct1(a));

a='a'
console.log(funct1(a));