const createBtn = document.getElementById("create-btn");
const emptyBtn = document.getElementById("empty-btn");
const grid = document.getElementById("grid");
const difficultySelect = document.getElementById("difficulty-select");
const bombsArray = [];

// # FUNCTIONS

// function to generate a cell
function generateCell() {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("click", function () {
    this.classList.add("clicked");
    console.log(this.innerText);

    if (bombsArray.includes(parseInt(cell.innerText))) {
      cell.classList.add("bomb");
      alert("BOOM!");
    }
  });

  return cell;
}

// function to generate a grid with the number of cells we want
function generateGrid(totalCells) {
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

// function to generate bombs
function generateBombs(min, max, bombs) {
  while (bombsArray.length < bombs) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

    if (!bombsArray.includes(randomNumber)) {
      bombsArray.push(randomNumber);
    }
  }
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
