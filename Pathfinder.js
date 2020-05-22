
let START_ROW = null;
let START_COL = null;
let END_ROW = null;
let END_COL = null;

let GRID_WIDTH = 50;
let GRID_HEIGHT = 25;
let grid = [];
let visitedNodes = [];
let pathNodes = [];

let selectingStart = false;
let selectingEnd = false;
let selectingWall = false;
let selectingWeight = false;

let mouseDown = 0;

createGrid();
drawGrid();

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
            } else if(grid[col][row].weight == 5) {
                html += `<div class = 'weightnode' id = '${col}-${row}'></div>`;
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
    document.getElementById("select start node").addEventListener("click", addStartListener);
    document.getElementById("select end node").addEventListener("click", addEndListener);
    document.getElementById("add wall node").addEventListener("click", addWallListener);
    document.getElementById("add weight node").addEventListener("click", addWeightListener);
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

function addStartListener(event) {
    selectingStart = !selectingStart;
    selectingEnd = false;
    selectingWall = false;
    selectingWeight = false;
}

function addEndListener(event) {
    selectingStart = false;
    selectingEnd = !selectingEnd;
    selectingWall = false;
    selectingWeight = false;
}

function addWallListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = !selectingWall;
    selectingWeight = false;
}

function addWeightListener() {
    selectingStart = false;
    selectingEnd = false;
    selectingWall = false;
    selectingWeight = !selectingWeight;
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
    } else if (selectingWeight) {
        document.getElementById(`${col}-${row}`).className = "weightnode";
        grid[col][row].weight = 5;
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
        } else if (selectingWeight) {
            document.getElementById(`${col}-${row}`).className = "weightnode";
            grid[col][row].weight = 5;
            grid[col][row].distance = Infinity;
        }
    }
}

function dijkstra() {
    //visitedNodes.push(grid[START_COL][START_ROW]);
    let unvisitedNodes = copyGridToList(grid);
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    //grid[START_COL][START_ROW].isVisited = true;
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
                    break;
                }
            }
        }
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    }
    if(unvisitedNodes.length > 0 && unvisitedNodes[0].distance != Infinity) {
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
            for(let i = 0; i < 16; i++) {
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

