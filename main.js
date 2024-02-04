const wordEle = document.getElementById("word")
const popup = document.getElementById("popup-container")
const messageEle = document.getElementById("success-message")
const playBtn = document.getElementById("play-btn")
const items = document.querySelectorAll(".item")
const popupbg = document.getElementById("popup")
const wrongLettersEle = document.getElementById("wrong-letters")





const correctLetters = [];
const wrongLetters =[];
const selectedWord = getRandomWords()


playBtn.addEventListener("click", function(){
    location.reload()
})


function getRandomWords () {
    const words=["malavi","nauru","cibuti","brunei","butan","botsvana","curacao","liberya","china","brazil","albania","turkey","germany","france", "norway", "denmark","sweden","swiss","usa"];
    return words[Math.floor(Math.random() * words.length)]
}

//console.log(getRandomWords())

function displayWord () {



    wordEle.innerHTML = `
        ${selectedWord.split('').map((letter)=> `
        <div class="letter">${correctLetters.includes(letter) ? letter : ''}</div>
        `).join('')}

    `

    const w = wordEle.innerText.replace(/\n/g,'');
    if(w===selectedWord){
        popup.style.display="flex";
        messageEle.innerText="Tebrikler Kazandınız :)"
    }
    
}

window.addEventListener("keydown", function(e){
    const letter = e.key;
    if(e.keyCode >=65 || e.keyCode <=90 || e.keyCode == "222"){
        const letter =e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord()
            }else{
                console.log("bu harfi daha önce bildiniz")
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                updateWrongLetters()
            }
        }
    }
})

function updateWrongLetters() {
    wrongLettersEle.innerHTML = `${wrongLetters.length > 0  
        ? "<h3>HATALI HARFLER</h3>" : " "} 
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`

    items.forEach((item,index) => {
        
        const errorCount = wrongLetters.length;
      
        if(index<errorCount  && errorCount<6){
            item.style.display ="block"
        }else{
            item.style.display="none"
        }

        if(errorCount===6){
            popup.style.display="flex";
            messageEle.innerText=` Üzgünüz kaybettiniz :( Doğru cevap: ${selectedWord}`
            playBtn.innerText="Tekrar dene"
            playBtn.style.background="rgba(212, 17, 17, 0.7)"
            popupbg.style.background="rgb(230, 94, 4)"
        }
    })
}

displayWord()
