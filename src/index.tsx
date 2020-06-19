import * as React from "react";
import * as ReactDOM from "react-dom";

import { LoginForm } from "./components/login";

interface IState {
    atLogin: boolean,
    name: string | null,
    urlBase: string | null
}

class UI extends React.Component<{}, IState> {
    
    constructor(props: {}) {
        super(props);
        
        this.state = {
            atLogin: true,
            name: null,
            urlBase: null
        };

        this.loginSubmitCallback = this.loginSubmitCallback.bind(this);
    }

    loginSubmitCallback(name: string, host: string, port: number) {
        this.setState({
            name: name,
            urlBase: "ws://" + host + ":" + port + "/",
            atLogin: false
        })
    }

    render() {
        if (this.state.atLogin) {
            return <LoginForm callback={this.loginSubmitCallback} />
        }
        else {
        return <p>Hi, {this.state.name}</p>
        }
    }

}

ReactDOM.render(
    <UI />,
    document.getElementById("login")
);