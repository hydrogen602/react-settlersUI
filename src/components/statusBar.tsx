import * as React from "react";

interface IProps {
    msg: string,
    onClick: () => void,
    gameStarted: boolean
}

export function StatusBar(props: IProps) {
    return (
        <div className="window statusBar" style={{textAlign: 'center'}}>
            {(props.gameStarted) ? null : <button className="button" onClick={props.onClick}>Start Game</button>}
            <div>{props.msg}</div>
        </div>
    );
}

interface IProps2 {
    names: Array<string>,
    currentPlayer: string | null
}

export function PlayerList(props: IProps2) {
    return (
        <div className="window playerList">
            <h3>Players:</h3>
            {props.names.map((value, index) => {
                if (value == props.currentPlayer) {
                    return <p key={index}><i className="fas fa-arrow-alt-circle-right"></i> {value}</p>
                }
                else {
                    return <p key={index}>{value}</p>
                }
                
            })}
        </div>
    )
}