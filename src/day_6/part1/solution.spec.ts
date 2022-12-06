import exp from "constants";
import { firstFourUniqueCharacters } from "./solution";

test("it returns -1 if String not long enough", () => {
    const input = "abc";
    const result = firstFourUniqueCharacters(input);

    expect(result).toEqual(-1);
});

test("Does it work", () => {
    const example = "bvwbjplbgvbhsrlpgdmjqwftvncz";
    const result = firstFourUniqueCharacters(example);
    expect(result).toEqual(5);
});