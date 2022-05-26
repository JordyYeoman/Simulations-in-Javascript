var xorshift = require('xorshift');

// Test if mug bets will converge on loss if value too different

/// Convert decimal odds to percentage probability
/// 1/odds * 100
const getPercentageAsDecimalFromDecimalOdds = (decimalOdds) => {
  return 1 / decimalOdds;
};

// Run a simulation 1000 times, where the odds are 1.31 and 3.4.
// @1.31 odds our stake is $25
// @3.4 odds our stake is $5
//
// What is the outcome of our [bankroll] if we take this bet 1000 times?
let bankroll = 0;
const odds1 = 1.31;
// const odds2 = 3.4;
const highProbWinEventProfit = 3;
const lowProbLoseEventLoss = -8;

// Get odds as percentage value represented as decimal
const oddsOfEvent1 = getPercentageAsDecimalFromDecimalOdds(odds1);
// const oddsOfEvent2 = getPercentageAsDecimalFromDecimalOdds(odds2);
const runSimulation = () => {
  for (let i = 0; i <= 1000; i++) {
    let randomNumber = getRandomNumber();
    if (randomNumber >= 0 && randomNumber <= oddsOfEvent1) {
      bankroll += highProbWinEventProfit;
      continue;
    }
    if (randomNumber <= 1 && randomNumber > oddsOfEvent1) {
      bankroll += lowProbLoseEventLoss;
      continue;
    }
    console.log('Number didnt fit anywhere!?! WHAT?');
  }
};

// Simulate event occuring using probability params
// If number is between 0 and X probability, then that event occurs
// If number is between X and 1 probability, then that event occurs
//
// Eg - randomInt is 0.25 so event 1 will occur
// Thanks to below reference for aiding in implementing a more 'true' random number
// Implemented using xorshift PRNG from - https://github.com/AndreasMadsen/xorshift

// This method returns a random 64-bit double, with its value in the range [0, 1).
// That means 0 is inclusive and 1 is exclusive. This is equivalent to Math.random().
const getRandomNumber = () => {
  var randomNumber = xorshift.random();
  return randomNumber; // number between 0 and 1
};

// runSimulation();

// Now that we know [lowProbLoseEventLoss] if it is only double the win, we can turn a profit.
// Let's get an average simulation the 1000 bets over 10K times
let arrayOfOutcomes = [];

const rumSimulation10KTimes = () => {
  for (let k = 0; k <= 10000; k++) {
    console.log(k);
    runSimulation();
    // Push the resulting bankroll to the array of outcomes
    arrayOfOutcomes.push(bankroll);
    // Reset bankroll to 0;
    bankroll = 0;
  }
  // Get the average
  var sum = 0;
  for (var number of arrayOfOutcomes) {
    sum += number;
  }
  average = sum / arrayOfOutcomes.length;
  console.log(
    'Average outcome after running simulation of 1000 bets 10K times: ',
    average
  );
};

rumSimulation10KTimes();
