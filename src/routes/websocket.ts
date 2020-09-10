import express from 'express';
import expressWs from 'express-ws';
import redis from '../redis';

import { gamesLists } from '../mock/games';

const router = express.Router() as expressWs.Router;

interface Subscription {
    name: string,
    startTime: number,
    endTime: number,
    // leaseDuration: number,
}

interface ISubscriptionObject {[subscriptionName: string]: Subscription}

interface IActiveUser {
    id: string;
    playerId: string,
    subscriptions: ISubscriptionObject
}

interface IActiveUsersObject {[activeUserId: string]: IActiveUser}

const activeUsers: IActiveUsersObject = {}
// let subscriptions: {[subscriptionName: string]: NodeJS.Timeout}= {}

interface ISession extends Express.Session {
    subscriptions: {[subscriptionName: string]: NodeJS.Timeout}
}

interface IWebsocketMessage {
    test: any,
    subscribe: string[],
    unsubscribe: true | string[]
}

// !TODO
router.ws('/', (ws, req) => {
    ws.on('message', (msg: string) => {
        try {
            const message: IWebsocketMessage = JSON.parse(msg);
            const sess = req.session as ISession;

            if(sess.subscriptions === undefined) {
                sess.subscriptions = Object.create({})
            } 

            handleTest(ws, message);


            /*
            * Subscribe
            */
            const subscriptionName = 'gamesList';
            if(message.subscribe) {
                message.subscribe.forEach((sub: string) => {
                    if(!Object.keys(sess.subscriptions).includes(sub)) {
                        ws.send(testMessage(req.session));
                        sess.subscriptions[subscriptionName] = setInterval(() => {
                            if(ws.readyState === 1) {
                                ws.send(testMessage(sess));
                            }
                        }, 5000)
                    }
                })
            }

            /*
            * Unsubscribe
            */
            if(message.unsubscribe) {
                if(message.unsubscribe === true) {
                    Object.values(sess.subscriptions)
                        .forEach((subscription) => clearInterval(subscription));
                        sess.subscriptions = Object.create({})
                } else {
                    message.unsubscribe.forEach((unsub: string) => {
                        clearInterval(sess.subscriptions[unsub])
                        delete sess.subscriptions[unsub];                    
                    })
                }          
            }      
        }
        catch (e) {
            console.warn('A faulty request was made:\n', e)
        }


    });
});

// !HACK any type
function handleTest(ws: any, message: IWebsocketMessage) {
    if (message.test !== undefined) {
        redis.getPlayer('utku')
            .then((player) => {
                ws.send(JSON.stringify({testMessage: player}));
            })
            .catch((e) => {
                console.warn('something went wrong with redis.getPlayer:\n', e)
            })
    }
}

function testMessage(session: any) {
    const messageNumber = Math.round(Math.random()* (gamesLists.length - 1));
    const response = JSON.stringify({...gamesLists[messageNumber], session});
    // console.log(`Websocket sending: ${response}`);
    return response;
}

export default router;