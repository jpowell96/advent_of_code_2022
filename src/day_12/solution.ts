// Do a Breadth First Search from 'S' to 'E'. Keep track of the path for backtracking
import { FileHandle, open } from "fs/promises";
// 1. Read in the file for the elevation map


// 2. Find the start point. The character that's a capital S. Returns the paths from start to end
export interface Point {
    x: number,
    y: number,
}

function asString(point: Point) {
    return "" + point.x + "," + point.y;
}

export function breadthFirstSearch(graph: string[], start: Point, end: Point) : Point[] {
    const queue = [];
    const visited : any = [];
    visited[asString(start)] = true;
    queue.push(start);

    const cameFrom : Map<Point, Point | undefined> = new Map();
    cameFrom.set(start, undefined);

    while (queue.length > 0) {
        let current: Point = queue.shift() as Point;

        // If we reach the end point, build + return the path
        if (current.x === end.x && current.y === end.y) {
            const path : Point[] = [];
            path.unshift(current);

            while (cameFrom.get(current)) {
                path.unshift(cameFrom.get(current) as Point);
                current = cameFrom.get(current) as Point;
            }
            return path;
        }

        // Get your neighbors
        const neighbors: Point[] = getNeighbors(current, graph);
        for (const neighbor of neighbors) {
            if (isInBounds(neighbor, graph) &&
            !visited[asString(current)]
            && elevationToNeighbor(current, neighbor, graph) <= 1
            ) {
                queue.push(neighbor);
                cameFrom.set(neighbor, current);
            }
        }
       visited[asString(current)] = true;

    }

    return [];
}
function getNeighbors(point: Point, graph: string[]) : Point[] {
    // UP
    const above = {
        x: point.x - 1,
        y: point.y
    };
    // DOWN
    const below = {
        x: point.x + 1,
        y: point.y
    };
    // LEFT
    const left = {
        x: point.x,
        y: point.y - 1
    };

    // Right
    const right = {
        x: point.x,
        y: point.y + 1
    };
    return [above, below, left, right];
}

function isInBounds(point: Point, graph: string[]) : boolean {
    return point.x >= 0 && point.x < graph.length
    && point.y >= 0 && point.y < graph[0].length;
}

function elevationToNeighbor(pointA: Point, pointB: Point, graph: string[]) : number {
    let pointACharacter : string = graph[pointA.x].charAt(pointA.y);
    let pointBCharacter : string = graph[pointB.x].charAt(pointB.y);

    if (pointACharacter === "S") {
        pointACharacter = "a";
    }

    if (pointBCharacter === "S") {
        pointBCharacter = "a";
    }

    if (pointACharacter === "E") {
        pointACharacter = "z"
    }

    if (pointBCharacter === "E") {
        pointBCharacter = "z";
    }

    const pointAElevation = pointACharacter.charCodeAt(0);
    const pointBElevation = pointBCharacter.charCodeAt(0);
    return pointBElevation - pointAElevation;

}
// 4. DO a breadth first search (use a queue - push to add to end of queue. shift to get the next location)
async function findThePath(fileName: string) : Promise<void> {
    let filehandle : FileHandle | undefined;

  try {
    filehandle = await open(fileName, 'r');
    const graph : string[] = []
    for await (const line of filehandle.readLines()) {
        graph.push(line);
    }

    // Find the start point
    let start : Point = {x: -1, y: -1};
    let end : Point = {x: -1, y: -1};
    for (let row = 0; row < graph.length; row++) {
        for (let col = 0; col < graph[row].length; col++) {
            if (graph[row].charAt(col) === "S") {
                start = {x: row, y: col};
            }
            
            if (graph[row].charAt(col) === "E") {
                end = {x: row, y: col};
            }
        }
    }
    console.log(`Find a path from [${start.x} , ${start.y}] to [${end.x} , ${end.y}]`);
    const result = breadthFirstSearch(graph, end, start);

    console.log(result.length);
   
  } finally {
    await filehandle?.close();
  }
}

// findThePath("input.txt");