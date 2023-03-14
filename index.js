const htmlObjects = {
    text1: document.getElementById('text1'),
    text2: document.getElementById('text2'),
    text3: document.getElementById('text3'),
    resultText: document.getElementById('result')
}
const allowedSymbols = {
    letters: 'abdefghijklmnoqrtuvwyz',
    numbers: '0123456789',
    otherSymbols: '+-_$~'
}

/**
 * Get the random symbol from alphabet
 * @param {string} alphabet 
 * @returns {string}
 */
const getRandomSymbol = alphabet => alphabet[Math.floor(Math.random() * (alphabet.length))]

/**
 * Replace symbols in string and get count of replacing
 * @param {string} stringToReplace - the string in which to replace the symbol
 * @param {string} excludedSymbols - symbols that should not be included in the result
 * @param {string} symbol - symbol to replace
 * @returns {[string, number]}
 */
const replace = (stringToReplace, excludedSymbols, symbol) => {
    let result = ''
    let counter = 0
    for (let i = 0; i < stringToReplace.length; i++) {
        let tempChar = ''
        for (const char of excludedSymbols) {
            if (char === stringToReplace[i]) {
                tempChar = symbol
                counter++
                break
            }
        }
        result += tempChar ? tempChar : stringToReplace[i]
    }
    return [result, counter]
}

/**
 * Get count of symbols from string 'symbols' in string 'string'
 * @param {string} string - string to search for
 * @param {string} symbols - symbols to search
 * @returns {number}
 */
const getSymbolsCount = (string, symbols) => {
    let result = 0
    for (const char of string) {
        if (symbols.includes(char)) {
            result++
        }
    }
    return result
}

// getting string lenth
let stringLength = +prompt('Enter the length of string:')
while (isNaN(stringLength) || stringLength <= 0) {
    stringLength = +prompt('Enter the number greater than 0!!!:')
}

// creating the random string
let createdString = ''
for (let i = 0; i < stringLength; i++) {
    createdString += getRandomSymbol(allowedSymbols.letters + allowedSymbols.numbers + allowedSymbols.otherSymbols)
}
let notReplaced = getSymbolsCount(createdString, allowedSymbols.otherSymbols)
htmlObjects.text1.innerHTML = `First step:<br>${createdString}`

// replacing letters to first user symbol
let firstSymbol = prompt(`Created string: ${createdString} \n\nEnter any symbol:`)
while (firstSymbol.length > 1) {
    firstSymbol = prompt('Only one symbol!!!:')
}
let result = replace(createdString, allowedSymbols.letters, firstSymbol)
createdString = result[0]
let firstCounter = result[1]
htmlObjects.text2.innerHTML = `Second step:<br>${createdString}`

// replacing numbers to second user symbol
let secondSymbol = prompt(`Changed string: ${createdString} \n\nEnter any symbol:`)
while (secondSymbol.length > 1) {
    secondSymbol = prompt('Only one symbol!!!:')
}
result = replace(createdString, allowedSymbols.numbers, secondSymbol)
createdString = result[0]
let secondCounter = result[1]
htmlObjects.text3.innerHTML = `Third step:<br>${createdString}`

// showing total result
htmlObjects.resultText.innerHTML = `Replaced letters: ${firstCounter}, replaced numbers: ${secondCounter}, not replaced symbols: ${notReplaced}`