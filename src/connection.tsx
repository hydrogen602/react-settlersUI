import { JsonParser } from "./jsonParser";

export interface ConnectionData {
    name: string,
    host: string,
    port: number,
    token: string
}

/**
 * sets sessionStorage 'connection' to a json representation of ConnectionData
 */
export class Connection {

    private ws: WebSocket | null;

    private token: string | null;

    private failedAttempts: number;

    private verifiedConnection: boolean; // Hi - Hello echo verifies connection

    private name: string;
    private host: string;
    private port: number;

    private onWebSockFailure: (ev: Event) => void;
    private onWebSockOpen: (ev: Event) => void;

    private jsonMessageHandler: (obj: object) => void;

    private connectedOnce: boolean;

    constructor(host: string, port: number, name: string, onWebSockFailure: (ev: Event) => void, onWebSockOpen: (ev: Event) => void) {

        this.host = encodeURIComponent(host);
        this.name = encodeURIComponent(name);
        if (port.toString() == 'NaN') {
            throw Error("yeet the port"); 
        }
        this.port = port;  
        
        this.onWebSockFailure = onWebSockFailure;
        this.onWebSockOpen = onWebSockOpen;

        this.connectedOnce = false;
        this.failedAttempts = 0;

        this.verifiedConnection = false;
        
        this.connect();
    }

    private getUrl() {
        if (this.token != null) {
            return `ws://${this.host}:${this.port}/${this.name}/${this.token}`
        }
        else {
            return `ws://${this.host}:${this.port}/${this.name}`
        }    
    }

    private connect() {
        this.ws = new WebSocket(this.getUrl());

        this.ws.onerror = this.onerror.bind(this);
        this.ws.onclose = this.onclose.bind(this);
        this.ws.onmessage = this.onmessage.bind(this);
        this.ws.onopen = this.onopen.bind(this);

        this.verifiedConnection = false;
    }

    private onclose(ev: CloseEvent) {
        console.log("WS closed", ev);
        this.verifiedConnection = false;
        
        if (ev.code >= 4000 && ev.code < 4100) {
            // my error codes
            console.log("Connection failed due to:", ev.reason);
            this.onWebSockFailure(ev);
        }
        else if (this.connectedOnce) {
            if (this.failedAttempts > 5) {
                return;
            }

            setTimeout(() => {
                //newNotification('Reconnecting...');
                this.connect();
            }, 3000);
        }
    }

    private onerror(ev: Event) {
        console.log("WS errored", ev);
        this.verifiedConnection = false;

        this.failedAttempts += 1
        if (!this.connectedOnce) {
            this.onWebSockFailure(ev);
        }
    }

    private onmessage(ev: MessageEvent) {
        if (ev.data == "Hello") {
            console.log("Successful Echo, Server is alive!");
            this.verifiedConnection = true;
        }
        else {
            try {
                const obj = JSON.parse(ev.data);

                console.log("got msg:", obj);

                if ('token' in obj) {
                    const token: string = JsonParser.requireString(obj, 'token');
                    if (!this.token) {
                        // remember the token
                        console.log('Got token', token);
                        this.token = token;

                        const data: ConnectionData = {
                            token: this.token,
                            host: this.host,
                            port: this.port,
                            name: this.name
                        }

                        sessionStorage.setItem('connection', JSON.stringify(data));
                    }
                    return;
                }

                this.jsonMessageHandler(obj);

            } catch (e) {
                if (e.name == 'SyntaxError') {
                    console.log('Got invalid JSON')
                }
                else {
                    console.log('Error:', e)
                    console.log('Error data:', e.data)
                }
            }
        }
    }

    private onopen(ev: Event) {
        console.log("WS opened", ev);
        this.failedAttempts = 0;
        this.onWebSockOpen(ev);
        this.connectedOnce = true;

        this.ws.send('Hi');
        this.ws.send('history');
    }

    public setJsonMessageHandler(f:(ev: MessageEvent) => void) {
        this.jsonMessageHandler = f;
    }

        /**
     * The function handles the JSON.stringify
     * 
     * @param o An object to send.
     */
    public send(o: object) {
        const msg = JSON.stringify(o);
        if (this.ws) {
            this.ws.send(msg);
        }
        else {
            console.log('Disconnected');
        }
    }

    public getHistory() {
        if (this.ws) {
            this.ws.send('history');
        }
        else {
            console.log('Disconnected');
        }
    }
}