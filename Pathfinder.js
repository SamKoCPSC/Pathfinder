
let START_ROW = null;
let START_COL = null;
let END_ROW = null;
let END_COL = null;

let GRID_WIDTH = 64;
let GRID_HEIGHT = 28;
let grid = [];
let visitedNodes = [];
let pathNodes = [];

let selectingStart = false;
let selectingEnd = false;
let selectingWall = false;
let selectingWeightTwo = false;
let selectingWeightThree = false;
let selectingWeightFour = false;
let selectingWeightFive = false;
let selectingWeightSix = false;
let selectingWeightSeven = false;
let selectingWeightEight = false;
let selectingWeightNine = false;
let selectingWeightTen = false;
let selectingErase = false;

let mouseDown = 0;

createGrid();
drawGrid();

console.log(document.documentElement.clientWidth);

function createGrid() {
    for(let col = 0; col < GRID_WIDTH; col++) {
        const currentCol = [];
        for(let row = 0; row < GRID_HEIGHT; row++) {
            currentCol.push(createNode(row, col));
        }
        grid.push(currentCol);
    }
}

function createNode(row, col) {
    return {
        row,
        col,
        isStart: row === START_ROW && col === START_COL,
        isEnd: row === END_ROW && col === END_COL,
        isVisited: false,
        isPath: false,
        isWall: false,
        distance: row === START_ROW && col === START_COL ? 0 : Infinity,
        weight: 1,
        prevNode: null,
    }
}

function drawGrid() {
    let html = "";
    html += "<div>";
    for(let row = 0; row < GRID_HEIGHT; row++) {
        html += "<div>";
        for(let col = 0; col < GRID_WIDTH; col++) {
            if(grid[col][row].isWall) {
                html += `<div class = 'wallnode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].isPath) {
                html += `<div class = 'pathnode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].isStart) {
                html += `<div class = 'startnode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].isEnd) {
                html += `<div class = 'endnode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].weight == 2) {
                html += `<div class = 'weighttwonode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].weight == 3) {
                html += `<div class = 'weightthreenode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].weight == 4) {
                html += `<div class = 'weightfournode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].weight == 5) {
                html += `<div class = 'weightfivenode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].weight == 6) {
                html += `<div class = 'weightsixnode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].weight == 7) {
                html += `<div class = 'weightsevennode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].weight == 8) {
                html += `<div class = 'weighteightnode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].weight == 9) {
                html += `<div class = 'weightninenode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].weight == 10) {
                html += `<div class = 'weighttennode' id = '${col}-${row}'></div>`;
            } else if(grid[col][row].isVisited) {
                html += `<div class = 'visitednode' id = '${col}-${row}'></div>`;
            } else {
                html += `<div class = 'node' id = '${col}-${row}'></div>`;
            }
        }
        html += "</div>";
    }
    html += "</div>";
    document.getElementById("render").innerHTML = html;
    addListeners();
}

function addListeners() {
    document.addEventListener("mousedown", mousePressedListener);
    document.addEventListener("mouseup", mouseNotPressedListener);
    document.getElementById("visualize").addEventListener("click", visualizeListener);
    document.getElementById("clear").addEventListener("click", clearListener);
    document.getElementById("erase").addEventListener("click", eraseListener);
    document.getElementById("select start node").addEventListener("click", addStartListener);
    document.getElementById("select end node").addEventListener("click", addEndListener);
    document.getElementById("add wall node").addEventListener("click", addWallListener);
    document.getElementById("add weight node").addEventListener("click", addWeightListener);
    document.getElementById("weighttwo").addEventListener("click", weightTwoListener);
    document.getElementById("weightthree").addEventListener("click", weightThreeListener);
    document.getElementById("weightfour").addEventListener("click", weightFourListener);
    document.getElementById("weightfive").addEventListener("click", weightFiveListener);
    document.getElementById("weightsix").addEventListener("click", weightSixListener);
    document.getElementById("weightseven").addEventListener("click", weightSevenListener);
    document.getElementById("weighteight").addEventListener("click", weightEightListener);
    document.getElementById("weightnine").addEventListener("click", weightNineListener);
    document.getElementById("weightten").addEventListener("click", weightTenListener);
    document.getElementById("about").addEventListener("click", aboutListener);
    document.getElementById("about-close").addEventListener("click", aboutCloseListener);
    document.getElementById("help").addEventListener("click", helpListener);
    document.getElementById("help-close").addEventListener("click", helpCloseListener);
    for(let row = 0; row < GRID_HEIGHT; row++) {
        for(let col = 0; col < GRID_WIDTH; col++) {
            document.getElementById(`${col}-${row}`).addEventListener("mousedown", nodeClickListener.bind(null, event, row, col));
            document.getElementById(`${col}-${row}`).addEventListener("mouseover", nodeHoldListener.bind(null, event, row, col));
        }
    }
}

