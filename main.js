let grid;
let cols;
let rows;
const width = window.innerWidth;
const height = window.innerHeight;

let res = 20;

const make2dArray = (cols, rows) => {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
};

const count = (grid, x, y) => {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (x + i === x && y + j === y) continue;
      sum += grid[x + i][y + j];
    }
  }
  return sum;
};

const pixelGenerator = (event, ctx, canvas) => {
  const x = Math.floor(event.pageX / res);
  const y = Math.floor(event.pageY / res);
  let currentCel = grid[x][y];
  if (currentCel === 0) {
    grid[x][y] = 1;
    ctx.fillRect(x * res, y * res, res - 1, res - 1);
  } else if (currentCel === 1) {
    grid[x][y] = 0;
    ctx.clearRect(x * res, y * res, res - 1, res - 1);
  }
};

const computeNextGrid = (ctx) => {
  let next2dArray = make2dArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (i == 0 || i == cols - 1 || j == 0 || j == cols - 1) {
        next2dArray[i][j] = grid[i][j];
        continue;
      }
      let sum = count(grid, i, j);

      if (sum > 3) {
        next2dArray[i][j] = 0;
      } else if (sum === 3) {
        next2dArray[i][j] = 1;
      } else if (sum === 2) {
        next2dArray[i][j] = grid[i][j];
      } else {
        next2dArray[i][j] = 0;
      }
    }
  }

  grid = next2dArray;
};

const draw = (canvas) => {
  // clear the canvas before making calcul
  canvas.clearRect(0, 0, width, height);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] === 1) {
        let x = i * res;
        let y = j * res;
        canvas.fillRect(x - 25, y - 25, res, res);
      }
    }
  }
};

const initCanvas = (width, height) => {
  const body = document.querySelector("body");
  const canvas = document.createElement("canvas");
  canvas.classList.add("canvas");
  const btn = document.createElement("button");
  btn.innerHTML = "next Iteration";
  btn.classList.add("btn");
  canvas.width = width;
  canvas.height = height;

  body.appendChild(canvas);
  body.appendChild(btn);

  const ctx = canvas.getContext("2d");

  btn.addEventListener("click", () => {
    computeNextGrid(ctx);
    draw(ctx);
  });

  canvas.addEventListener("click", (event) => {
    pixelGenerator(event, ctx, canvas);
  });
  return ctx;
};

const setup = () => {
  const ctx = initCanvas(width, height);
  cols = Math.floor(width / res);
  rows = Math.floor(height / res);
  grid = make2dArray(cols, rows);
  // drawGrid(ctx);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
};

// const drawGrid = (ctx) => {
//   const bh = cols * res;
//   const bw = rows * res;

//   for (let x = 0; x <= bw; x += res) {
//     ctx.moveTo(x, 0);
//     ctx.lineTo(x, bw);
//   }

//   for (let y = 0; y <= bh; y += res) {
//     ctx.moveTo(0, y);
//     ctx.lineTo(bh, y);
//   }

//   ctx.strokeStyle = "black";
//   ctx.stroke();
// };

setup();
