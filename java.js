// The purpose of this file is to add the functionality of a calculator
// Each button will need to be interactive ( event listener )
// The respective values need to appear on the display once clicked
// Once the values are provided, the calculator needs 
// to be able to run a series of mathematical equations 

class Calculator { // This class stores the values and decides what happens whe buttons are pressed
    constructor(previousOperandTextElement, currentOperandTextElement) { // Stores references to the HTML elements
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear() // Initialises the calculator for use
}

clear() { // Resets everything ( blank canvas )
 this.currentOperand = ''
 this.previousOperand = ''
 this.operation = undefined
}

delete() { // removes the last character input
 this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

appendNumber(number) {
    if ( number === '.' && this.currentOperand.includes('.')) return // prevents multiple decimals
 this.currentOperand = this.currentOperand.toString() + number.toString() // Constructs the number as a string 
}

chooseOperation(operation) {
    if(this.currentOperand === '') return // Prevents operations without input
    if(this.previousOperand !== '') { // This enables chaining calculations
        this.compute()
    }

 this.operation = operation
 this.previousOperand = this.currentOperand
 this.currentOperand = ''

}

compute() {
    let computation 
    const prev = parseFloat(this.previousOperand) //Converts the input strings to numbers 
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return // prevents invalid calculations 
    switch (this.operation) { // Chooses the correct computation based on the inputted operation
        case '+':
            computation = prev + current
            break
        case '-':
                computation = prev - current
                break
        case '÷':
            computation = prev / current
            break
        case '*':
            computation = prev * current
            break
        default: // If none of the above operations are chosen, it stops the computation
            return
    }
    this.currentOperand = computation // The result gets displayed
    this.operation = undefined // Clears the operations
    this.previousOperand = '' // Wipes the previous operand 
}

getDisplayNumber(number) { // Formatting Code
    const stringNumber = number.toString() // Converts number to string 
    const integerDigits = parseFloat(stringNumber.split('.')[0]) // Splits the string at the decimal point integerDigits is the part on the left, which is then converted back into a number
    const decimalDigits = stringNumber.split('.')[1]  // Splits the string at the decimal point decimalDigits is the number on the right
   let integerDisplay // This variable is to store the formatted display numbers
   if (isNaN(integerDigits)) {
    integerDisplay = ''  // Handles invalid numbers
   } else {
    integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0 }) // this formats the number with ','s and prevents decimals in the integer section
   }
   if (decimalDigits != null) { // If there is a decimal, it reconstructs the number together -> 123  .45 becomes 123.45
    return `${integerDisplay}.${decimalDigits}`
   } else {
    return integerDisplay // Otherwise it returns the integer alone
   }
}

updateDisplay() { // Takes the raw data, sends it for formatting, then displays it 
 this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
 if(this.operation != null) { // If an operation has been inputted 
 this.previousOperandTextElement.innerText = // previous operation text becomes the previous operand & the inputted operation
 `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
 } else { // otherwise it remains empty
    this.previousOperandTextElement.innerText = ''
 }
}

}


// DOm Selection
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement) // Creates the Calculator


// Event listeners linking the buttons to the functions
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})