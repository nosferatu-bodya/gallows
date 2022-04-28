
import words from './words.js'
import letters from './letters.js'

let word = getRandomWord()
let curWord = Array(word.length).fill('_')
let mistakes = 0

curWord[0] = word[0]
curWord[curWord.length- 1] = word[word.length - 1]

updateWord()

document.addEventListener('keypress', (e) => handleKeyPress(e))

function handleKeyPress (e) {
    if(letters.includes(e.key)){
        if(word.includes(e.key)){
            for(let i = 0; i < word.length; i++){
                if(word[i] == e.key){
                    curWord[i] = e.key
                }
            }
            updateWord()
            showMessage('you got it!', 'good')
        } else {
            mistakes++
            if(mistakes >= 6) {
                updateBody()
                console.log('death')
            } else {
                updateBody()
            }
            showMessage('wrong!', 'bad')
        }
    }
}

function getRandomWord () {
    return words[Math.floor(Math.random() * words.length)]
}

function updateWord () {
    let strCurWord = ''
    for(let i = 0; i < curWord.length; i++){
        if(i === curWord.length - 1){
            strCurWord += curWord[i]
        } else {
            strCurWord += curWord[i] + ' '
        }
    }
    document.querySelector(".word").textContent = strCurWord
}

function updateBody () {
    let bodyParts = document.querySelectorAll('.body-part')
    for(let i = 0; i < mistakes; i++){
        bodyParts[i].classList.add('body-part-dead')
    }
}

function showMessage(text, mood) {
    let message = document.querySelector('.message')
    message.querySelector('h1').textContent = text
    if(mood === 'good') {
        message.classList.remove('message-bad')
        message.classList.add('message-good')
    } else if (mood === 'bad') {
        message.classList.remove('message-good')
        message.classList.add('message-bad')
    } else {
        throw new Error('incorrect mood. Can accept only -bad or -good')
    }

    setTimeout(hideMessage, 350)
}

function hideMessage() {
    let message = document.querySelector('.message')
    message.querySelector('h1').textContent = ''
    message.classList.remove('message-active')
}