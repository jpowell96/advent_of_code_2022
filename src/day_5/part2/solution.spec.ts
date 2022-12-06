import { CargoCraneCommand, CargoShip, executeCommand } from './solution';


test("It parses the lines", () => {
    const testCommand = "move 3 from 8 to 9";
    const splitOnSpaces = testCommand.split(" ");
    const numOfCratesToMove = Number.parseInt(splitOnSpaces[1]);
    const fromColumn = Number.parseInt(splitOnSpaces[3]);
    const toColumn = Number.parseInt(splitOnSpaces[5]);

    const command : CargoCraneCommand = {
        to: toColumn,
        from: fromColumn,
        numberOfCratesToMove : numOfCratesToMove
    }
    expect(command.numberOfCratesToMove).toBe(3);
    expect(command.to).toBe(9);
    expect(command.from).toBe(8);
});

test("It moves one crate", () => {
    const cargoShip: CargoShip = {
        1: ["A", "B", "C"],
        2: []
    }

    const command : CargoCraneCommand = {
        to: 2,
        from: 1,
        numberOfCratesToMove: 1
    }

    executeCommand(command, cargoShip);
    expect(cargoShip).toEqual({
        1 : ["A", "B"],
        2 : ["C"]
    });
});

test("It moves multiple crates to the next column", () => {
    const cargoShip: CargoShip = {
        1: ["A", "B", "C"],
        2: []
    }

    const command : CargoCraneCommand = {
        to: 2,
        from: 1,
        numberOfCratesToMove: 2
    }

    executeCommand(command, cargoShip);
    expect(cargoShip).toEqual({
        1 : ["A"],
        2 : ["B", "C"]
    });
});

test("Sample Input", () => {
//     [D]    
// [N] [C]    
// [Z] [M] [P]
//  1   2   3 

// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2

const cargoShip: CargoShip = {
    1: ["Z", "N",],
    2: ["M", "C", "D"],
    3: ["P"]
}

    const commands : CargoCraneCommand[] = [
        {
            from: 2,
            to: 1,
            numberOfCratesToMove: 1
        }, 
        {
            numberOfCratesToMove: 3,
            from: 1,
            to: 3
        },
        {
            numberOfCratesToMove: 2,
            from: 2,
            to: 1
        },
        {
            numberOfCratesToMove: 1,
            from: 1,
            to: 2
        }
    ];

    for (const command of commands) {
        executeCommand(command, cargoShip);
    }

    expect(cargoShip).toEqual({
        1 : ["Z", "N", "D"],
        2 : ["M", "C"],
        3: ["P"]
    });

});