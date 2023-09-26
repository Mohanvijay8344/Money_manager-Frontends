var data = [1,2,3,4,5,6,7,8,9];
var even = [];
var odd = [];
for(let i=0; i<data.length; i++){
    if(i%2===0){
        odd.push(data[i])
    }else{
        even.push(data[i])
    }
}
