import { defined, assertInt } from "../util";
//import { Settlement } from "../map/Settlement";
//import { Road } from "../map/Road";
//import { RelPoint } from "../graphics/Point";
//import { Inventory } from "./Inventory";
import { JsonParser } from "../../../jsonParser";

export class Player {
    private color: string;
    //private settlements: Array<Settlement> = [];
    //private roads: Array<Road> = [];
    private name: string;
    private token: string;
    //private inventory: Inventory;

    private static playerDict: { [token: string]: Player} = {};

    constructor(color: string, name: string, token: string) {
        this.color = color;
        this.name = name;
        this.token = token;
        //this.settlements = [];
        defined(color);
        defined(name);
        defined(token);

        //this.inventory = new Inventory();

        Player.playerDict[token] = this;
    }

    static fromJson(data: object): Player {
        JsonParser.requireName(data, 'Player');
        const token = JsonParser.requireString(data, 'token');

        if (token in Player.playerDict) {
            // player already exists
            return Player.playerDict[token];
        }

        return new Player(
            JsonParser.requireString(data, 'color'),
            JsonParser.requireString(data, 'name'),
            token
        )
    }

    // getRoads() {
    //     return this.roads;
    // }

    // getSettlements() {
    //     return this.settlements;
    // }

    getColor() {
        return this.color;
    }

    getName() {
        return this.name;
    }

    getToken() {
        return this.token;
    }

    draw() {
        //this.invBoard.draw();
    }

    debug() {
        console.log(this)
        // this.settlements.forEach(e => {
        //     console.log("  ", e)
        // });
        //console.log("  Inv:", this.inventory);
    }


}