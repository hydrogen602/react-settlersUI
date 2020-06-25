import * as React from "react";
import { Connection } from "../connection";
import { Canvas } from "./canvas"
import { GameMap } from "./canvasCode/map/GameMap";
import { JsonParser } from "../jsonParser";

interface IProps {
    conn: Connection
}

interface IState {
    gm: GameMap,
    gameStarted: boolean
}

export class Game extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        props.conn.setJsonMessageHandler(this.onMessage.bind(this));

        this.state = {
            gm: new GameMap([], [], []),
            gameStarted: false
        }
    }

    private onMessage(obj: object) {
        //console.log(obj);
        if (JsonParser.askName(obj) == 'Game') {
            const gameMapJson = JsonParser.requireObject(obj, 'gameMap');

            const gameMap = GameMap.fromJson(gameMapJson);

            const gameStarted = JsonParser.requireBool(obj, 'gameStarted');

            this.setState({
                gm: gameMap,
                gameStarted: gameStarted
            });
        }
    }

    render() {
        return (
            <Canvas gm={this.state.gm}/>
        )
    }
}  