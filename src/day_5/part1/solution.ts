import { open, FileHandle } from 'node:fs/promises';



async function handleCommands() : Promise<void> {
    let filehandle : FileHandle | undefined;
    try {
        filehandle = await open('input.txt', 'r');
    } finally {
    await filehandle?.close();
    }
}

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
    const fromColumn : String[] = ship[command.from];
    const toColumn : String[] = ship[command.to];
    for (let i = 0; i < command.numberOfCratesToMove; i++) {
            const popped = fromColumn.pop();
           if (popped) {
            toColumn.push(popped);
           }
        
    }
}

handleCommands();