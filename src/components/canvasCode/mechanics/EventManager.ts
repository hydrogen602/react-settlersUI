import { AbsPoint, RelPoint } from "../graphics/Point";
import { square } from "../util";
import { Hex } from "../graphics/Hex";
import { Settlement } from "../map/Settlement";
import { Road } from "../map/Road";
import { Tile } from "../map/Tile";

// export class EventManager {

//     private constructor() {}

    

//     static mouseHoverHandler(e: MouseEvent) {
//     }

//     static mouseHandler(e: MouseEvent) {
//         const p = new RelPoint(e.clientX, e.clientY);
//         const r = EventManager.distanceFromNearestHexCorner(p);
//         const m = GameManager.instance.getMap();

//         if (GameManager.instance.mayPlaceRobber) {
//             const tile = m.getAllowedRobberPlace(p.toAbsPoint());
//             // if (tile != undefined) {
//             //     const tileExists = <Tile>tile;
//             //     GameManager.instance.moveRobber(tileExists);
//             //     GameManager.instance.draw();
//             //     GameManager.instance.mayPlaceRobber = false;
//             // }
//             // else {
//             //     GameManager.instance.draw();
//             // }
//         }
//         else if (GameManager.instance.mayPlaceSettlement) {            
            
//             if (r < Hex.getSideLength() / 4) {
//                 // clicked on a corner
//                 const h = p.toHexPoint();
//                 //console.log("new settlement");

//                 // if (m.isAllowedSettlement(h)) {
//                 //     m.addSettlement(new Settlement(h, GameManager.instance.getSelf()));

//                 //     GameManager.instance.draw();
//                 //     //console.log("success");
//                 //     GameManager.instance.print("New Settlement created");
//                 //     GameManager.instance.mayPlaceSettlement = false;
//                 // }
//                 // else {
//                 //     // console.log("not allowed position");
//                 //     GameManager.instance.printErr("Illegal Position");
//                 // }
//             }
//         }
//         else if (GameManager.instance.mayPlaceCity) {
//             // strokeCity
//             if (r < Hex.getSideLength() / 3.5) {
//                 const h = p.toHexPoint();

//                 if (m.isAllowedCity(h)) {
//                     m.addCity(h);
//                     GameManager.instance.draw();
//                     GameManager.instance.print("New City created");
//                     GameManager.instance.mayPlaceCity = false;
//                 }
//                 else {
//                     // console.log("not allowed position");
//                     GameManager.instance.printErr("Illegal Position");
//                 }
//             }
//         }
//         else if (GameManager.instance.mayPlaceRoad) {
//             const hArr = p.toDualHexPoint();            
//             if (hArr.length == 2) { // hArr is empty if not over a line 
//                 // if (m.isAllowedRoad(hArr[0], hArr[1])) { // check if road already there
//                 //     m.addRoad(new Road(hArr[0], hArr[1], GameManager.instance.getSelf()));
//                 //     GameManager.instance.draw();
//                 //     GameManager.instance.print("New Road created");
//                 //     GameManager.instance.mayPlaceRoad = false;
//                 // }
//                 // else {
//                 //     GameManager.instance.printErr("Illegal Position");
//                 // }
//             }
//         }
//     }

//     static purchaseRoad() {
//         ConnectionManager.instance.send({'action': 'purchase', 'name': 'road'})
//         //GameManager.instance.purchaseRoad();
//     }

//     static purchaseSettlement() {
//         ConnectionManager.instance.send({'action': 'purchase', 'name': 'settlement'})
//         //GameManager.instance.purchaseSettlement();
//     }

//     static purchaseCity() {
//         ConnectionManager.instance.send({'action': 'purchase', 'name': 'city'})
//         //GameManager.instance.purchaseCity();
//     }


// }