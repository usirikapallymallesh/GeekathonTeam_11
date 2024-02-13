const board = document.getElementById('board');
var allDataOfStars = [];
var totalFlag = document.getElementById('mineFlag').innerHTML;
// Create 100 cells dynamically
for (let i = 0; i < 10; i++) {
    let arrOfEachRow = [];
    for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        // Set a unique ID for each cell
        cell.id = `${i}${j}`;
        // Generate a random number between 1 and 9
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        // Set the content of the cell to the random number
        arrOfEachRow.push(randomNumber)
        if (randomNumber == 5)
            cell.innerHTML = '<i class="fa-solid fa-bomb"></i>';
        // Add the 'red' class to make the cell color red
        cell.classList.add('marked');
        cell.classList.add('grey');
        // Add the 'hidden' class to hide the cell content
        cell.classList.add('hidden');
        // Append the cell to the board
        cell.addEventListener('click', () => {
            // Toggle the 'red' class to add/remove red background color
            console.log(cell.classList)
            let arr = [...cell.classList]

            if (arr.includes('marked')) {
                cell.classList.remove('marked');
                cell.classList.remove('grey')
                // Toggle the 'hidden' class to show/hide cell content
                cell.classList.remove('hidden');
                if (cell.innerHTML == '') {
                    let cellValue = checkTheCellValue(cell.id);
                    console.log(cell.style)
                    cell.style.fontSize = '2rem';
                    if (cellValue != '0') {
                        // Array of unique colors
                        const colors = ['blue', 'red', 'green', 'orange', 'purple', 'cyan', 'magenta', 'yellow'];

                        // Get color index based on cell value

                        cell.innerHTML = cellValue;
                        cellValue = parseInt(cellValue)
                        let colorIndex = cellValue % colors.length;
                        cell.style.color = colors[colorIndex];

                    }
                    checkWinOrNot();
                }
                else {
                    showAllBombs();
                }
            }
        });
        cell.addEventListener('contextmenu', (e) => {
            // Toggle the 'red' class to add/remove red background color
            e.preventDefault();
            if (totalFlag > 0) {
                let arr = [...cell.classList]
                if (arr.includes('marked')) {
                    totalFlag--;
                    document.getElementById('mineFlag').innerHTML = totalFlag;
                    if (cell.innerHTML == '<i class="fa-solid fa-bomb"></i>') {
                        cell.classList.remove('marked');
                        cell.classList.remove('grey')
                        cell.classList.add('red');
                    }
                    else {
                        cell.classList.remove('marked');
                        cell.classList.remove('grey')
                        cell.classList.add('blue');
                    }
                }
            }
            else
                alert("No More Flags Left")
            checkWinOrNot();
        });
        board.appendChild(cell);
    }
    allDataOfStars.push(arrOfEachRow)
}

// Setting The Cell Value When It Uncovers 
function checkTheCellValue(cellId) {
    console.log(allDataOfStars)
    cellId = parseInt(cellId, 10);
    let row = Math.floor(cellId / 10);
    let col = cellId % 10;
    let totalCellValue = 0;
    if (row + 1 <= 9) {
        if (allDataOfStars[row + 1][col] == 5)
            totalCellValue = totalCellValue + 1;
    }
    if (row - 1 >= 0) {
        if (allDataOfStars[row - 1][col] == 5)
            totalCellValue = totalCellValue + 1;
    }
    if (col + 1 <= 9) {
        if (allDataOfStars[row][col + 1] == 5)
            totalCellValue = totalCellValue + 1;
    }
    if (col - 1 >= 0) {
        if (allDataOfStars[row][col - 1] == 5)
            totalCellValue = totalCellValue + 1;
    }
    if (row + 1 <= 9 && col + 1 <= 9) {
        if (allDataOfStars[row + 1][col + 1] == 5)
            totalCellValue = totalCellValue + 1;
    }
    if (row + 1 <= 9 && col - 1 >= 0) {
        if (allDataOfStars[row + 1][col - 1] == 5)
            totalCellValue = totalCellValue + 1;
    }
    if (row - 1 >= 0 && col + 1 <= 9) {
        if (allDataOfStars[row - 1][col + 1] == 5)
            totalCellValue = totalCellValue + 1;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
        if (allDataOfStars[row - 1][col - 1] == 5)
            totalCellValue = totalCellValue + 1;
    }
    console.log("Total Value Of Cell" + totalCellValue)
    console.log(row);
    console.log(col);
    return totalCellValue;
}

// Show All The Bombs 
function showAllBombs() {
    let allBombs = document.querySelectorAll("#board > div")
    for (let i = 0; i < allBombs.length; i++) {
        let classArr = [...allBombs[i].classList]
        let markedValue = classArr.includes('marked');
        if (allBombs[i].innerHTML != '' && markedValue == true) {
            console.log(allBombs[i].innerHTML)
            allBombs[i].classList.remove('marked');
            allBombs[i].classList.remove('grey')
            // Toggle the 'hidden' class to show/hide cell content
            allBombs[i].classList.remove('hidden');
        }
    }
    let gameOverDiv = document.createElement('div');

    gameOverDiv.innerHTML = 'BOOM ! GAME OVER'
    gameOverDiv.style.color = 'red'
    gameOverDiv.style.fontSize = '2.5rem'
    document.getElementById('mainContainer').append(gameOverDiv)
    setTimeout(function () {

        document.querySelector('body').addEventListener("click", () => {
            window.location.reload();
        })
        document.querySelector('body').addEventListener("contextmenu", () => {
            window.location.reload();
        })


    }, 0);

}
// Checking All Squares Are Filled Or Not 
function checkWinOrNot() {
    console.log("Not Won Yet")
    let completeFlag = true;
    let allBombs = document.querySelectorAll("#board > div")
    for (let i = 0; i < allBombs.length; i++) {
        let classArr = [...allBombs[i].classList]
        let markedValue = classArr.includes('marked');
        if (markedValue == true)
            completeFlag = false;
    }
    if (completeFlag == true) {
        setTimeout(function () {

            document.querySelector('body').addEventListener("click", () => {
                window.location.reload();
            })
            document.querySelector('body').addEventListener("contextmenu", () => {
                window.location.reload();
            })


        }, 0);
    }
}