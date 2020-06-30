import * as React from "react";
import { ConnectionData } from "../dataTypes";

interface IState {
    name: string,
    host: string,
    port: string,
    color: string,
}

interface IProp {
    callback: (data: ConnectionData) => void
}

export class LoginForm extends React.Component<IProp, IState> {
    constructor(props: IProp) {
        super(props);
        this.state = {
            name: '',
            host: '',
            port: '',
            color: 'blue'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        if (event.currentTarget.name == "name") {
            this.setState({ name: event.currentTarget.value });
        }
        else if (event.currentTarget.name == "host") {
            this.setState({ host: event.currentTarget.value });
        }
        else if (event.currentTarget.name == "port") {
            this.setState({ port: event.currentTarget.value });
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        const port = parseInt(this.state.port);
        if (this.state.name != '' && this.state.host != '' && port.toString() != "NaN" && port > 0 && this.state.color != '') {
            console.log("yeet", this.state);

            this.props.callback({
                name: this.state.name,
                host: this.state.host,
                port: port,
                color: this.state.color,
                token: null
            });
        }

        event.preventDefault();
    }

    render() {
        return (
            <form id="loginForm" className="center window" onSubmit={this.handleSubmit}>
                <input required name="name" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChange}></input>
                <input required name="host" type="text" placeholder="Hostname" value={this.state.host} onChange={this.handleChange}></input>
                <input required name="port" type="number" placeholder="Port" value={this.state.port} onChange={this.handleChange}></input>

                <button className="button">Join Game</button>
            </form>
        )
    }
}