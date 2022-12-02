const fs = require('fs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
const { PriorityQueue } = require("js-priority-queue");

// Use y-args to parse the input from the command line
const argv = yargs(hideBin(process.argv))
// Alias method lets us define a flag. Now a user can use -f or --file to specify a file to read
.alias('f', 'file')
// Tells us how many args can be passed for this flag
.nargs('f', 1)
.describe('f', 'Load a file')
.demandOption(['f'])
.argv;


/** 
 * Read in file line by line, keeping a sum as we go along.
 * When we hit an empty new line compare best sum with current sum.
 * 
 * 
 * Return best sum once file is done.
 */
const filePath = argv.file;
console.log(filePath);
fs.readFile(filePath, "utf-8",function read(err, data) {
    if (err) {
        throw err;
    }
    // Split the text on new line. Empty String means we reached the end of calorie count for an elf.
   const rawCalorieCounts = data.split("\n");

   // Iterate through the counts, keeping track of sum. We use for-of on arrays. Using for-in just returns indicies
   let highestCalorieCount = Number.NEGATIVE_INFINITY;
   let currentCalorieCountForElf = 0;

   for (const calorieCount of rawCalorieCounts) {
    // If the String is empty. Compare current sum, to best sum and assign the Max of the two
    if (calorieCount.length === 0) {
        highestCalorieCount = Math.max(currentCalorieCountForElf, highestCalorieCount);
        currentCalorieCountForElf = 0;
    } else {
        currentCalorieCountForElf += Number.parseInt(calorieCount);
    }
   }
   console.log(`Max calorie count for elves ${highestCalorieCount}`);

});
