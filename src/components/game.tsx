import * as React from "react";
import { Connection } from "../connection";
import { Canvas } from "./canvas"

interface IProps {
    conn: Connection
}

interface IState {

}

export class Game extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        props.conn.setJsonMessageHandler(this.onMessage.bind(this));

        this.state = {

        }
    }

    private onMessage(obj: object) {
        //console.log(obj);
    }

    render() {
        return (
            <Canvas />
        )
    }
}  