function mousePressedListener() {
    event.preventDefault();
    mouseDown++;
}

function mouseNotPressedListener() {
    event.preventDefault();
    mouseDown--;
}

function visualizeListener(event) {
    dijkstra();
    visualize();
}

function clearListener(event) {
    grid.length = 0;
    START_ROW = -1;
    START_COL = -1;
    END_ROW = -1;
    END_COL = -1;
    createGrid();
    for(let row = 0; row < GRID_HEIGHT; row++) {
        for(let col = 0; col < GRID_WIDTH; col++) {
            document.getElementById(`${col}-${row}`).className = "node";
        }
    }
    console.log(grid);
}

function eraseListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = false;
    selectingWeightTwo = false;
    selectingWeightThree = false;
    selectingWeightFour = false;
    selectingWeightFive = false;
    selectingWeightSix = false;
    selectingWeightSeven = false;
    selectingWeightEight = false;
    selectingWeightNine = false;
    selectingWeightTen = false;
    selectingErase = !selectingErase;
    if(!selectingErase) {
        document.getElementById("erase").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "black";
        document.getElementById("select start node").style.color = "white";
        document.getElementById("select end node").style.color = "white";
        document.getElementById("add wall node").style.color = "white";
        document.getElementById("add weight node").style.color = "white";
    }
}

function addStartListener(event) {
    selectingStart = !selectingStart;
    selectingEnd = false;
    selectingWall = false;
    selectingWeightTwo = false;
    selectingWeightThree = false;
    selectingWeightFour = false;
    selectingWeightFive = false;
    selectingWeightSix = false;
    selectingWeightSeven = false;
    selectingWeightEight = false;
    selectingWeightNine = false;
    selectingWeightTen = false;
    selectingErase = false;
    if(!selectingStart) {
        document.getElementById("select start node").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "white";
        document.getElementById("select start node").style.color = "black";
        document.getElementById("select end node").style.color = "white";
        document.getElementById("add wall node").style.color = "white";
        document.getElementById("add weight node").style.color = "white";
    }
}

function addEndListener(event) {
    selectingStart = false;
    selectingEnd = !selectingEnd;
    selectingWall = false;
    selectingWeightTwo = false;
    selectingWeightThree = false;
    selectingWeightFour = false;
    selectingWeightFive = false;
    selectingWeightSix = false;
    selectingWeightSeven = false;
    selectingWeightEight = false;
    selectingWeightNine = false;
    selectingWeightTen = false;
    selectingErase = false;
    if(!selectingEnd) {
        document.getElementById("select end node").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "white";
        document.getElementById("select start node").style.color = "white";
        document.getElementById("select end node").style.color = "black";
        document.getElementById("add wall node").style.color = "white";
        document.getElementById("add weight node").style.color = "white";
    }
}

function addWallListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = !selectingWall;
    selectingWeightTwo = false;
    selectingWeightThree = false;
    selectingWeightFour = false;
    selectingWeightFive = false;
    selectingWeightSix = false;
    selectingWeightSeven = false;
    selectingWeightEight = false;
    selectingWeightNine = false;
    selectingWeightTen = false;
    selectingErase = false;
    if(!selectingWall) {
        document.getElementById("add wall node").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "white";
        document.getElementById("select start node").style.color = "white";
        document.getElementById("select end node").style.color = "white";
        document.getElementById("add wall node").style.color = "black";
        document.getElementById("add weight node").style.color = "white";
    }
}

function addWeightListener() {
    document.getElementById("weight dropdown").style.display = "initial"
}

function weightTwoListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = false;
    selectingWeightTwo = !selectingWeightTwo;
    selectingWeightThree = false;
    selectingWeightFour = false;
    selectingWeightFive = false;
    selectingWeightSix = false;
    selectingWeightSeven = false;
    selectingWeightEight = false;
    selectingWeightNine = false;
    selectingWeightTen = false;
    selectingErase = false;
    document.getElementById("weight dropdown").style.display = "none"
    if(!selectingWeightTwo) {
        document.getElementById("add weight node").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "white";
        document.getElementById("select start node").style.color = "white";
        document.getElementById("select end node").style.color = "white";
        document.getElementById("add wall node").style.color = "white";
        document.getElementById("add weight node").style.color = "black";
    }
}

function weightThreeListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = false;
    selectingWeightTwo = false;
    selectingWeightThree = !selectingWeightThree;
    selectingWeightFour = false;
    selectingWeightFive = false;
    selectingWeightSix = false;
    selectingWeightSeven = false;
    selectingWeightEight = false;
    selectingWeightNine = false;
    selectingWeightTen = false;
    selectingErase = false;
    document.getElementById("weight dropdown").style.display = "none"
    if(!selectingWeightThree) {
        document.getElementById("add weight node").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "white";
        document.getElementById("select start node").style.color = "white";
        document.getElementById("select end node").style.color = "white";
        document.getElementById("add wall node").style.color = "white";
        document.getElementById("add weight node").style.color = "black";
    }
}

function weightFourListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = false;
    selectingWeightTwo = false;
    selectingWeightThree = false;
    selectingWeightFour = !selectingWeightFour;
    selectingWeightFive = false;
    selectingWeightSix = false;
    selectingWeightSeven = false;
    selectingWeightEight = false;
    selectingWeightNine = false;
    selectingWeightTen = false;
    selectingErase = false;
    document.getElementById("weight dropdown").style.display = "none"
    if(!selectingWeightFour) {
        document.getElementById("add weight node").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "white";
        document.getElementById("select start node").style.color = "white";
        document.getElementById("select end node").style.color = "white";
        document.getElementById("add wall node").style.color = "white";
        document.getElementById("add weight node").style.color = "black";
    }
}

function weightFiveListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = false;
    selectingWeightTwo = false;
    selectingWeightThree = false;
    selectingWeightFour = false;
    selectingWeightFive = !selectingWeightFive;
    selectingWeightSix = false;
    selectingWeightSeven = false;
    selectingWeightEight = false;
    selectingWeightNine = false;
    selectingWeightTen = false;
    selectingErase = false;
    document.getElementById("weight dropdown").style.display = "none"
    if(!selectingWeightFive) {
        document.getElementById("add weight node").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "white";
        document.getElementById("select start node").style.color = "white";
        document.getElementById("select end node").style.color = "white";
        document.getElementById("add wall node").style.color = "white";
        document.getElementById("add weight node").style.color = "black";
    }
}

function weightSixListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = false;
    selectingWeightTwo = false;
    selectingWeightThree = false;
    selectingWeightFour = false;
    selectingWeightFive = false;
    selectingWeightSix = !selectingWeightSix;
    selectingWeightSeven = false;
    selectingWeightEight = false;
    selectingWeightNine = false;
    selectingWeightTen = false;
    selectingErase = false;
    document.getElementById("weight dropdown").style.display = "none"
    if(!selectingWeightSix) {
        document.getElementById("add weight node").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "white";
        document.getElementById("select start node").style.color = "white";
        document.getElementById("select end node").style.color = "white";
        document.getElementById("add wall node").style.color = "white";
        document.getElementById("add weight node").style.color = "black";
    }
}

function weightSevenListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = false;
    selectingWeightTwo = false;
    selectingWeightThree = false;
    selectingWeightFour = false;
    selectingWeightFive = false;
    selectingWeightSix = false;
    selectingWeightSeven = !selectingWeightSeven;
    selectingWeightEight = false;
    selectingWeightNine = false;
    selectingWeightTen = false;
    selectingErase = false;
    document.getElementById("weight dropdown").style.display = "none"
    if(!selectingWeightSeven) {
        document.getElementById("add weight node").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "white";
        document.getElementById("select start node").style.color = "white";
        document.getElementById("select end node").style.color = "white";
        document.getElementById("add wall node").style.color = "white";
        document.getElementById("add weight node").style.color = "black";
    }
}

function weightEightListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = false;
    selectingWeightTwo = false;
    selectingWeightThree = false;
    selectingWeightFour = false;
    selectingWeightFive = false;
    selectingWeightSix = false;
    selectingWeightSeven = false;
    selectingWeightEight = !selectingWeightEight;
    selectingWeightNine = false;
    selectingWeightTen = false;
    selectingErase = false;
    document.getElementById("weight dropdown").style.display = "none"
    if(!selectingWeightEight) {
        document.getElementById("add weight node").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "white";
        document.getElementById("select start node").style.color = "white";
        document.getElementById("select end node").style.color = "white";
        document.getElementById("add wall node").style.color = "white";
        document.getElementById("add weight node").style.color = "black";
    }
}

function weightNineListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = false;
    selectingWeightTwo = false;
    selectingWeightThree = false;
    selectingWeightFour = false;
    selectingWeightFive = false;
    selectingWeightSix = false;
    selectingWeightSeven = false;
    selectingWeightEight = false;
    selectingWeightNine = !selectingWeightNine;
    selectingWeightTen = false;
    selectingErase = false;
    document.getElementById("weight dropdown").style.display = "none"
    if(!selectingWeightNine) {
        document.getElementById("add weight node").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "white";
        document.getElementById("select start node").style.color = "white";
        document.getElementById("select end node").style.color = "white";
        document.getElementById("add wall node").style.color = "white";
        document.getElementById("add weight node").style.color = "black";
    }
}

function weightTenListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = false;
    selectingWeightTwo = false;
    selectingWeightThree = false;
    selectingWeightFour = false;
    selectingWeightFive = false;
    selectingWeightSix = false;
    selectingWeightSeven = false;
    selectingWeightEight = false;
    selectingWeightNine = false;
    selectingWeightTen = !selectingWeightTen;
    selectingErase = false;
    document.getElementById("weight dropdown").style.display = "none"
    if(!selectingWeightTen) {
        document.getElementById("add weight node").style.color = "white";
    } else {
        document.getElementById("erase").style.color = "white";
        document.getElementById("select start node").style.color = "white";
        document.getElementById("select end node").style.color = "white";
        document.getElementById("add wall node").style.color = "white";
        document.getElementById("add weight node").style.color = "black";
    }
}

function aboutListener() {
    document.getElementById("about-modal").style.display = "block";
}

function aboutCloseListener() {
    document.getElementById("about-modal").style.display = "none";
}

function helpListener() {
    document.getElementById("help-modal").style.display = "block";
}

function helpCloseListener() {
    document.getElementById("help-modal").style.display = "none";
}

function nodeClickListener(event, row, col) {
    if(selectingStart) {
        document.getElementById(`${col}-${row}`).className = "startnode";
        grid[col][row].isStart = true;
        grid[col][row].distance = 0;
        START_ROW = row;
        START_COL = col;
    } else if (selectingEnd) {
        document.getElementById(`${col}-${row}`).className = "endnode";
        grid[col][row].isEnd = true;
        grid[col][row].distance = Infinity;
        END_ROW = row;
        END_COL = col;
    } else if (selectingWall) {
        document.getElementById(`${col}-${row}`).className = "wallnode";
        grid[col][row].isWall = true;
        grid[col][row].distance = Infinity;
    } else if (selectingWeightTwo) {
        document.getElementById(`${col}-${row}`).className = "weighttwonode";
        grid[col][row].weight = 2;
        grid[col][row].distance = Infinity;
    } else if (selectingWeightThree) {
        document.getElementById(`${col}-${row}`).className = "weightthreenode";
        grid[col][row].weight = 3;
        grid[col][row].distance = Infinity;
    } else if (selectingWeightFour) {
        document.getElementById(`${col}-${row}`).className = "weightfournode";
        grid[col][row].weight = 4;
        grid[col][row].distance = Infinity;
    } else if (selectingWeightFive) {
        document.getElementById(`${col}-${row}`).className = "weightfivenode";
        grid[col][row].weight = 5;
        grid[col][row].distance = Infinity;
    } else if (selectingWeightSix) {
        document.getElementById(`${col}-${row}`).className = "weightsixnode";
        grid[col][row].weight = 6;
        grid[col][row].distance = Infinity;
    } else if (selectingWeightSeven) {
        document.getElementById(`${col}-${row}`).className = "weightsevennode";
        grid[col][row].weight = 7;
        grid[col][row].distance = Infinity;
    } else if (selectingWeightEight) {
        document.getElementById(`${col}-${row}`).className = "weighteightnode";
        grid[col][row].weight = 8;
        grid[col][row].distance = Infinity;
    } else if (selectingWeightNine) {
        document.getElementById(`${col}-${row}`).className = "weightninenode";
        grid[col][row].weight = 9;
        grid[col][row].distance = Infinity;
    } else if (selectingWeightTen) {
        document.getElementById(`${col}-${row}`).className = "weighttennode";
        grid[col][row].weight = 10;
        grid[col][row].distance = Infinity;
    } else if (selectingErase) {
        document.getElementById(`${col}-${row}`).className = "node";
        grid[col][row] = createNode(row, col);
        grid[col][row].isStart = false;
        grid[col][row].isEnd = false;
        grid[col][row].weight = 1;
        grid[col][row].distance = Infinity;
    }
}

