import * as React from "react";
import { Connection } from "../connection";
import { Canvas } from "./canvas"
import { GameMap } from "./canvasCode/map/GameMap";
import { JsonParser } from "../jsonParser";
import { StatusBar, PlayerList } from "./statusBar";
import { Player } from "./canvasCode/mechanics/Player";
import { Turn } from "./canvasCode/mechanics/Turn";

interface IProps {
    conn: Connection
}

interface IState {
    gm: GameMap,
    gameStarted: boolean,
    currNotification: string | null,
    playerList: Array<string>,
    currentTurn: Turn
}

export class Game extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        props.conn.setJsonMessageHandler(this.onMessage.bind(this));

        this.state = {
            gm: new GameMap([], [], []),
            gameStarted: false,
            currNotification: null,
            playerList: [],
            currentTurn: null
        }
    }

    private onMessage(obj: object) {
        //console.log(obj);
        if (JsonParser.askName(obj) == 'Game') {
            const gameMapJson = JsonParser.requireObject(obj, 'gameMap');

            const gameMap = GameMap.fromJson(gameMapJson);

            const gameStarted = JsonParser.requireBool(obj, 'gameStarted');

            const playerList = this.state.playerList;

            const players = JsonParser.requireArray(obj, 'players');
            for (const p of players) {
                if (!Player.doesPlayerExists(p)) {
                    const x = Player.fromJson(p);
                    playerList.push(x.getName());
                }
            }

            this.setState({
                gm: gameMap,
                gameStarted: gameStarted,
                playerList: playerList
            });
        }

        if (JsonParser.askName(obj) == 'Turn') {
            // should only be received on a new turn
            const turn = Turn.fromJson(obj);

            this.setState({
                currentTurn: turn,
                currNotification: `${turn.currentPlayer.getName()}'s turn`
            });
        }

        if (JsonParser.askType(obj) == "notification") {
            const msg = JsonParser.requireString(obj, 'content');

            this.setState({
                currNotification: msg
            });

            setTimeout(() => {
                if (this.state.currNotification == msg) {
                    this.setState({ currNotification: null });
                }
            }, 10000);
        }
    }

    render() {
        const defaultMsg = this.state.gameStarted ? "Game running" : "Game hasn't started yet"
        const msg = this.state.currNotification == null ? defaultMsg : this.state.currNotification
        return (
            <div>
                <StatusBar msg={msg} onClick={() => {this.props.conn.send({'debug': 'startGame'})}} gameStarted={this.state.gameStarted}/>
                <PlayerList names={this.state.playerList} currentPlayer={(this.state.currentTurn) ? this.state.currentTurn.currentPlayer.getName() : null}/>
                <Canvas gm={this.state.gm}/>
            </div>
        )
    }
}  