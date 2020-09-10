import redis from 'redis';
import { promisify } from 'util';


export const client = redis.createClient({host: 'redis'});

class Redis {

    private client = redis.createClient({host: 'redis'});
    private getAsync = promisify(client.get).bind(client);
    private setAsync = promisify(client.set).bind(client);

    public getClient(): redis.RedisClient {
        return client;
    }
    
    public setNewPlayer(player: any): void {
        this.setAsync(`activePlayer.${player.id}`, JSON.stringify(player)).then((res) => {
            console.warn('player saved')
        })
    }

    public getPlayer(playerId: string): Promise<any> {
        return this.getAsync(`activePlayer.${playerId}`)
    }


}

export default new Redis();