import { PathLike } from 'node:fs';
import { FileHandle, open } from 'node:fs/promises';

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

const weaknesses : Map<String, String> = new Map();
// Rock (A) is weak to Paper (Y)
weaknesses.set("A", "Y");
// Paper (B) is weak to Scissors (Z)
weaknesses.set("B", "Z");
// Scissors (C) is weak to Rock (X)
weaknesses.set("C", "X");

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
     const scoreForRound = choiceToPointValue.get(playerChoice) + rockPaperScissors(opponentChoice, playerChoice);
     totalScore += scoreForRound; 
    }

    console.log(`Final Score ${totalScore}`);
  } finally {
    await filehandle?.close();
  }
}

function rockPaperScissors(opponentChoice: String, playerChoice : String) : number {
  if (playerChoice === weaknesses.get(opponentChoice)) {
    return WIN;
   } else if (playerChoice === opponentToPlayerSigns.get(opponentChoice)) {
    return DRAW;
   } else {
    return LOSS;
   }
}

doTheThing('input.txt');