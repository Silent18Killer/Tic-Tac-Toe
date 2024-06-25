const http = require('http');
const url = require('url');
const { printBoard, playerMove, isVictory, isDraw, resetBoard} = require('./gameLogic');

const hostname = 'localhost';
const port = 5000;

let currentPlayer = 'X'; // Keep track of whose turn it is

const server = http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;
    
    if (path === '/board') 
    {
        // Return current board state
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(printBoard());
    } 
    else if (path === '/reset') 
    {
        // Reset the board
        resetBoard();
        currentPlayer = 'X'; // Reset the current player as well
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("Board reset. It's X's turn!\n");
    } 
    else if (path.startsWith('/move/')) 
    {
        // Process move request
        const parts = path.split('/');
        const icon = parts[2]; // Player icon (X or O)
        const choice = parseInt(parts[3]); // Move choice (1-9)

        if (icon !== currentPlayer) 
        {
            // If it's not the player's turn
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`It's not your turn! It's ${currentPlayer}'s turn.\n`);
        } 
        else if (playerMove(icon, choice)) 
        {
            // Move successful
            if (isVictory(icon)) 
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(`${icon} wins! Congratulations!\n`);
            } 
            else if (isDraw()) 
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end("It's a draw!\n");
            } 
            else 
            {
                // Switch turns
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(printBoard());
            }
        } 
        else 
        {
            // Move unsuccessful (space already taken)
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            res.end("That space is already taken!\n");
        }
    } 
    else 
    {
        // Invalid path
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found\n');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
