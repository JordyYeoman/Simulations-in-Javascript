let iterationAv = [];
// const sampleSet = [10, 100, 1000, 10000, 100000];
const sampleSet = [
  10, 50, 100, 200, 400, 800, 1200, 2400, 4800, 9600, 19200, 38400, 76800,
  153600,
];

sampleSet.map((sampleSize) => {
  iterationAv.push(getAverage(sampleSize));
});

function getAverage(sampleSize) {
  let x = 0;
  let numbers = [];
  let total = 0;

  while (x <= sampleSize) {
    numbers.push(getRandomInt(1, 6));
    x++;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  numbers.forEach((num) => {
    total += num;
  });
  return total / numbers.length;
}

console.log(iterationAv);
