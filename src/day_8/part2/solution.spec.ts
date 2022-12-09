import { calculateScenicScore } from "./solution";

test("it does it", () => {
    const forest = [
        [3,0,3,7,3],
        [2,5,5,1,2],
        [6,5,3,3,2],
        [3,3,5,4,9],
        [3,5,3,9,0]
    ];

    const maxSceneScore = 8;
    const result = calculateScenicScore(forest);

    expect(Math.max(...result.flatMap(x => x))).toEqual(maxSceneScore);
});