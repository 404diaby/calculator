
/**
 * Calculator object that handles basic arithmetic operations.
 */
const calculator = {
    
    currentNumber: '',
    previousNumber: '',
      /**
   * Current operation being performed.
   * @type {string|null}
   */
    operation: null,
     /**
   * Result of the calculation.
   * @type {number|null}
   */
    result: null,
    /**
   * Display element where the calculator output is shown.
   * @type {HTMLInputElement}
   */
    display: document.getElementById('display'),

     /**
   * Clear the display and reset the calculator state.
   */
    clear: function clearDisplay() {
        this.display.value = '';
        this.currentNumber = '';
        this.previousNumber = '';
        this.operation = null;
        this.result = null;
    },

      /**
   * Calculate the result based on the current operation.
   */
    calculate: function calculateResult() {
        if (this.currentNumber === '' || this.previousNumber === '' || this.operation === null) return;
    
        // let result;
        const num1 = parseFloat(this.previousNumber);
        const num2 = parseFloat(this.currentNumber);
    
        switch (this.operation) {
            case '+':
                this.result = num1 + num2;
                break;
            case '-':
                this.result = num1 - num2;
                break;
            case '*':
                this.result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    this.display.value = this.error(0);
                    return;
                }
                this.result = num1 / num2;
                break;
            default:
                this.display.value = this.error(2);
                return;
        }
    
        this.display.value = parseFloat(this.result.toFixed(10)).toString();
        this.currentNumber = parseFloat(this.result.toFixed(10)).toString();
        this.previousNumber = '';
        this.operation = null;
    },

     /**
   * Set the operation to be performed.
   * @param {string} op - The operation to be performed (+, -, *, /)
   */
    setOperation : function setOperation(op) {

        if (this.currentNumber === '') {
            this.operation = op; // Permet de changer l'opération en cours
            return;
        }
    
        if (this.previousNumber !== '' && this.operation !== null) {
            this.calculate();
        }
        this.operation = op;
        this.previousNumber = this.currentNumber;
        this.currentNumber = '';
    },

    /**
   * Append a number to the current number being entered.
   * @param {string} num - The number to be appended (0-9, .)
   */
    appendNumber: function appendNumber(num) {
        if (num === '.' && this.currentNumber.includes('.')) return;
    
        if (num === '.' && this.currentNumber === '') {
            this.currentNumber = '0.';
        } else if (num !== '.' && this.currentNumber === '0') {
            this.currentNumber = num;
        } else {
            this.currentNumber += num;
        }
        this.display.value = this.currentNumber;
    },

    /**
   * Get an error message based on the error code.
   * @param {number} num - The error code (0: division by zero, 1: invalid operation, 2: calculation error)
   * @returns {string} The error message
   */
    error: function getError(num){
        const err = 'Erreur : ';
        switch(num){
            case 0:
                return err+'Division par zéro';
            case 1:
                return err+'Opération non valide';  
            default:
                return err+'Erreur de calcule';
                        
        }
        
    }
}






document.querySelectorAll('.number').forEach(
    btn => btn.addEventListener('click', () => {
        const num = btn.textContent;
        calculator.appendNumber(num);
        })
);




document.querySelectorAll('.operator').forEach(
    btn => btn.addEventListener('click', () => {
        const op = btn.textContent;
        calculator.setOperation(op);
        })
);




document.querySelector('.clear').addEventListener('click', () => {
        
    calculator.clear();
    })

document.querySelector('.equal').addEventListener('click', () => {
        
        calculator.calculate();
        });

        