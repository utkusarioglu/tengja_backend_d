import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("open\n", req.session)
  res.send('hello, this is without an engine');
});

export default router;