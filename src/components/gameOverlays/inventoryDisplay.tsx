import * as React from "react";
import { Inventory } from "../canvasCode/mechanics/Inventory";

interface IProps {
    inv: Inventory | null
}

interface IState {
    selectedPurchased: number | null
}

export class InventoryDisplay extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            selectedPurchased: null
        }
    }

    render() {
        if (!this.props.inv) {
            return <div className="window inventory">Inventory</div>
        }

        const tmp: Array<string> = [];

        for (const resourceName of this.props.inv.keys()) {
            if (resourceName == 'NoResource') {
                continue;
            }
            tmp.push(`${resourceName}: ${this.props.inv.get(resourceName)}`);
        }

        return (
            <div className="window inventory">{tmp.join('; ')}</div>
        );
    }
}
