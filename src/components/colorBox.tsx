import * as React from "react";

const colors: Map<string, Array<string>> = new Map([
    ['red', [
        "lightsalmon",
        "salmon",
        "darksalmon",
        "lightcoral",
        "indianred",
        "crimson",
        "firebrick",
        "red",
        "darkred"
    ]],
    ['orange', [
        "coral",
        "tomato",
        "orangered",
        "gold",
        "orange",
        "darkorange"
    ]],
    ['yellow', [
        "lightyellow",
        "lemonchiffon",
        "lightgoldenrodyellow",
        "papayawhip",
        "moccasin",
        "peachpuff",
        "palegoldenrod",
        "khaki",
        "darkkhaki",
        "yellow"
    ]],
    ['green', [
        "lawngreen",
        "chartreuse",
        "limegreen",
        "lime",
        "forestgreen",
        "green",
        "darkgreen",
        "greenyellow",
        "yellowgreen",
        "springgreen",
        "mediumspringgreen",
        "lightgreen",
        "palegreen",
        "darkseagreen",
        "mediumseagreen",
        "seagreen",
        "olive",
        "darkolivegreen",
        "olivedrab"
    ]],
    ['cyan', [
        "lightcyan",
        "cyan",
        "aqua",
        "aquamarine",
        "mediumaquamarine",
        "paleturquoise",
        "turquoise",
        "mediumturquoise",
        "darkturquoise",
        "lightseagreen",
        "cadetblue",
        "darkcyan",
        "teal"
    ]],
    ['blue', [
        "powderblue",
        "lightblue",
        "lightskyblue",
        "skyblue",
        "deepskyblue",
        "lightsteelblue",
        "dodgerblue",
        "cornflowerblue",
        "steelblue",
        "royalblue",
        "blue",
        "mediumblue",
        "darkblue",
        "navy",
        "midnightblue",
        "mediumslateblue",
        "slateblue",
        "darkslateblue"
    ]],
    ['purple', [
        "lavender",
        "thistle",
        "plum",
        "violet",
        "orchid",
        "fuchsia",
        "magenta",
        "mediumorchid",
        "mediumpurple",
        "blueviolet",
        "darkviolet",
        "darkorchid",
        "darkmagenta",
        "purple",
        "indigo"
    ]],
    ['pink', [
        "pink",
        "lightpink",
        "hotpink",
        "deeppink",
        "palevioletred",
        "mediumvioletred"
    ]],
    ['white', [
        "white",
        "snow",
        "honeydew",
        "mintcream",
        "azure",
        "aliceblue",
        "ghostwhite",
        "whitesmoke",
        "seashell",
        "beige",
        "oldlace",
        "floralwhite",
        "ivory",
        "antiquewhite",
        "linen",
        "lavenderblush",
        "mistyrose"
    ]],
    ['gray', [
        "gainsboro",
        "lightgray",
        "silver",
        "darkgray",
        "gray",
        "dimgray",
        "lightslategray",
        "slategray",
        "darkslategray",
        "black"
    ]],
    ['brown', [
        "cornsilk",
        "blanchedalmond",
        "bisque",
        "navajowhite",
        "wheat",
        "burlywood",
        "tan",
        "rosybrown",
        "sandybrown",
        "goldenrod",
        "peru",
        "chocolate",
        "saddlebrown",
        "sienna",
        "brown",
        "maroon"
    ]]
]);

interface IProps {
    onClick: (color: string, ev: React.MouseEvent) => void
}

export function ColorBox(props: IProps) {

    const items: Array<JSX.Element> = [];

    for (const [familyName, familyColors] of colors.entries()) {
        const len = items.length;
        items.push(
        <div style={{display: 'block', width: '30%'}} key={len}>
            <h3>{familyName}</h3>
            <div className="colorBoxSubBox">
                {familyColors.map((value, index) => {
                    return <button key={index} onClick={(ev) => props.onClick(value, ev)} style={{backgroundColor: value}}></button>
                })}
            </div>
        </div>
        );
    }

    return (
        <div className="window colorBox center">
            <div className="colorBoxCollection">
                {items}
            </div>
        </div>
    );
}