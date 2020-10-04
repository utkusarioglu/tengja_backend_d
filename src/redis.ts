import redis from "redis";
import { promisify } from "util";

export const client = redis.createClient({ host: "redis" });

class Redis {
  private client = redis.createClient({ host: "redis" });
  private getAsync = promisify(client.get).bind(client);
  private setAsync = promisify(client.set).bind(client);

  constructor() {
    this.client.on("error", (err) => {
      console.log("redis error", err);
    });
  }

  public getClient(): redis.RedisClient {
    console.log("calling redis client");
    return this.client;
  }

  public setNewPlayer(player: any): void {
    this.setAsync(`activePlayer:${player.id}`, JSON.stringify(player)).then(
      (res) => {
        process.env.NODE_ENV === "development" && console.log("Player saved");
      }
    );
  }

  public getPlayer(playerId: string): Promise<any> {
    return this.getAsync(`activePlayer.${playerId}`);
  }
}

export default new Redis();
