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

const opponentToPointValue : Map<String, number> = new Map();
choiceToPointValue.set("A", 1);
choiceToPointValue.set("B", 2);
choiceToPointValue.set("C", 3);

const opponentWeaknesToPointValue : Map<String, number> = new Map();
// Rock (A) is weak to Paper (Y)
opponentWeaknesToPointValue.set("A", 2);
// Paper (B) is weak to Scissors (Z)
opponentWeaknesToPointValue.set("B", 3);
// Scissors (C) is weak to Rock (X)
opponentWeaknesToPointValue.set("C", 1);

const playerWeaknesses : Map<String, number> = new Map();
// Rock (A) beats Scissors (Z)
playerWeaknesses.set("A", 3);
// Paper (B) beats Rock (X)
playerWeaknesses.set("B", 1);
// Scissors (C) beats Paper (Y)
playerWeaknesses.set("C", 2);


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
    const opponentWeakness : number | undefined =  opponentWeaknesToPointValue.get(opponentChoice);
    console.log("Opponent Weakness: " + opponentWeakness);
    return WIN + opponentWeakness;
   } else if (playerChoice === "Y") {
    // We want to draw Find the equivalent sign and add the point value
    console.log("Opponent Value: " + opponentToPointValue.get(opponentChoice));
    return DRAW + opponentToPointValue.get(opponentChoice);
   } else {
    return LOSS +  playerWeaknesses.get(opponentChoice);
   }
}

doTheThing("input.txt");