function nodeHoldListener(event, row, col) {
    if(mouseDown == 1) {
        if(selectingStart) {
            document.getElementById(`${col}-${row}`).className = "startnode";
            grid[col][row].isStart = true;
            grid[col][row].distance = 0;
            START_ROW = row;
            START_COL = col;
        } else if (selectingEnd) {
            document.getElementById(`${col}-${row}`).className = "endnode";
            grid[col][row].isEnd = true;
            grid[col][row].distance = Infinity;
            END_ROW = row;
            END_COL = col;
        } else if (selectingWall) {
            document.getElementById(`${col}-${row}`).className = "wallnode";
            grid[col][row].isWall = true;
            grid[col][row].distance = Infinity;
        } else if (selectingWeightTwo) {
            document.getElementById(`${col}-${row}`).className = "weighttwonode";
            grid[col][row].weight = 2;
            grid[col][row].distance = Infinity;
        } else if (selectingWeightThree) {
            document.getElementById(`${col}-${row}`).className = "weightthreenode";
            grid[col][row].weight = 3;
            grid[col][row].distance = Infinity;
        } else if (selectingWeightFour) {
            document.getElementById(`${col}-${row}`).className = "weightfournode";
            grid[col][row].weight = 4;
            grid[col][row].distance = Infinity;
        } else if (selectingWeightFive) {
            document.getElementById(`${col}-${row}`).className = "weightfivenode";
            grid[col][row].weight = 5;
            grid[col][row].distance = Infinity;
        } else if (selectingWeightSix) {
            document.getElementById(`${col}-${row}`).className = "weightsixnode";
            grid[col][row].weight = 6;
            grid[col][row].distance = Infinity;
        } else if (selectingWeightSeven) {
            document.getElementById(`${col}-${row}`).className = "weightsevennode";
            grid[col][row].weight = 7;
            grid[col][row].distance = Infinity;
        } else if (selectingWeightEight) {
            document.getElementById(`${col}-${row}`).className = "weighteightnode";
            grid[col][row].weight = 8;
            grid[col][row].distance = Infinity;
        } else if (selectingWeightNine) {
            document.getElementById(`${col}-${row}`).className = "weightninenode";
            grid[col][row].weight = 9;
            grid[col][row].distance = Infinity;
        } else if (selectingWeightTen) {
            document.getElementById(`${col}-${row}`).className = "weighttennode";
            grid[col][row].weight = 10;
            grid[col][row].distance = Infinity;
        } else if (selectingErase) {
            document.getElementById(`${col}-${row}`).className = "node";
            grid[col][row] = createNode(row, col); 
            grid[col][row].isStart = false;
            grid[col][row].isEnd = false;
            grid[col][row].weight = 1;
            grid[col][row].distance = Infinity;
            // grid[col][row] = {
            //     isStart: row === START_ROW && col === START_COL,
            //     isEnd: row === END_ROW && col === END_COL,
            //     isVisited: false,
            //     isPath: false,
            //     isWall: false,
            //     distance: row === START_ROW && col === START_COL ? 0 : Infinity,
            //     weight: 1,
            //     prevNode: null,
            // }
        }
    }
}

