// function tosscoin(){
//     return new Promise((resolve,reject)=>{
//         console.log("flipping the coin");
//         setTimeout(() => {
            
//             const prob=Math.random();
//             if(prob<0.5){
//                 reject("You lost")
//             }else{
//                 resolve("You won")
//             }
//         }, 2000);
//     })
    
// }

// tosscoin().then(response=>console.log(response))
// .catch(response =>console.log(response)
// )

function fetchdata(){
    return new Promise((resolve ,reject )=>{
        fetch("https://jsonplaceholder.typicode.com/postys/13").then(response=>{
            if(!response.ok){
                reject("problem")
                return "pp"
            }else{
             
                return response.json();
            }
        }
    ).then(response=>resolve(response))
    .catch(response=>reject(response))
    })
}

fetchdata().then(response=>console.log(response)
).catch((response=>console.log(response)
))