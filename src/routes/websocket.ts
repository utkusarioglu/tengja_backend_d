import express from 'express';
import expressWs from 'express-ws';

const router = express.Router() as expressWs.Router;

// !TODO
router.ws('/', (ws, req) => {
    ws.on('message', (msg: String) => {
        console.log(`Websocket received: ${msg}`);
        ws.send(msg);
    });
});

export default router;