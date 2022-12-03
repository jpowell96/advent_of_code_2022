const fs = require('fs');

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
async function doTheThing(filePath: string) : Promise<void> {
    let totalScore: number = 0;
    fs.readFile(filePath, "utf-8", function read(err, data) {
        if (err) {
           throw err;
        }

        const games = data.split("\n");

        for (const game of games) {
            const [opponentChoice, playerChoice] = game.split(" ");
            const scoreForRound = riggedRockPaperScissors(opponentChoice, playerChoice);
            totalScore += scoreForRound;
        }   

        console.log("Final Score is %d", totalScore);
    });

}

function riggedRockPaperScissors(opponentChoice: String, playerChoice : String) : number {
  if (playerChoice === "Z") {
    // We want to win the game. Find the weakness
    const opponentWeakness : String | undefined =  opponentWeaknesses.get(opponentChoice);
    return WIN + choiceToPointValue.get(opponentWeakness);
   } else if (playerChoice === "Y") {
    // We want to draw Find the equivalent sign and add the point value
    const equivalentSignForPlayer :  String | undefined = opponentToPlayerSigns.get(opponentChoice);
    console.log(equivalentSignForPlayer);
    return DRAW + choiceToPointValue.get(equivalentSignForPlayer);
   } else {
    return LOSS;
   }
}

doTheThing("sample_input.txt");