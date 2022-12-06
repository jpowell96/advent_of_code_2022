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

test("It moves the the crates to the next column", () => {
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
    expect(cargoShip[2].length).toEqual(1);
    expect(cargoShip[2]).toBe(["B", "C"]);
});