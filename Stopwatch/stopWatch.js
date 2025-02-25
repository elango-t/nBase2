const gifImage = document.querySelector("#gifImage");
const startStop = document.querySelector("#startStop");
const reset = document.querySelector("#reset");
const display = document.querySelector("#display");
const container=document.querySelector("#container");

let time = 0;
let interval;

startStop.addEventListener("click", () => {
    if (startStop.textContent === "Start") {
        startStop.textContent = "Stop";
        interval = setInterval(() => {
            time++;
            display.textContent = time;
        }, 1000);
        gifImage.src="clip-hourglass-animated-gif-0.gif"
        container.style.backgroundColor = "green";
        
    } else {
        startStop.textContent = "Start";
        clearInterval(interval);
        gifImage.src = "image.png";
        container.style.backgroundColor = "red";
    }
});

reset.addEventListener("click", () => {
    clearInterval(interval);
    time = 0;
    display.textContent = time;
    startStop.textContent = "Start";
    container.style.backgroundColor = "black";
});
