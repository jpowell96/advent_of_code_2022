export class Monkey {
    readonly id: number;
    items : number[];
    readonly stressFunction : (old: number) => number;
    // Given an item, returns which monkey to throw the item to
    readonly test: (itemNumber: number) => number;
    inspectionCount: number = 0;

    constructor(id: number, items: number[], stressFunction: (old: number) => number, test: (itemNumber: number) => number) {
        this.id = id;
        this.items = items;
        this.stressFunction = stressFunction;
        this.test = test;
    }

    /** For each item in items, inspect the item - applying the stressFunction */
    public inspect() : void {
        this.items = this.items.map(this.stressFunction);
        this.inspectionCount += this.items.length;
    }

    public toss(monkeys: {[id: number] : Monkey}) : void {
        // For each item, divide by 3. Then call test to decide who it goes to.
        this.items = this.items.map(num => Math.floor(num / 3));
        while (this.items.length > 0) {
            const item = this.items.shift() as number;
            const next = this.test(item);
            monkeys[next].items.push(item);
        }
    }
}

const zero: Monkey = new Monkey(0, [56,56,92,65,71,61,79], (num) => num * 7, (num) => num % 3 === 0 ? 3 : 7);
const prime: Monkey = new Monkey(1, [61,85], (num) => num + 5, (num) => num % 11 ? 6 : 4);
const duo: Monkey = new Monkey(2, [54,96,82,78,69], (num) => num * num, (num) => num % 7 === 0 ? 0 : 7);
const san: Monkey = new Monkey(3, [57,59,65,95], (num) => num + 4, (num) => num % 2 === 0 ? 5 : 1);
const corto: Monkey = new Monkey(4, [62, 67, 80], (num) => num * 17, (num) => num % 19 === 0 ? 2 : 6);
const quintin: Monkey = new Monkey(5, [91], (num) => num + 7, (num) => num % 5 === 0 ? 1 : 4 );
const sexto: Monkey = new Monkey(6, [79,83,64,52,77,56,63,92], (num) => num + 6, (num) => num % 17 === 0 ? 2 : 0);
const septo: Monkey = new Monkey(7, [50,97,76,96,80,56], (num) => num + 3, (num) => num % 13 === 0 ? 3 : 5);

export const idToMonkey: {[id: number] : Monkey} = {
    0 : zero,
    1 : prime,
    2 : duo,
    3 : san,
    4 : corto,
    5 : quintin,
    6: sexto,
    7 : septo

};

export function roundOfInspections(monkeys: {[id: number] : Monkey}) : void {
    for (const key in monkeys) {
        const monkey : Monkey = monkeys[key];
        // 1. Inspect items
        monkey.inspect();
        // 2. Toss items to the next people
        monkey.toss(monkeys);
    }
}

for (let i = 0; i < 20; i++) {
    roundOfInspections(idToMonkey);
}

const monkeys : Monkey[] = Object.values(idToMonkey);
monkeys.sort((a, b) => b.inspectionCount - a.inspectionCount);
console.log(monkeys);
console.log(monkeys[0].inspectionCount * monkeys[1].inspectionCount);
