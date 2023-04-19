const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

const webSocketServer = new WebSocket.Server({ server });

app.use(express.static('WebSocket'));

webSocketServer.on('connection', function (webSocket, request) {
    console.log('WebSocket connection established from', request.connection.remoteAddress);

    // Message event listener for the current WebSocket
    webSocket.on('message', function (message) {
        console.log('Message received:', message);
        webSocketServer.clients.forEach(function (client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Error event listener for the current WebSocket
    webSocket.on('error', function (event) {
        console.log('WebSocket error:', event);
    });

    // Close event listener for the current WebSocket
    webSocket.on('close', function (event) {
        console.log('WebSocket connection closed:', event);
    });
});