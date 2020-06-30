import * as React from "react";
import { Inventory } from "../canvasCode/mechanics/Inventory";

interface IProps {
    inv: Inventory | null
}

interface IState {
    selectedLinePurchased: number | null,
    selectedPointPurchased: number | null,
}

export class InventoryDisplay extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            selectedLinePurchased: null,
            selectedPointPurchased: null
        }
    }

    private onClickPurchasedPoint(index: number, ev: React.MouseEvent) {
        this.setState({
            selectedPointPurchased: index,
            selectedLinePurchased: null
        });
    }

    private onClickPurchasedLine(index: number, ev: React.MouseEvent) {
        this.setState({
            selectedLinePurchased: index,
            selectedPointPurchased: null
        });
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

        const anyPurchased = this.props.inv.getLineFeatures().length > 0 || this.props.inv.getPointFeatures().length > 0;

        return (
            <div>
                <div className="window inventory">{tmp.join('; ')}</div>
                { anyPurchased ? <div className="window inventory2">
                    <h3>Purchased:</h3>
                    <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: '0.5em'}}>
                        {this.props.inv.getPointFeatures().map((value, index) => {
                            return (
                            <button key={index} onClick={(ev) => this.onClickPurchasedPoint(index, ev)}>
                                {value.isCity() ? <i className="fas fa-city"></i> : <i className="fas fa-home"></i>}
                            </button>
                            );
                        })}
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {this.props.inv.getLineFeatures().map((value, index) => {
                            return (
                            <button key={index} onClick={(ev) => this.onClickPurchasedLine(index, ev)}>
                                <i className="fas fa-road"></i>
                            </button>
                            );
                        })}
                    </div>
                </div> : null }
            </div>
        );
    }
}
