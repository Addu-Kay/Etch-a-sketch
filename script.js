const cellDisplay = document.getElementById("cellDisplay");
const slider = document.getElementById("range");
const DEFAULT_NUMBER_OF_COLUMN_AND_ROW_CELLS = 4;
slider.value = DEFAULT_NUMBER_OF_COLUMN_AND_ROW_CELLS;
cellDisplay.textContent = `${slider.value}x${slider.value}`;
const canvas = document.querySelector(".canvas");
updateNumberOfCells(DEFAULT_NUMBER_OF_COLUMN_AND_ROW_CELLS);

slider.addEventListener("input", () => {
  clearGrid();
  updateNumberOfCells(slider.value);
});

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

canvas.addEventListener("mouseover", draw);
canvas.addEventListener("mousedown", draw);

let colorPicker = document.getElementById("color");
let color = colorPicker.value;
let erase = false;
let rainbowMode = false;

function draw(event) {
  console.log(mouseDown);
  if (event.type === "mouseover" && !mouseDown) return;
  if (event.target.classList.contains("canvas-item")) {
    if (erase) {
      event.target.style.background = "white";
    } else if (rainbowMode) {
      color = randomColor();
      event.target.style.background = color;
    } else {
      event.target.style.background = color;
    }
  }
}

function randomColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR},${randomG},${randomB})`;
}

colorPicker.addEventListener("input", (event) => {
  color = event.target.value;
});

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  const canvasItemArray = Array.from(
    document.getElementsByClassName("canvas-item")
  );
  canvasItemArray.forEach((canvasItem) => {
    canvasItem.style.background = "white";
  });
});

const eraseButton = document.getElementById("eraser");
eraseButton.addEventListener("click", () => {
  erase = true;
  rainbowMode = false;
});

const colorButton = document.getElementById("color-mode");
colorButton.addEventListener("click", () => {
  color = colorPicker.value;
  erase = false;
  rainbowMode = false;
});

const rainbowButton = document.getElementById("rainbow-mode");
rainbowButton.addEventListener("click", () => {
  erase = false;
  rainbowMode = true;
});

const buttonArray = Array.from(document.getElementsByTagName("button"));
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

let mouseDown = false;

document.onmousedown = (event) => {
  if (event.target.classList.contains("canvas-item")) {
    mouseDown = true;
  }
};

document.onmouseup = () => {
  mouseDown = false;
};
