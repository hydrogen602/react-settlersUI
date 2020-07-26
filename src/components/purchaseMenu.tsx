import * as React from "react";

interface IProps {
    cancelFunc: () => void,
    sendMessage: (type: string, content: string, args?: Array<any>) => void,
};

export function PurchaseMenu(props: IProps) {

    const [hasBoughtStuff, setHasBoughtStuff] = React.useState(false);

    function purchase(content: string) {
        props.sendMessage("purchase", content);
        setHasBoughtStuff(true);
    }

    return (
        <div className="window purchaseMenu center">
            <h3>Purchase Menu</h3>
            <table>
                <tbody>
                    <tr onClick={() => purchase('road')}>
                        <td>Road</td>
                        <td>Lumber:&nbsp;1, Brick:&nbsp;1</td>
                    </tr>
                    <tr onClick={() => purchase('settlement')}>
                        <td>Settlement</td>
                        <td>Wheat:&nbsp;1, Sheepie:&nbsp;1, Lumber:&nbsp;1, Brick:&nbsp;1</td>
                    </tr>
                    <tr onClick={() => purchase('city')}>
                        <td>City</td>
                        <td>Wheat:&nbsp;2, Ore:&nbsp;3</td>
                    </tr>
                </tbody>
            </table>
            <button className="button" onClick={props.cancelFunc}>{hasBoughtStuff ? "Done" : "Cancel" }</button>
        </div>
    );
}