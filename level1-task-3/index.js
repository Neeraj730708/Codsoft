document.addEventListener('DOMContentLoaded', function() {
    const screen = document.getElementById('screen');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');

    let currentInput = '';
    let lastValue = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (isOperator(value)) {
                if (currentInput !== '') {
                    if (lastValue !== '') {
                        // Perform the calculation if there's already an operator
                        lastValue = evaluateExpression(lastValue, currentInput, operator);
                    } else {
                        lastValue = currentInput;
                    }
                    operator = value;
                    currentInput = '';
                    screen.innerText = lastValue;
                } else if (lastValue !== '') {
                    operator = value; // Update the operator if there's no current input
                }
            } else {
                currentInput += value;
                screen.innerText = currentInput;
            }
        });
    });

    clearButton.addEventListener('click', () => {
        currentInput = '';
        lastValue = '';
        operator = '';
        screen.innerText = '';
    });

    equalsButton.addEventListener('click', () => {
        try {
            if (currentInput !== '' && lastValue !== '' && operator !== '') {
                const result = evaluateExpression(lastValue, currentInput, operator);
                screen.innerText = result;
                currentInput = result;
                lastValue = '';
                operator = '';
            }
        } catch (e) {
            screen.innerText = 'Error';
            currentInput = '';
            lastValue = '';
            operator = '';
        }
    });

    function isOperator(value) {
        return ['+', '-', '*', '/'].includes(value);
    }

    function evaluateExpression(val1, val2, op) {
        switch (op) {
            case '+':
                return (parseFloat(val1) + parseFloat(val2)).toString();
            case '-':
                return (parseFloat(val1) - parseFloat(val2)).toString();
            case '*':
                return (parseFloat(val1) * parseFloat(val2)).toString();
            case '/':
                return (parseFloat(val1) / parseFloat(val2)).toString();
            default:
                return val2;
        }
    }
});
