import * as React from "react";
import { GameMap } from "./canvasCode/map/GameMap";
import { Hex } from "./canvasCode/graphics/Hex";

interface IProps {
    gm: GameMap,
    onClick: (e: React.MouseEvent) => void,
    onHover: (e: React.MouseEvent) => void
}

// interface IState {
//     x: number,
//     y: number,
// }

export class Canvas extends React.Component<IProps, {}> {

    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: IProps) {
        super(props);
        this.canvasRef = React.createRef();

        // this.state = {
        //     x: 0,
        //     y: 0
        // }
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        if (!canvas) {
            throw Error("this shouldn't happen, canvasRef not set")
        }

        this.makeHiDPICanvas(canvas);
        this.componentDidUpdate();
    }
    
    componentDidUpdate() {
        //console.log('update');
        const canvas = this.canvasRef.current;
        if (!canvas) {
            throw Error("this shouldn't happen, canvasRef not set")
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw Error("getContext('2d') failed");
        }
        // implement draw on ctx here

        ctx.fillStyle = '#8395c1'; // background color is set here!
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        this.props.gm.draw(ctx);

        // ctx.beginPath();
        // ctx.arc(this.state.x, this.state.y, 10, 0, 6.28);
        // ctx.fill();
    }


    // onClick(e: React.MouseEvent) {
    //     // the on-click
        
    //     this.setState({
    //         x: e.clientX,
    //         y: e.clientY
    //     });

    //     console.log(e.clientX, e.clientY);
    // }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                onClick={this.props.onClick}
                onMouseMove={this.props.onHover}
            />
        )
    }

    private makeHiDPICanvas(canvas: HTMLCanvasElement) {
        // https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
        const w = window.innerWidth;
        const h = window.innerHeight
    
        const ctx: CanvasRenderingContext2D = function() {
            const tmp = canvas.getContext("2d");
            if (tmp == null) {
                throw "CanvasRenderingContext2D is null";
            }
            return tmp;
        }();
    
        const ratio = window.devicePixelRatio || 1;
    
        canvas.width = w * ratio;
        canvas.height = h * ratio;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    
        return canvas;
    }
}