function dijkstra() {
    let unvisitedNodes = copyGridToList(grid);
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    let pathFound = false;
    while(unvisitedNodes.length > 0 && unvisitedNodes[0].distance != Infinity) {
        const node = unvisitedNodes.shift();
        if(node.row > 0) {
            if(!grid[node.col][node.row-1].isWall) {
                if(node.distance + grid[node.col][node.row-1].weight < grid[node.col][node.row-1].distance) {
                    grid[node.col][node.row-1].distance = node.distance + grid[node.col][node.row-1].weight;
                    grid[node.col][node.row-1].prevNode = node;
                }
                if(!grid[node.col][node.row-1].isVisited) {
                    visitedNodes.push(grid[node.col][node.row-1]);
                }
                if(grid[node.col][node.row-1].isEnd) {
                    END_ROW = node.row-1;
                    END_COL = node.col;
                    pathFound = true;
                    break;
                }
            }
        }
        if(node.row < grid[0].length - 1) {
            if(!grid[node.col][node.row+1].isWall) {
                if(node.distance + grid[node.col][node.row+1].weight < grid[node.col][node.row+1].distance) {
                    grid[node.col][node.row+1].distance = node.distance + grid[node.col][node.row+1].weight;
                    grid[node.col][node.row+1].prevNode = node;
                }
                if(!grid[node.col][node.row+1].isVisited) {
                    visitedNodes.push(grid[node.col][node.row+1]);
                }
                if(grid[node.col][node.row+1].isEnd) {
                    END_ROW = node.row+1;
                    END_COL = node.col;
                    pathFound = true;
                    break;
                }
            }
        }
        if(node.col > 0) {
            if(!grid[node.col-1][node.row].isWall) {
                if(node.distance + grid[node.col-1][node.row].weight < grid[node.col-1][node.row].distance) {
                    grid[node.col-1][node.row].distance = node.distance + grid[node.col-1][node.row].weight;
                    grid[node.col-1][node.row].prevNode = node;
                }
                if(!grid[node.col-1][node.row].isVisited) {
                    visitedNodes.push(grid[node.col-1][node.row]);
                }
                if(grid[node.col-1][node.row].isEnd) {
                    END_ROW = node.row;
                    END_COL = node.col-1;
                    pathFound = true;
                    break;
                }
            }
        }
        if(node.col < grid.length - 1) {
            if(!grid[node.col+1][node.row].isWall) {
                if(node.distance + grid[node.col+1][node.row].weight < grid[node.col+1][node.row].distance) {
                    grid[node.col+1][node.row].distance = node.distance + grid[node.col+1][node.row].weight;
                    grid[node.col+1][node.row].prevNode = node;
                }
                if(!grid[node.col+1][node.row].isVisited) {
                    visitedNodes.push(grid[node.col+1][node.row]);
                }
                if(grid[node.col+1][node.row].isEnd) {
                    END_ROW = node.row;
                    END_COL = node.col+1;
                    pathFound = true;
                    break;
                }
            }
        }
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    }
    if(pathFound) {
        let currNode = grid[END_COL][END_ROW].prevNode;
        while(currNode.prevNode != null) {
            pathNodes.unshift(currNode);
            currNode = currNode.prevNode;
        }
    }
}

function copyGridToList(gridToCopy) {
    const list = [];
    for(let col = 0; col < GRID_WIDTH; col++) {
        for(let row = 0; row < GRID_HEIGHT; row++) {
            list.push(gridToCopy[col][row]);
        }
    }
    return list;
}

function render() {
    document.getElementById("render").innerHTML = "";
    drawGrid();
}

function visualize() {
    setTimeout(function(){
        if(visitedNodes.length > 0) {
            for(let i = 0; i < 36; i++) {
                if(visitedNodes.length > 0) {
                    let currNode = visitedNodes.shift();
                    currNode.isVisited = true;
                }
            }
        } else if(pathNodes.length > 0) {
            if(pathNodes.length > 0) {
                let currNode = pathNodes.shift();
                currNode.isPath = true;
            }
        }
        render();
        if(visitedNodes.length > 0 || pathNodes.length > 0) {
            visualize();
        }
    }, 10);
}

