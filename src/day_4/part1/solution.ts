// Question to answer: In how many assignment pairs does one range fully contain the other?
const fs = require("fs");

class AssignmentPair {
    readonly left : number[];
    readonly right: number[];

    constructor(input: String) {
        // 1. Split on comma to get left / right
        // ["2-4","6-8"]

        const [left, right] = input.split(",");
        
        const leftAssignment = left.split("-");
        this.left = [Number.parseInt(leftAssignment[0]), Number.parseInt(leftAssignment[1])];
        
        const rightAssignment = right.split("-");
    
        this.right = [Number.parseInt(rightAssignment[0]), Number.parseInt(rightAssignment[1])];
    }

}

try {
   const data = fs.readFileSync('../input.txt', 'utf8');
   const assignmentPairs : String[] = data.split("\n");
   const numberOfOverlaps = assignmentPairs
    .map(assignmentPair => new AssignmentPair(assignmentPair))
    .map(pair => overlaps(pair.left, pair.right) || overlaps(pair.right, pair.left))
    .filter(doesOverlap => doesOverlap)
    .length;

    console.log("We have %d overlaps", numberOfOverlaps);

  } catch (err) {
    console.error(err);
  }

// Returns true if a overlaps b (left.0 <= right.0 && left.1 >= right.1)
export function overlaps(left: number[], right: number[]) : boolean {
    return left[0] <= right[0] && left[1] >= right[1];
}