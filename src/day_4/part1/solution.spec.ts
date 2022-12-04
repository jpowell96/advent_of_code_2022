import {countOverlappingPairs} from "./solution";


test("Array with no overlaps returns 0", () => {
    // Arrange: 
    const input = [[2,5], [5, 7]];

    // Act:
    const result = countOverlappingPairs(input);
    
    // Assert:
    expect(result).toBe(0);
});

test("Array with overlapping range returns 1", () => {
    const input = [[2,4], [2-3]];

    const result = countOverlappingPairs(input);

    expect(result).toBe(1);
});

test("Array with overlapping ranges out of sort order returns 1", () => {
    const input = [[2,4], [1-30]];

    const result = countOverlappingPairs(input);

    expect(result).toBe(1);
});