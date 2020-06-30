import * as React from "react";
import { Inventory } from "../canvasCode/mechanics/Inventory";

interface IProps {
    inv: Inventory | null,
    onClickPurchasedPoint: (index: number, ev: React.MouseEvent) => void,
    onClickPurchasedLine: (index: number, ev: React.MouseEvent) => void,
}

// interface IState {
//     selectedLinePurchased: number | null,
//     selectedPointPurchased: number | null,
// }

// export class InventoryDisplay extends React.Component<IProps, IState> {

//     constructor(props: IProps) {
//         super(props);

//         this.state = {
//             selectedLinePurchased: null,
//             selectedPointPurchased: null
//         }
//     }

//     render() {

export function InventoryDisplay(props: IProps) {
    if (!props.inv) {
        return <div className="window inventory">Inventory</div>
    }

    const tmp: Array<string> = [];

    for (const resourceName of props.inv.keys()) {
        if (resourceName == 'NoResource') {
            continue;
        }
        tmp.push(`${resourceName}: ${props.inv.get(resourceName)}`);
    }

    const anyPurchased = props.inv.getLineFeatures().length > 0 || props.inv.getPointFeatures().length > 0;

    return (
        <div>
            <div className="window inventory">{tmp.join('; ')}</div>
            { anyPurchased ? <div className="window inventory2">
                <h3>Purchased:</h3>
                <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: '0.5em'}}>
                    {props.inv.getPointFeatures().map((value, index) => {
                        return (
                        <button key={index} onClick={(ev) => props.onClickPurchasedPoint(index, ev)}>
                            {value.isCity() ? <i className="fas fa-city"></i> : <i className="fas fa-home"></i>}
                        </button>
                        );
                    })}
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {props.inv.getLineFeatures().map((value, index) => {
                        return (
                        <button key={index} onClick={(ev) => props.onClickPurchasedLine(index, ev)}>
                            <i className="fas fa-road"></i>
                        </button>
                        );
                    })}
                </div>
            </div> : null }
        </div>
    );
}
