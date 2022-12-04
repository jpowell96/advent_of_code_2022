import { overlaps } from "./solution";

describe("Overlap test cases", () => {
    test("two pairs sharing a single endpoint", () => {
        const left = [5,7];
        const right = [7, 9];

        const result = overlaps(left, right);

        expect(result).toBe(true);
    });

    test("two pairs where right is a subset of left", () => {
        const left = [2,8];
        const right = [3,7];

        const result = overlaps(left, right);

        expect(result).toBe(true);
    })

    test("two pars where right is a single point and a subset of left", () => {
        const left = [4,6];
        const right = [6,6];

        const result = overlaps(left, right);

        expect(result).toBe(true);
    });

    test("Two pairs that overlap", () => {
        const left = [2,6];
        const right = [4,8];

        expect(overlaps(left,right)).toBe(true);
    });

    test("Two pairs that do not overlap", () => {
        const left = [2,4];
        const right = [6,8];
        console.log(left[1] >= right[0]);
        console.log(left[1] >= right[1]);
        expect(overlaps(left, right)).toBe(false);
    })

});