const quoteapiurl="https://api.quotable.io/random?minLength=80&maxLength=100";
const quotesec=document.getElementById("quote");
const userinput=document.getElementById("q_input");
let quote="";
let time=60;
let timer="";
let mistakes=0;
//random quote display
const renderNewQuote=async()=>{
    let response =await fetch(quoteapiurl);
    let data=await response.json();
    quote=data.content;
    console.log(data);
    let arr=quote.split("").map((value)=>{
        return "<span class='quote-chars'>"+value+"</span>";
    });
    quotesec.innerHTML += arr.join("");
    console.log(arr);
}
/*window.onload=()=>{
    userinput.value="";
    document.getElementById("start").style.display="block";
    document.getElementById("stop").style.display="none";
    userinput.disabled=true;
    renderNewQuote();
}*/

//compare input
userinput.addEventListener("input",()=>{
    let quotechar=document.querySelectorAll(".quote-chars");
    //create array
    quotechar=Array.from(quotechar);
    //array of usr input char
    let userinputchar=userinput.value.split("");
    //loop through each char in quote
    quotechar.forEach((char,index)=>{
        if(char.innerText == userinputchar[index]){
            char.classList.add("success")
        }
        else if(userinputchar[index] == null){
            if(char.classList.contains("success")){
                char.classList.remove('success');
            }else{
                char.classList.remove("fail");
            }
        }else{
            if(!char.classList.contains("fail")){
                mistakes +=1;
                char.classList.add("fail");
            }
            document.getElementById("mistake").innerText=mistakes;
        }
        let check=quotechar.every((element)=>{
            return element.classList.contains("success")
        });
        if(check){
            displayResult();
        }
    })
}

)
//update timer
function updatetimer() {
    

if(time == 0){
    displayResult();
}else{
    document.getElementById("time").innerText=time
}}
//set timer
const timeReduce=()=>{
    time=60;
    timer=setInterval(updatetimer,1000)
}
//end test
const displayResult=()=>{
    document.querySelector(".output").style.display="block";
    clearInterval(timer);
    document.getElementById("stop").style.display="none";
    userinput.disabled=true;
    let timetaken=1;
    if(time!=0){
        timetaken=(60-time)/100;
    }
    document.getElementById("wpm").innerText=(userinput.value.length /5/ timetaken).toFixed(2);
    document.getElementById("accuracy").innerText=Math.round(
        ((userinput.value.length-mistakes)/userinput.value.length)*100)+"%"
}

//start test
const starttest = ()=>{
    mistakes=0;
    timer="";
    userinput.disabled=false;
    timeReduce();
    document.getElementById("start").style.display="none";
    document.getElementById("stop").style.display="block"
}
window.onload=()=>{
    userinput.value="";
    document.getElementById("start").style.display="block";
    document.getElementById("stop").style.display="none";
    userinput.disabled=true;
    renderNewQuote();
}