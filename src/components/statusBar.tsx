import * as React from "react";

interface IProps {
    msg: string,
}

export function StatusBar(props: IProps) {
    return (
        <div className="window statusBar" style={{textAlign: 'center'}}>
            {props.msg}
        </div>
    );
}

interface IProps2 {
    names: Array<string>
}

export function PlayerList(props: IProps2) {
    return (
        <div className="window playerList">
            <h3>Players:</h3>
            {props.names.map((value, index) => {
                return <p key={index}>{value}</p>
            })}
        </div>
    )
}