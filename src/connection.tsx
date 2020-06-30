import { JsonParser, JsonMessage } from "./jsonParser";

interface ConnectionData {
    name: string,
    host: string,
    port: number,
    token: string,
    color: string
}

function connectionDataFromJson(o: object): ConnectionData {
    return {
        name: JsonParser.requireString(o, 'name'),
        host: JsonParser.requireString(o, 'host'),
        port: JsonParser.requireNumber(o, 'port'),
        token: JsonParser.requireString(o, 'token'),
        color: JsonParser.requireString(o, 'color')
    }
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
    private color: string;

    private onWebSockFailure: (ev: Event) => void;
    private onWebSockOpen: (ev: Event) => void;

    private jsonMessageHandler: (obj: MessageEvent) => void;

    private connectedOnce: boolean;

    constructor(host: string, port: number, name: string, color: string, onWebSockFailure: (ev: Event) => void, onWebSockOpen: (ev: Event) => void, token?: string) {

        this.host = encodeURIComponent(host);
        this.name = encodeURIComponent(name);
        this.color = encodeURIComponent(color);
        if (port.toString() == 'NaN') {
            throw Error("yeet the port"); 
        }
        this.port = port;  
        
        this.onWebSockFailure = onWebSockFailure;
        this.onWebSockOpen = onWebSockOpen;

        this.connectedOnce = false;
        this.failedAttempts = 0;

        this.verifiedConnection = false;

        this.jsonMessageHandler = (a: any) => { throw Error("jsonMessageHandler not set"); };
        this.ws = null;
        this.token = null;

        if (token) {
            this.token = token;
        }
        
        this.connect();
    }

    /**
     * 
     * @param onWebSockFailure a callback for handling errors
     * @param onWebSockOpen a callback for handling a successful connection
     * 
     * @returns a Connection object if connection data is found in sessionStorage, else null
     */
    static regainOldConnectionIfExists(onWebSockFailure: (ev: Event) => void, onWebSockOpen: (ev: Event) => void): Connection | null {
        const result = sessionStorage.getItem('connection');
        if (result) {
            const dat = connectionDataFromJson(JSON.parse(result)); // json parsing shouldn't fail
            return new Connection(dat.host, dat.port, dat.name, dat.color, onWebSockFailure, onWebSockOpen, dat.token);
        }
        else {
            return null;
        }
    }

    getName() {
        return this.name;
    }

    private getUrl() {
        if (this.token != null) {
            return `ws://${this.host}:${this.port}/${this.name}/${this.token}/${this.color}`
        }
        else {
            return `ws://${this.host}:${this.port}/${this.name}/${this.color}`
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

                //console.log("got msg:", obj);

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
                            name: this.name,
                            color: this.color
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
                    console.log('Error:', e);
                    console.log('Error data:', e.data);
                    throw(e);
                }
            }
        }
    }

    private onopen(ev: Event) {
        console.log("WS opened", ev);
        this.failedAttempts = 0;
        this.onWebSockOpen(ev);
        this.connectedOnce = true;

        if (this.ws) {
            this.ws.send('Hi');
            this.ws.send('history');
        }
        else {
            throw Error('this shouldn\'t happen');
        }
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

    public sendMessage(type: string, content: string, args: Array<any>) {
        this.send(JsonMessage(type, content, args));
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