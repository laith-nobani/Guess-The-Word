const inputs = document.querySelector(".inputs");
let numberOfTry = 6;
let currentTry = 1;
const words = ["ORANGE", "CODING", "LAPTOP", "BUCKET", "ROCKET", "SUMMER"];
let word = words[Math.floor(Math.random() * words.length)].toUpperCase();
let frq = new Array(26).fill(0);

for (let i = 0; i < word.length; ++i) {
    frq[word[i].charCodeAt(0) - 'A'.charCodeAt(0)]++;
}
function GenarateInputs() {
    for (let i = 1; i <= 6; ++i) {
        let div = document.createElement("div");
        let span = document.createElement("span");
        div.className = `input`;
        span.innerText = `Try ${i}`;
        span.style.textAlign = "center";
        span.style.fontWeight = `bold`;
        span.style.fontSize = "20px";
        div.append(span);
        inputs.append(div);

        if (i !== currentTry) {
            div.classList.add(`disable-input`);
        }

        for (let j = 1; j <= 6; j++) {
            let input = document.createElement("input");
            input.type = "text";
            input.setAttribute("maxlength", "1");
            input.id = `input${i}${j}`;
            div.append(input);
        }
    }
    inputs.children[0].children[1].focus();
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach((inp) => {
        inp.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
        });
    });


    inputFields.forEach((inp, index, array) => {
        inp.addEventListener("keydown", function (e) {
            if (e.key === "ArrowRight") {
                if (index < array.length - 1) {
                        array[index + 1].focus();
                }
            } else if (e.key === "ArrowLeft") {
                if (index >=0) {
                        array[index - 1].focus();
                }
            }
        });
    });
    
}

GenarateInputs();
console.log(word);

const buttonCheck = document.querySelector(`.check`);
buttonCheck.addEventListener("click", check);

function check() {
    let correctCount = 0;
    let count = 0;
    let remainingFrq = [...frq];
    for (let i = 1; i <= 6; ++i) {
        const inputField = document.querySelector(`#input${currentTry}${i}`);
        const userLetter = inputField.value.toUpperCase();

        if (userLetter === "") continue;
        if (userLetter === word[i - 1]) {
            inputField.classList.add("yes");
            console.log(currentTry,i);
            if(i!==6)
                inputs.children[currentTry-1].children[i+1].focus();
            correctCount++;
            remainingFrq[userLetter.charCodeAt(0) - 'A'.charCodeAt(0)]--;
            count++;
        }
    }
    
    for (let i = 1; i <= 6; ++i) {
        const inputField = document.querySelector(`#input${currentTry}${i}`);
        const userLetter = inputField.value.toUpperCase();
        if (userLetter === "") continue;
        if (userLetter === word[i - 1]) continue;
        if (word.includes(userLetter) && remainingFrq[userLetter.charCodeAt(0) - 'A'.charCodeAt(0)] > 0) {
            inputField.classList.add("not");
            if(i!==6)
                inputs.children[currentTry-1].children[i+1].focus();
                
                 remainingFrq[userLetter.charCodeAt(0) - 'A'.charCodeAt(0)]--;
        } else {
            inputField.classList.add("no");
            if(i!==6)
                inputs.children[currentTry-1].children[i+1].focus();
        }
        count++;
    }

    if (correctCount === 6) {
        alert("🎉 Congratulations! You guessed the word!");
        const btnCheck=document.querySelector(".check");
        btnCheck.classList.add(`disable-input`);
        return;
    }

    if (count === 6) {
        count = 0;
        correctCount = 0;
        currentTry++;
        if (currentTry > numberOfTry) {
            alert(`Game Over! The correct word was: ${word}`);
            window.onload();
            return;
        }
        alert("Try Again");
        inputs.children[currentTry-1].children[1].focus();
        let inputRows = document.querySelectorAll(".input");
        for (let z = 1; z <= numberOfTry; z++) {
            if (z !== currentTry) {
                inputRows[z - 1].classList.add(`disable-input`);
            } else {
                inputRows[z - 1].classList.remove(`disable-input`);
            }
        }
    }
}

const hintSpan=document.querySelector(`.number-of-hint`);
const hintButton=document.querySelector(".hint");
hintSpan.innerHTML="2";
let numberOfHint=2;
let visitedArray=new Array(6).fill(false);


function Hint() {  
    if (numberOfHint === 0) {
        hintButton.classList.add("disable-input");
        return;
    }

    let index = Math.floor(Math.random() * word.length);  
    while (visitedArray[index]) {  
        index = Math.floor(Math.random() * word.length);  
    }  

    visitedArray[index] = true;  
    let letterHint = word[index];  
    numberOfHint--;  
    hintSpan.innerHTML = numberOfHint;  
    inputs.children[currentTry - 1].children[index + 1].value = letterHint.toUpperCase();
    
}  

hintButton.addEventListener("click", Hint);  