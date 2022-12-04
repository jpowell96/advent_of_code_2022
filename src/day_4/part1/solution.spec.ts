import {overlaps} from "./solution";

test("Array with no overlaps returns 0", () => {
    // Arrange: 
    const input = [[2,5], [5, 7]];

    // Act:
    const result = overlaps(input[0], input[1]);
    
    // Assert:
    expect(result).toBe(false);
});

test("Array with overlapping range returns 1", () => {
    const input = [[2,4], [2,3]];

    const result = overlaps(input[0], input[1]);

    expect(result).toBe(true);
});

test("Array with overlapping ranges out of sort order returns 1", () => {
    const input = [[2,4], [1-30]];

    const result = overlaps(input[0], input[1]);

    expect(result).toBe(false);
});