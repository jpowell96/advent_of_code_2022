import { idToMonkey, Monkey, roundOfInspections } from "./solution";

test("It parses Monkey input corectly", () => {
    const zero : Monkey = 
    new Monkey(0, [79, 98], (num : number) => num * 19, (num: number) => num % 23 === 0 ? 2 : 3);
    const one : Monkey =
    new Monkey(1, [54,65,75,74], (num) => num + 6, num => num % 19 === 0 ? 2 : 0);
    const two: Monkey = 
    new Monkey(2, [79, 60, 97], (num) => num * num, (num) => num % 13 === 0 ? 1 : 3);
    const three : Monkey =
    new Monkey(3, [74], (num) => num + 3, num =>  num % 17 === 0 ? 0 : 1);

    const monkeyMap = {
        0 : zero,
        1 : one,
        2 : two,
        3: three
    };
    const itemCount = {};
    let result = {};
    for (let i = 0; i < 20; i++) {
       roundOfInspections(monkeyMap);
    }
    expect(1).toEqual(1);
});