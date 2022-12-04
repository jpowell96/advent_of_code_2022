
const fs = require("fs");

class AssignmentPair {
    readonly left : number[];
    readonly right: number[];

    constructor(input: String) {
        // 1. Split on comma to get left / right
        // ["2-4"], ["6-8"]

        const [left, right] = input.split(",");
        
        const leftAssignment = left.split("-");
        this.left = [Number.parseInt(leftAssignment[0]), Number.parseInt(leftAssignment[1])];
        
        const rightAssignment = right.split("-");
    
        this.right = [Number.parseInt(rightAssignment[0]), Number.parseInt(rightAssignment[1])];
    }

}

// Returns true if a overlaps b (left.0 <= right.0 && left.1 >= right.1)
// [6,8], [2,4]
// 6 <= 2 && 8 >= 2
// 6 <= 2 &&  8 >= 4

// [2, 4] [6,8]


export function overlaps(left: number[], right: number[]) : boolean {
    if (left[0] > right[0] && left[1] > right[1]) {
        return false;
    }
    // Case where left partially overlaps with right: [[2 , 5], [4,6]]
    return (left[0] <= right[0] && left[1] >= right[0]) || 
    // Case where right is a subset of left at the end point: [[2, 5] , [4,5]]
    // 2 <= 4 && 5 >= 5
    (left[0] <= right[0] && left[1] >= right[1]);
   
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