const createBtn = document.getElementById("create-btn");
const emptyBtn = document.getElementById("empty-btn");
const grid = document.getElementById("grid");
const difficultySelect = document.getElementById("difficulty-select");
const bombsArray = [];
const clickedCells = [];
let isGameOver;

// # FUNCTIONS

// generate a cell
function generateCell() {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("click", function () {
    if (!isGameOver) {
      if (bombsArray.includes(parseInt(cell.innerText))) {
        cell.classList.add("bomb");
        alert("BOOM!");
        gameOver();
      } else {
        cell.classList.add("clicked");
        console.log(cell.innerText);
        clickedCells.push(parseInt(cell.innerText));
        console.log(clickedCells.length);
      }
    }

    if (clickedCells.length == 84) {
      gameOver();
    }
  });

  return cell;
}

// generate a grid with the number of cells we want
function generateGrid(totalCells) {
  clickedCells.splice(0, clickedCells.length);
  bombsArray.splice(0, bombsArray.length);
  generateBombs(1, 100, 16);
  console.log(bombsArray);

  for (let i = 1; i <= totalCells; i++) {
    const generatedCell = generateCell();
    generatedCell.innerText = i;

    if (difficultySelect.value == "1") {
      generatedCell.style = "width: calc(100% / 10)";
    } else if (difficultySelect.value == "2") {
      generatedCell.style = "width: calc(100% / 9)";
    } else if (difficultySelect.value == "3") {
      generatedCell.style = "width: calc(100% / 7)";
    }

    grid.append(generatedCell);
  }
}

// generate bombs (range of random nums, number of bombs)
function generateBombs(min, max, bombs) {
  while (bombsArray.length < bombs) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

    if (!bombsArray.includes(randomNumber)) {
      bombsArray.push(randomNumber);
    }
  }
}

// game over
function gameOver() {
  isGameOver = true;
  alert("Cells clicked: " + clickedCells.length);
  alert("Game Over - Create a new grid");
}

// # BUTTONS

// button to generate grid
createBtn.addEventListener("click", function () {
  grid.innerHTML = "";

  if (difficultySelect.value == "1") {
    generateGrid(100);
  } else if (difficultySelect.value == "2") {
    generateGrid(81);
  } else if (difficultySelect.value == "3") {
    generateGrid(49);
  }
});

// button to empty grid
emptyBtn.addEventListener("click", function () {
  grid.innerHTML = "";
});
