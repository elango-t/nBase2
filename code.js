function generateIds(strings) {
   const countMap = new Map(); 
    const result = [];
    
    for (let i=0;i<strings.length;i++){
       let str = strings[i];
       str=str.toLowerCase();
       let prefix = str.slice(0, 2);
       let asciiSum = 0;
       for (let j = 0; j < str.length; j++) {
           asciiSum += str.charCodeAt(j)-96;
       }

       countMap.set(prefix,(countMap.get(prefix)||0)+1)
       let occurrence = countMap.get(prefix);
           
       const id=prefix+occurrence+"_"+asciiSum;
       result.push(id)
       
    }
   
    return result;
}

let input = ["kumar", "Kumarw", "hari"];
const ans = generateIds(input);
for (let i = 0; i < ans.length; i++) {
    console.log(ans[i]);
}

