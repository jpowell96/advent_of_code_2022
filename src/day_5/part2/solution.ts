const fs = require('fs');




// Helper functions + types to complete the question
type Column = number;
export interface CargoCraneCommand {
    to: Column,
    from: Column,
    numberOfCratesToMove: number;
}

export type CargoShip =  {[column : number] : String[]};
const cargo : {[column : number] : String[]}= {
    1 : ["P", "F", "M", "Q", "W", "G", "R", "T"],
    2 : ["R", "F", "H"],
    3 : ["P", "Z", "R", "V", "G", "H", "S", "D"],
    4 : ["Q", "H", "P", "B", "F", "W", "G"],
    5 : ["P", "S", "M", "J", "H"],
    6 : ["M", "Z", "T", "H", "S", "R", "P", "L"],
    7 : ["P", "T", "H", "N", "M", "L"],
    8 : ["F", "D", "Q", "R"],
    9 : ["D", "S", "C", "N", "L", "P", "H"]
};

export function fromInputString(commandInWords: string) : CargoCraneCommand {
    const splitOnSpaces = commandInWords.split(" ");
    const numOfCratesToMove = Number.parseInt(splitOnSpaces[1]);
    const fromColumn = Number.parseInt(splitOnSpaces[3]);
    const toColumn = Number.parseInt(splitOnSpaces[5]);

    const command : CargoCraneCommand = {
        to: toColumn,
        from: fromColumn,
        numberOfCratesToMove : numOfCratesToMove
    }
    return command;
}

export function executeCommand(command: CargoCraneCommand, ship: CargoShip) : void {
   handleMultipleCrates(command, ship);
}

function handleMultipleCrates(command: CargoCraneCommand, ship: CargoShip) : void {
    const fromColumn : String[] = ship[command.from];
    const toColumn : String[] = ship[command.to];

    const craneArm : String[] = [];

    // Crane Arm to pick up the crates, preserving order
    for (let i = 0; i < command.numberOfCratesToMove; i++) {
        const crate = fromColumn.pop();
        if (crate) {
            craneArm.push(crate)
        }
    }

    // Crane Arm to place the crates down
    for (let i = 0; i < craneArm.length; i++) {
        const crateFromCraneArm = craneArm.pop();

        if (crateFromCraneArm) {
            toColumn.push(crateFromCraneArm);
        }
    }
}

// Question solution
fs.readFile("input.txt", "utf-8", function read(err, data) {
    if (err) {
        throw err;
    }
    const commands : string[] = data.split("\n");

    commands.map(command => fromInputString(command))
    .forEach(command => {
        executeCommand(command, cargo);
    });

    console.log(cargo);
})