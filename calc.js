const display = document.getElementById('display');
const historyList = document.getElementById('historyList');

function appendValue(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = '';
}
function calculateSquareRoot() {
  try {
    const currentValue = parseFloat(display.value); 
    if (!isNaN(currentValue) && currentValue >= 0) {
      const result = Math.sqrt(currentValue);
      addToHistory(`√(${currentValue}) = ${result}`); 
      display.value = result; 
    } else if (currentValue < 0) {
      display.value = 'Error: Neg Sqrt'; 
    } else {
      display.value = 'Error';
    }
  } catch (e) {
    display.value = 'Error';
  }
}

function calculate() {
  try {
    let expression = display.value;
    expression = expression.replace(/÷/g, '/');
    expression = expression.replace(/×/g, '*');
    const result = eval(expression);
    display.value = result;
    addToHistory(expression + ' = ' + result);
  } catch (e) {
    display.value = 'Error';
  }
}

function copyResult() {
  navigator.clipboard.writeText(display.value)
    .then(() => alert("Copied to clipboard!"))
    .catch(() => alert("Copy failed."));
}

function addToHistory(entry) {
  const div = document.createElement('div');
  div.className = 'history-entry';
  div.textContent = entry;
  historyList.prepend(div);
}

function clearHistory() {
  historyList.innerHTML = '';
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

document.addEventListener('keydown', function (e) {
  const key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%', '(', ')'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});