
import words from './words.js'
import letters from './letters.js'

let word = getRandomWord()
let curWord = Array(word.length).fill('_')

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
        } else {
            // make body become red
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