import * as React from "react";

import { LoginForm } from "./login";
import { Spinner } from "./spinner";

import { Connection } from "../connection";
import { Game } from "./game";

const atLogin = 0
const atConnecting = 1
const atGame = 2

interface IState {
    progressState: number,
    failedConn: boolean,
    name: string | null,
    host: string | null,
    port: number | null,
    conn: Connection | null
}

export class UI extends React.Component<{}, IState> {
    
    constructor(props: {}) {
        super(props);
        
        this.state = {
            progressState: atLogin,
            failedConn: false,
            name: null,
            host: null,
            port: null,
            conn: null,
        };

        this.loginSubmitCallback = this.loginSubmitCallback.bind(this);
    }

    loginSubmitCallback(name: string, host: string, port: number) {
        this.setState({
            name: name,
            host: host,
            port: port,
            progressState: atConnecting,
            failedConn: false,
            conn: new Connection(host, port, name, this.onWebSockFailure.bind(this), this.onWebSockOpen.bind(this))
        });
    }

    private onWebSockFailure(ev: Event) {
        this.setState({
            progressState: atLogin,
            failedConn: true
        })
    }

    private onWebSockOpen(ev: Event) {
        this.setState({
            progressState: atGame,
            failedConn: false
        })
    }

    render() {
        if (this.state.progressState == atLogin) {
            if (this.state.failedConn) {
                return (
                    <div>
                        <LoginForm callback={this.loginSubmitCallback} />
                        <img id="whoopsie" src="whoopsie-01.png" alt="whoopsie"></img>
                    </div>
                    );
            }
            else {
                return (
                    <div>
                        <LoginForm callback={this.loginSubmitCallback} />
                    </div>
                );
            }
            
        }
        else if (this.state.progressState == atConnecting) {
            return (
                <div className="window center" style={{width: "6em"}}>
                    <p style={{margin: 'auto', paddingBottom: '0.5em', color: 'white'}}>Connecting...</p>
                    <Spinner shown={true}/>
                </div>
                );
        }
        else if (this.state.progressState == atGame) {
            return (
                <Game conn={this.state.conn}/>
            )
        }
        else {
            return <p>Hi, {this.state.name}</p>
        }
    }

}