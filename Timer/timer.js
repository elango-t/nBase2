const start = document.getElementById('start');
const stop = document.getElementById('stop');
const display = document.getElementById('display');
const input = document.getElementById('time');

let count = 0;
let interval;

document.addEventListener('keydown', (event) => {
    if (!isNaN(event.key)) {
        count = count * 10 + parseInt(event.key, 10);
        input.value = count;
        display.textContent = count;
    } else if (event.key === 'Backspace') {
        count = Math.floor(count / 10); 
        input.value = count;
        display.textContent = count || 0;
    }
});

start.addEventListener('click', () => {
    if (interval) return;

    count = parseInt(input.value, 10);
    if (isNaN(count) || count <= 0) {
        display.textContent = "Enter a valid number!";
        return;
    }

    display.textContent = count;
    interval = setInterval(() => {
        count--;
        display.textContent = count;
        if (count <= 0) {
            clearInterval(interval);
            interval = null;
            display.textContent = "Time's up!";
        }
    }, 1000);
});

stop.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
    display.textContent = input.value;
});
