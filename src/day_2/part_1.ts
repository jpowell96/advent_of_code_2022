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
weaknesses.set("A", "Y");
weaknesses.set("B", "Z");
weaknesses.set("C", "X");

const WIN : number = 6;
const DRAW : number = 3;
const LOSS : number = 0;

// 1. Read in file, split on new line
async function doTheThing(fileName: PathLike) : Promise<void> {
  let filehandle : FileHandle | undefined;
  let playerScore : number = 0;

  try {
    filehandle = await open(fileName, 'r');
  
    for await (const game of filehandle.readLines()) {
     const gameChoices = game.split(" ");

     const opponentChoice = gameChoices[0];
     const playerChoice = gameChoices[1];
     
     // TOOD: Find a better way to handle undefined - right now getting a typescript error
     let scoreForRound : number = 0;
     scoreForRound += choiceToPointValue.get(playerChoice);
      
     if (playerChoice === weaknesses.get(opponentChoice)) {
      scoreForRound += WIN;
     } else if (playerChoice === opponentChoice) {
      scoreForRound += DRAW;
     } else {
      scoreForRound += LOSS;
     }
      console.log(`The score for the current round is: ${scoreForRound}`);
    }
    console.log(`Final Score ${playerScore}`);
  } finally {
    await filehandle?.close();
  }
}

doTheThing('input.txt');