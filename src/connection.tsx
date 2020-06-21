
export class Connection {

    private ws: WebSocket | null;

    private token: string | null;

    private failedAttempts: number;

    private name: string;
    private host: string;
    private port: number;

    private onWebSockFailure: (ev: Event) => void;
    private onWebSockOpen: (ev: Event) => void;

    constructor(host: string, port: number, name: string, onWebSockFailure: (ev: Event) => void, onWebSockOpen: (ev: Event) => void) {

        this.host = encodeURIComponent(host);
        this.name = encodeURIComponent(name);
        if (port.toString() == 'NaN') {
            throw Error("yeet the port"); 
        }
        this.port = port;  
        
        this.onWebSockFailure = onWebSockFailure;
        this.onWebSockOpen = onWebSockOpen;
        
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
    }

    private onclose(ev: CloseEvent) {
        console.log("WS closed", ev);
    }

    private onerror(ev: Event) {
        console.log("WS errored", ev);
        this.onWebSockFailure(ev);
    }

    private onmessage(ev: MessageEvent) {
        console.log("WS message", ev);
    }

    private onopen(ev: Event) {
        console.log("WS opened", ev);
        this.onWebSockOpen(ev);
    }
}