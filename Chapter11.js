// async function locateScalpel(nest) {
//     let current = nest.name;
//     for (;;) {
//       let next = await anyStorage(nest, current, "scalpel");
//       if (next == current) return current;
//       current = next;
//     }
//   }
  
//   function locateScalpel2(nest) {
//     function loop(lastValue){
//           return anyStorage(nest, "Butcher Shop", "scalpel").then(function(value){
//               if(value == lastValue) return value ; 
//                 else return loop(value);
//           });
//       }
//       return loop(nest.name);
//   }
  
//   locateScalpel(bigOak).then(console.log);
//   // → Butcher's Shop
//   locateScalpel2(bigOak).then(console.log);
//   // → Butcher's Shop

  function Promise_all(promises) {
    return new Promise((resolve, reject) => {
      // Your code here.
      let arr = [];
      //let i  = 0;
      for(let i = 0; i < promises.length; i++){
        promises[i].then(result =>{
            arr[i] = result; 
            if(i == promises.length - 1) resolve(arr);
        }).catch(reject);
      }
      if(promises.length == 0) resolve(arr);
      
    });
  
  }
  
  //Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)]).then(array => {
  console.log("We should not get here");
}).catch(error => {
  if (error != "X") {
    console.log("Unexpected failure:", error);
  }
});