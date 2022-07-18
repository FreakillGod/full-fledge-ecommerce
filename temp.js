// 4000 0027 3184  stripe 

const profileInitialState = {
  loading: false,
  loading: true,
  error: "",
  isUpdated: false,
};

console.log("", Object.entries(profileInitialState));

function upper(str) {
  return str.toUpperCase();
}
function reverse(str) {
  return str.concat("hi")
}
function addLol(str) {
  return str.concat("696");
}

//Pipe for polyfill
const pipe = (...args) => {
  
  return function(x){
    let result=x;
    for(let func of args){
      result=func(result)
    }
    return result;
  }

};

let result= pipe(upper,reverse,addLol)("rohit")
console.log('result', result)

//map for polyfill

const mapfunc=(array)=>{
  
}