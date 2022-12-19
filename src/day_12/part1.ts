import { FileHandle, open} from "node:fs/promises";

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

  } finally {
    await filehandle?.close();
  }
}