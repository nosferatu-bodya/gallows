
import words from './words.js'

let word = getRandomWord()
let curWord = Array(word.length).fill('_')

updateWord()

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