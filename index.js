
import words from './words.js'
import letters from './letters.js'

let word = getRandomWord()
let curWord = Array(word.length).fill('_')
let mistakes = 0
let playing = false

curWord[0] = word[0]
curWord[curWord.length - 1] = word[word.length - 1]

updateWord()

console.log(word)

playing = true

document.addEventListener('keypress', (e) => handleKeyPress(e))

document.querySelector('.restart-btn').addEventListener('click', () => restart())

function handleKeyPress(e) {
    if (playing && letters.includes(e.key)) {
        if (word.includes(e.key)) {
            addToTextField(e.key, 'good')
            for (let i = 0; i < word.length; i++) {
                if (word[i] == e.key) {
                    curWord[i] = e.key
                }
            }
            updateWord()
            if (checkWinner()) {
                playing = false
                showMessage('YOU WON!\nThe word was:\n' + word, 'good')
            }
        } else {
            addToTextField(e.key, 'bad')
            mistakes += 1
            if (mistakes >= 6) {
                playing = false
                updateBody()
                showMessage('YOU LOST :(\nThe word was:\n' + word, 'bad')
            } else {
                updateBody()
            }
        }
    }
}

function checkWinner() {
    if (!curWord.includes('_')) {
        return true
    }
    return false
}

function addToTextField(letter, mood) {
    let textField = document.querySelector('.text-field')
    let letterElem = document.createElement('span')
    letterElem.textContent = letter
    letterElem.classList.add(mood + '-letter')
    textField.appendChild(letterElem)
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function updateWord() {
    let strCurWord = ''
    for (let i = 0; i < curWord.length; i++) {
        if (i === curWord.length - 1) {
            strCurWord += curWord[i]
        } else {
            strCurWord += curWord[i] + ' '
        }
    }
    document.querySelector(".word").textContent = strCurWord
}

function updateBody() {
    let bodyParts = document.querySelectorAll('.body-part')
    for (let i = 0; i < mistakes; i++) {
        bodyParts[i].classList.add('body-part-dead')
    }
}

function clearBody () {
    let bodyParts = document.querySelectorAll('.body-part')
    for (let i = 0; i < 6; i++) {
        bodyParts[i].classList.remove('body-part-dead')
    }
}

function showMessage(text, mood) {
    let message = document.querySelector('.message')
    message.querySelector('h1').textContent = text
    if (mood === 'good') {
        message.classList.remove('message-bad')
        message.classList.add('message-good')
    } else if (mood === 'bad') {
        message.classList.remove('message-good')
        message.classList.add('message-bad')
    } else {
        throw new Error('incorrect mood. Can accept only -bad or -good')
    }
}

function hideMessage() {
    let message = document.querySelector('.message')
    message.querySelector('h1').textContent = ''
    message.classList.remove('message-good')
    message.classList.remove('message-bad')
}

function restart() {
    mistakes = 0
    clearBody()
    word = getRandomWord()
    curWord = Array(word.length).fill('_')
    curWord[0] = word[0]
    curWord[curWord.length - 1] = word[word.length - 1]
    updateWord()
    document.querySelector('.text-field').innerHTML = ''
    playing = true
    hideMessage()
}