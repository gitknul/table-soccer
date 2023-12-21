import { Player } from "./player";
import uuid from 'react-native-uuid';

export class Team {
    id: string = uuid.v4().toString();
    players: Player[] = [];
}