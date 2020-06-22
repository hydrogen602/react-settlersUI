import * as React from "react";

interface IState {
    x: number,
    y: number
}

export class Canvas extends React.Component<{}, IState> {

    private canvasRef: React.MutableRefObject<any>; // type ?

    constructor(props: {}) {
        super(props);
        this.canvasRef = React.createRef();

        this.state = {
            x: 0,
            y: 0
        }
    }

    componentDidMount() {
        this.componentDidUpdate();
    }
    
    componentDidUpdate() {
        console.log('update');
        const canvas = this.canvasRef.current;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        // implement draw on ctx here
        ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);

        ctx.beginPath();
        ctx.arc(this.state.x, this.state.y, 10, 0, 6.28);
        ctx.fill();
    }


    onClick(e: MouseEvent) {
        
        this.setState({
            x: e.clientX,
            y: e.clientY
        });

        console.log(e.clientX, e.clientY);
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onClick={this.onClick.bind(this)}
            />
        )
    }
}