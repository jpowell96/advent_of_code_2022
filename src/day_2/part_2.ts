import { PathLike } from 'node:fs';
import { FileHandle, open } from 'node:fs/promises';
console.log(process.version); // 'v10.16.3'

/** 
 * Opponent Choice
 * Rock => A
 * Paper => B
 * Scissors => C
 * 
 * Your choices
 * X => Rock
 * Y => Paper
 * Z => Scissors
 * 
 */
const choiceToPointValue : Map<String, number> = new Map();
choiceToPointValue.set("X", 1);
choiceToPointValue.set("Y", 2);
choiceToPointValue.set("Z", 3);

const opponentWeaknesses : Map<String, String> = new Map();
// Rock (A) is weak to Paper (Y)
opponentWeaknesses.set("A", "Y");
// Paper (B) is weak to Scissors (Z)
opponentWeaknesses.set("B", "Z");
// Scissors (C) is weak to Rock (X)
opponentWeaknesses.set("C", "X");

const playerWeaknesses : Map<String, String> = new Map();
// Rock (A) beats Scissors (Z)
playerWeaknesses.set("A", "Z");
// Paper (B) beats Rock (X)
playerWeaknesses.set("B", "X");
// Scissors (C) beats Paper (Y)
playerWeaknesses.set("C", "Y");


const opponentToPlayerSigns : Map<String, String> = new Map();
// Rock
opponentToPlayerSigns.set("A", "X");
// Paper
opponentToPlayerSigns.set("B", "Y");
// Scissors
opponentToPlayerSigns.set("C", "Z");

const WIN : number = 6;
const DRAW : number = 3;
const LOSS : number = 0;

// 1. Read in file, split on new line
async function doTheThing(fileName: PathLike) : Promise<void> {
  let filehandle : FileHandle | undefined;
  let totalScore : number = 0;

  try {
    filehandle = await open(fileName, 'r');
  
    for await (const game of filehandle.readLines()) {
     const [opponentChoice, playerChoice] : String[] = game.split(" ");
     // TOOD: Find a better way to handle undefined - right now getting a typescript error
     const scoreForRound = riggedRockPaperScissors(opponentChoice, playerChoice);
     totalScore += scoreForRound; 
    }

    console.log(`Final Score ${totalScore}`);
  } finally {
    await filehandle?.close();
  }
}

function riggedRockPaperScissors(opponentChoice: String, playerChoice : String) : number {
  if (playerChoice === "X") {
    // We want to win the game. Find the weakness
    const opponentWeakness =  opponentWeaknesses.get(opponentChoice);
    return WIN + choiceToPointValue.get(opponentWeakness);
   } else if (playerChoice === "Y") {
    // We want to draw Find the equivalent sign and add the point value
    const equivalentSignForPlayer = opponentToPlayerSigns.get(opponentChoice);
    return DRAW + choiceToPointValue.get(equivalentSignForPlayer);
   } else {
    return LOSS;
   }
}

doTheThing("sample_input.txt");