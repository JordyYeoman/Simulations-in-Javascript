// Probabilities of event occurring
let wPercent = 0.1; // If number is equal or between 0 - 10
let bPercent = 0.8; // If number is equal or between 11 - 89
let lPercent = 0.1; // If number is equal or between 90 - 100
let stake = 10; // Amount of money to bet
let resultsTen = [];
let resultsTwenty = [];
let resultsFifty = [];
let resultsHundred = [];
let resultsThousand = [];
let runningTotalSimulationAmount = [10, 100, 1000, 10000];
let averageOf100BetsOverNSimulations = [];

const runSimulation = () => {
  let wCount = 0;
  let bCount = 0;
  let lCount = 0;
  let arrOfSimulationSizes = [10, 20, 50, 100, 1000];
  // Simulate event and if the probability is between the expected value, add to that count
  // 1. Loop over the arrOfSimulationSizes array and grab the value to use as the loop
  arrOfSimulationSizes.forEach((simSize) => {
    let loopCount = 0;
    while (loopCount < simSize) {
      // Get random value between 0-100
      let randomNumber = Math.floor(Math.random() * 100) + 1;
      if (randomNumber <= 10) {
        wCount += 1;
      } else if (randomNumber > 10 && randomNumber < 90) {
        bCount += 1;
      } else if (randomNumber >= 90) {
        lCount += 1;
      }
      loopCount += 1;
    }
    let count = {
      simSize: simSize,
      winCount: wCount,
      bCount: bCount,
      lCount: lCount,
    };
    switch (simSize) {
      case 10:
        if (resultsTen.length > 0) {
          getAverageForVals(resultsTen, count);
          return;
        }
        resultsTen.push(count);
        return;
      case 20:
        if (resultsTwenty.length > 0) {
          getAverageForVals(resultsTwenty, count);
          return;
        }
        resultsTwenty.push(count);
        return;
      case 50:
        if (resultsFifty.length > 0) {
          getAverageForVals(resultsFifty, count);
          return;
        }
        resultsFifty.push(count);
        return;
      case 100:
        if (resultsHundred.length > 0) {
          getAverageForVals(resultsHundred, count);
          return;
        }
        resultsHundred.push(count);
        return;
      case 1000:
        if (resultsThousand.length > 0) {
          getAverageForVals(resultsThousand, count);
          return;
        }
        resultsThousand.push(count);
        return;
    }
  });
};

// Get average after each loop
const getAverageForVals = (count, arr) => {
  arr.simSize = (count.simSize + arr.simSize) / 2;
  arr.winCount = (count.winCount + arr.winCount) / 2;
  arr.bCount = (count.bCount + arr.bCount) / 2;
  arr.lCount = (count.lCount + arr.lCount) / 2;
};

// We then want to repeat the above simulation 10, 100, 1000, 10000
const runSimulationNTimes = () => {
  runningTotalSimulationAmount.forEach((amountOfSims) => {
    let loopCount = 0;
    while (loopCount < amountOfSims) {
      runSimulation();
      loopCount += 1;
    }
    console.log("AMOUNT OF SIMS: " + amountOfSims);
    // console.log(resultsTen);
    // console.log(resultsTwenty);
    // console.log(resultsFifty);
    // console.log(resultsHundred);
    // console.log(resultsThousand);
    var results = {
      resultsHundred,
      amountOfSims,
    };
    averageOf100BetsOverNSimulations.push(results);
    resultsTen = [];
    resultsTwenty = [];
    resultsFifty = [];
    resultsHundred = [];
    resultsThousand = [];
  });
};

const simulatorBeast = async () => {
  runSimulationNTimes();
  averageOf100BetsOverNSimulations.forEach((results) => {
    console.log("Results: " + JSON.stringify(results));
  });
};

simulatorBeast();

// Create a list of expected values between 1-20 (This will be our dollar payouts)

// We want to see the average expected payout over 10, 20, 50, 100 & 1000 iterations
