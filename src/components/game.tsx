import * as React from "react";
import { Connection } from "../connection";
import { Canvas } from "./canvas"
import { GameMap } from "./canvasCode/map/GameMap";
import { JsonParser } from "../jsonParser";
import { StatusBar, PlayerList } from "./gameOverlays/statusBar";
import { Player } from "./canvasCode/mechanics/Player";
import { Turn } from "./canvasCode/mechanics/Turn";
import { Popup } from "./gameOverlays/popup";
import { Hex } from "./canvasCode/graphics/Hex";
import { RelPoint, AbsPoint, HexPoint } from "./canvasCode/graphics/Point";

interface IProps {
    conn: Connection
}

interface IState {
    gm: GameMap,
    gameStarted: boolean,
    currNotification: string | null,
    currError: string | null,
    playerList: Array<string>,
    currentTurn: Turn | null,
}

export class Game extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        props.conn.setJsonMessageHandler(this.onMessage.bind(this));

        this.state = {
            gm: new GameMap([], [], []),
            gameStarted: false,
            currNotification: null,
            currError: null,
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
                    if (!x) {
                        throw Error('This should not happen');
                    }
                    playerList.push(x.getName());
                }
            }

            this.setState({
                gm: gameMap,
                gameStarted: gameStarted,
                playerList: playerList
            });
        }

        else if (JsonParser.askName(obj) == 'Turn') {
            // should only be received on a new turn
            const turn = Turn.fromJson(obj);

            this.setState({
                currentTurn: turn,
                currNotification: `${turn.currentPlayer.getName()}'s turn`
            });
        }

        else if (JsonParser.askType(obj) == "notification") {
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

        else if (JsonParser.askType(obj) == "error") {
            const errMsg = JsonParser.requireString(obj, 'content');

            this.setState({
                currError: errMsg
            });
        }
    }

    mouseHoverHandler(e: React.MouseEvent) {
        const p = new RelPoint(e.clientX, e.clientY);
        const r = Hex.distanceFromNearestHexCorner(p);

        if (r < Hex.getSideLength() / 4) {
            // ???
        }
    }

    mouseHandler(e: React.MouseEvent) {
        const p = new RelPoint(e.clientX, e.clientY);
        const r = Hex.distanceFromNearestHexCorner(p);

        if (r < Hex.getSideLength() / 4) {
            // clicked on a corner
            const h = p.toHexPoint();
            console.log("new settlement");
            this.props.conn.send({'type': 'action', 'content': 'placeSettlement', 'args': [h.toJsonSerializable()]})
        }

        // if (GameManager.instance.mayPlaceRobber) {
        //     const tile = m.getAllowedRobberPlace(p.toAbsPoint());
        //     if (tile != undefined) {
        //     }
        //     else {
                
        //     }
        // }
        // else if (GameManager.instance.mayPlaceSettlement) {            
            
        //     if (r < Hex.getSideLength() / 4) {
        //         // clicked on a corner
        //         const h = p.toHexPoint();
        //         console.log("new settlement");
        //     }
        // }
        // else if (GameManager.instance.mayPlaceCity) {
        //     // strokeCity
        //     if (r < Hex.getSideLength() / 3.5) {
        //         const h = p.toHexPoint();

        //         if (m.isAllowedCity(h)) {
        //             m.addCity(h);
        //         }
        //         else {
        //             // console.log("not allowed position");
        //             GameManager.instance.printErr("Illegal Position");
        //         }
        //     }
        // }
        // else if (GameManager.instance.mayPlaceRoad) {
        //     const hArr = p.toDualHexPoint();            
        //     if (hArr.length == 2) { // hArr is empty if not over a line 
                
        //     }
        // }
    }

    render() {
        const defaultMsg = this.state.gameStarted ? "Game running" : "Game hasn't started yet"
        const msg = this.state.currNotification == null ? defaultMsg : this.state.currNotification
        return (
            <div>
                {(this.state.currError) ? <Popup msg={this.state.currError} callBack={() => {this.setState({ currError: null })}}/> : null}
                <StatusBar msg={msg}>
                    {(this.state.gameStarted) ? null : <button className="button" onClick={() => {this.props.conn.send({'debug': 'startGame'})}}>Start Game</button>}
                    {(this.state.currentTurn && this.state.currentTurn.currentPlayer.getName() == this.props.conn.getName()) ? <button className="button" onClick={() => {this.props.conn.send({'type': 'action', 'content': 'nextTurn'})}}>End Turn</button> : null}
                </StatusBar>
                <PlayerList names={this.state.playerList} currentPlayer={(this.state.currentTurn) ? this.state.currentTurn.currentPlayer.getName() : null}/>
                <Canvas gm={this.state.gm} onClick={this.mouseHandler.bind(this)} onHover={this.mouseHoverHandler.bind(this)}/>
            </div>
        )
    }
}  