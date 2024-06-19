// DOM Elements
const cellDisplay = document.getElementById("cellDisplay");
const slider = document.getElementById("range");
const colorPicker = document.getElementById("color");
const canvas = document.querySelector(".canvas");
const clearButton = document.getElementById("clear");
const eraseButton = document.getElementById("eraser");
const colorButton = document.getElementById("color-mode");
const rainbowButton = document.getElementById("rainbow-mode");
const buttonArray = Array.from(document.getElementsByTagName("button"));

// CONSTANTS
const DEFAULT_NUMBER_OF_COLUMN_AND_ROW_CELLS = 4;

// variables
let color = colorPicker.value;
let erase = false;
let rainbowMode = false;
let mouseDown = false;

// Event listeners
canvas.addEventListener("mouseover", handleCanvasEvent);
canvas.addEventListener("mousedown", handleCanvasEvent);
colorPicker.addEventListener("input", (event) => {
  color = event.target.value;
});
colorButton.addEventListener("click", () => setMode("color"));
rainbowButton.addEventListener("click", () => setMode("rainbowMode"));
eraseButton.addEventListener("click", () => setMode("erase"));
clearButton.addEventListener("click", clearCanvas);
document.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("canvas-item")) {
    mouseDown = true;
  }
});
document.addEventListener("mouseup", () => (mouseDown = false));
slider.addEventListener("input", () => {
  clearGrid();
  updateNumberOfCells(slider.value);
});
buttonArray.forEach((button, index) => {
  if (!(index == buttonArray.length - 1)) {
    button.addEventListener("click", (event) => {
      document
        .getElementsByClassName("selected")[0]
        .classList.remove("selected");
      event.target.classList.add("selected");
    });
  }
});

// initialization
function initialize() {
  slider.value = DEFAULT_NUMBER_OF_COLUMN_AND_ROW_CELLS;
  updateNumberOfCells(DEFAULT_NUMBER_OF_COLUMN_AND_ROW_CELLS);
}

// Event handlers
function handleCanvasEvent(event) {
  if (event.type === "mouseover" && !mouseDown) return;
  if (event.target.classList.contains("canvas-item")) {
    draw(event);
  }
}

// functions
function clearCanvas() {
  const canvasItemArray = Array.from(
    document.getElementsByClassName("canvas-item")
  );
  canvasItemArray.forEach((canvasItem) => {
    canvasItem.style.background = "white";
  });
}

function draw(event) {
  if (erase) {
    color = "white";
    event.target.style.background = color;
  } else if (rainbowMode) {
    color = randomColor();
    event.target.style.background = color;
  } else {
    event.target.style.background = color;
  }
}

function setMode(mode) {
  erase = mode === "erase";
  rainbowMode = mode === "rainbowMode";
  if (mode === "color") {
    color = colorPicker.value;
  }
}

function clearGrid() {
  canvas.innerHTML = "";
}

function updateNumberOfCells(sliderValue) {
  canvas.style.cssText = `grid-template:repeat(${sliderValue},1fr)/repeat(${sliderValue},1fr);`;
  cellDisplay.textContent = `${sliderValue}x${sliderValue}`;
  const numberOfCells = sliderValue * sliderValue;
  for (let i = 1; i <= numberOfCells; i++) {
    const canvasItem = document.createElement("div");
    canvasItem.classList.add("canvas-item");
    canvas.appendChild(canvasItem);
  }
}

function randomColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR},${randomG},${randomB})`;
}

initialize();
