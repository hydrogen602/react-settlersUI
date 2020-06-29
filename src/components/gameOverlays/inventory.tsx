import * as React from "react";
import { Inventory } from "../canvasCode/mechanics/Inventory";

interface IProps {
    inv: Inventory
}

interface IState {
    selectedPurchased: number | null
}

export class Game extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            selectedPurchased: null
        }
    }

    render() {
        let s = ''
        


        return (
            <div className="window inventory"></div>
        );
    }
}
