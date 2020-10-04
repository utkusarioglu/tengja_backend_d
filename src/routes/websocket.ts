import express from "express";
import expressWs from "express-ws";
import redis from "../redis";

const router = express.Router() as expressWs.Router;

interface Subscription {
  name: string;
  startTime: number;
  endTime: number;
  // leaseDuration: number,
}

interface ISubscriptionObject {
  [subscriptionName: string]: Subscription;
}

interface IWebsocketMessage {
  test: any;
  subscribe: string[];
  unsubscribe: true | string[];
}

// !TODO
router.ws("/", (ws, req) => {
  ws.on("message", (msg: string) => {
    console.log("ws message", msg, req.cookies);
    try {
        const message: IWebsocketMessage = JSON.parse(msg);
        if 
    } catch (e) {
      console.warn("A faulty request was made:\n", e);
    }
  });
});

export default router;
