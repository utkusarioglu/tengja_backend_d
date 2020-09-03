import express from 'express';
const router = express.Router();



router.get('/games', (req, res, next) => {
    res.send(JSON.stringify({
        games:[
            {
                name: 'this game',
                id: 3, 
            }
        ]
    }))
})

/* GET home page. */
router.get('/game/:gameId', (req, res, next) => {
    console.log("/api hit")
    res.send(JSON.stringify({
        message: 'hello',
        gameId: req.params.gameId,
    }));
});

export default router;