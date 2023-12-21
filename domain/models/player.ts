import { PlayerPosition } from "./playerPosition";
import uuid from "react-native-uuid";

export class Player {
    id: string = uuid.v4().toString();
    name: string;
    position: PlayerPosition;

    constructor(name: string, position: PlayerPosition) {
        this.name = name;
        this.position = position;
    }
}