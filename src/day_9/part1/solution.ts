import { boolean } from "yargs";

const translateUp = (coordinates : number[]) => {
    let [x, y] = coordinates;
    return [x - 1, y];
};

const translateDown = (coordinates : number[]) => {
    let [x, y] = coordinates;
    return [x + 1, y];
};

const translateLeft = (coordinates : number[]) => {
    let [x, y] = coordinates;
    return [x, y - 1];
};

const translateRight = (coordinates: number[]) => {
    let [x, y] = coordinates;
    return [x, y + 1];
};

export const translationFunctions : {[direction: string] : (coordinates : number[]) => number[]} = {
    "U" : translateUp,
    "D" : translateDown,
    "L" : translateLeft,
    "R" : translateRight
}

export function applyCommandToHead(coordinate: number[], translationFunction: (coord: number[]) => number[]) : number[] {
    return translationFunction(coordinate);
}

export function applyCommandToChild(childCoordinate: number[], parentCoordinate: number[], command: RopeCommand) : number[] {
    // If parent and child overlap, don't do anything
    if (parentCoordinate[0] === childCoordinate[0] && parentCoordinate[1] === childCoordinate[1]) {
        return childCoordinate;
    } else {
        //Naively call the same translation function used on parent. Still need to figure out diagonals.
        return translationFunctions[command.direction](childCoordinate);
    }
}

export interface RopeCommand {
    direction: string,
    moves: number
}
export function runCommands(commands: RopeCommand[]) {
    const headHistory : number[][] = [];
    headHistory.push([0, 0]);
    const head = [0,0];
    const tail = [0,0];

    for (const command of commands) {
        const translationFunction = translationFunctions[command.direction];
        const newHeadPosition = translationFunction(head);
        headHistory.push(newHeadPosition);

        // Case: Overlap. If head overlaps tail, no update
        if (head[0] === tail[0] && head[1] === tail[1]) {
            continue;
        }

        // Case: If head is immediately adjacent no update
        if (isAdjacent(head, tail)) {
            continue;
        }
        // Case: If head is immediately adjacent within 2 space, move over in that direction

        // Case: If head is not adjacent within two spaces or diagonal, update to the spot two spaces ago in head history

    }
}

function isAdjacent(parent, child) : boolean {
    return false;
}
