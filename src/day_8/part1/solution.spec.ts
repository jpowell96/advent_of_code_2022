import { countVisibleTrees, isVisibleInColumn, isVisibleInRow } from "./solution";

test("it counts the tree correctly", () => {
    const forest = [
        [3,0,3,7,3],
        [2,5,5,1,2],
        [6,5,3,3,2],
        [3,3,5,4,9],
        [3,5,3,9,0]
    ];

    const expectedVisibleTrees = 21;
    const result = countVisibleTrees(forest);

    expect(result).toEqual(expectedVisibleTrees);
});

test("it is not visible from the left or right", () => {
    const row = 1;
    const column = 3;

    const forest = [
        [3,0,3,7,3],
        [2,5,5,1,2],
        [6,5,3,3,2],
        [3,3,5,4,9],
        [3,5,3,9,0]
    ];
    
    const rowVisible = isVisibleInRow(row, column, forest);
    const columnVisible = isVisibleInColumn(row, column, forest);

    expect(rowVisible).toEqual(false);
    expect(columnVisible).toEqual(false);

});