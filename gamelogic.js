// Initialize the board
let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

// Function to print the current board
function printBoard() 
{
    const row1 = `| ${board[0]} | ${board[1]} | ${board[2]} |`;
    const row2 = `| ${board[3]} | ${board[4]} | ${board[5]} |`;
    const row3 = `| ${board[6]} | ${board[7]} | ${board[8]} |`;

    return `
        ${row1}
        ${row2}
        ${row3}
    `;
}

// Function for player move
function playerMove(icon, choice) 
{
    if (board[choice - 1] === " ") 
    {
        board[choice - 1] = icon;
        return true; // Move successful
    } 
    else 
    {
        return false; // Move unsuccessful (space already taken)
    }
}

// Function to check for victory
function isVictory(icon) 
{
    return (
        (board[0] === icon && board[1] === icon && board[2] === icon) ||
        (board[3] === icon && board[4] === icon && board[5] === icon) ||
        (board[6] === icon && board[7] === icon && board[8] === icon) ||
        (board[0] === icon && board[3] === icon && board[6] === icon) ||
        (board[1] === icon && board[4] === icon && board[7] === icon) ||
        (board[2] === icon && board[5] === icon && board[8] === icon) ||
        (board[0] === icon && board[4] === icon && board[8] === icon) ||
        (board[2] === icon && board[4] === icon && board[6] === icon)
    );
}

// Function to check for a draw
function isDraw() 
{
    return board.every(square => square !== " ");
}

// Function to reset the board
function resetBoard() {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
}

module.exports = {
    printBoard,
    playerMove,
    isVictory,
    isDraw,
    resetBoard
};
