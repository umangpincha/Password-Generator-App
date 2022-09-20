const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const input = document.createElement("input");
    const password = resultEl.innerText;
    if (!password) {
        return;
    }
    input.value = password;
    document.body.appendChild(input);
    //1st step  select the text
    input.select();
    //2nd step copy the text
    document.execCommand('copy');
    //remove the element 
    input.remove();
    alert("Password copied ...")
})

generateEl.addEventListener('click', () => {
    const len = lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasLower,hasUpper,hasNumber,hasSymbol,len);
})


function generatePassword(lower, upper, number, symbol, length) {
    let generatePassword = '';
    const countTypes = lower+upper+number+symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    console.log(typesArr);
    // console.log(typesArr);
    if(countTypes == 0){
        return '';
    }

    for(let i=0;i<length;i++){
        typesArr.forEach((types)=>{
            const funcName = Object.keys(types)[0];
            // console.log(typeof Object.keys(types)[0]);
            generatePassword = generatePassword + randomFunc[funcName]();
        });
    }

    let finalPassword = generatePassword.slice(0 , length);
    return finalPassword;
}





function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}