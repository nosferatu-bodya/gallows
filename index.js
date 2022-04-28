
import words from './words.js'

function getRandomWord () {
    return words[Math.floor(Math.random() * words.length)]
}

function getMaxLenght () {
    let max = words[0].length
    for(let w of words){
        w.length > max ? max = w.length : max = max
    }
    return max
}

console.log(getMaxLenght())

// console.log(getRandomWord())
// console.log(getRandomWord())
// console.log(getRandomWord())