let lengthSlider = document.querySelector(".pass-length input");
let options = document.querySelectorAll(".option input");
let copyIcon = document.querySelector(".input-box span");
let passwordInput = document.querySelector(".input-box input" )
let passIndicator = document.querySelector(".pass-indicator");
let generateBtn = document.querySelector(".generate-btn");


const characters = {
    lowercase : "abcdefghijklmnopqrstuvwxz",
    uppercase : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers : "0123456789",
    symbols : "^!$%&|[]{}:;.,*+-#@<>~"
}

const generatePassword = () => { 
    let staticPassword = "";
    let randomPassword = "";
    let excDuplicates = false;
    let passLength = lengthSlider.value;
    options.forEach(option => {
        if(option.checked){
            if(option.id !== "exc-duplicates" && option.id !== "spaces"){
            staticPassword += characters[option.id];
        }else if(option.id === "spaces"){
                staticPassword += ` ${staticPassword} `
        }else{
                excDuplicates = true;
        }
        }
    });
    for (let i=0; i < passLength; i++){
            let randomChar = staticPassword[Math.floor(Math.random()*staticPassword.length)];
            if(excDuplicates){
                !randomPassword.includes(randomChar)|| randomChar == "  " ? randomPassword += randomChar : i--;
            }
                else {
                    randomPassword += randomChar
                }
    }
    passwordInput.value = randomPassword; 
}



function updatePassIndicator (){
    passIndicator.id = lengthSlider.value <= 8 ?"weak": lengthSlider.value <= 16 ? "medium":"strong";
}

const updateSlider = ()=>{
    //passing slider value as counter text
    document.querySelector(".pass-length span").textContent = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();



const copyPassword = () =>{
    navigator.clipboard.writeText (passwordInput.value);
    copyIcon.textContent= "check";
    
}

copyIcon.addEventListener("click" , copyPassword);
lengthSlider.addEventListener("input" , updateSlider);
generateBtn.addEventListener("click", generatePassword);