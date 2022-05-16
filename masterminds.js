const fs = require('fs');
const roundInit = require('./mastermindsObjects').template;

const isNumberExists = function (number, digit) {
  return number.join('').includes(digit);
};

// const isIndexPresent = function (roundInfo, index) {
//   return !checkIfNumberExists(roundInfo.positionMatched
//     .concat(roundInfo.colorMatched), index);
// };

const isIndexPresent = function (roundInfo, index) {
  return isNumberExists(roundInfo.positionMatched, index);
};

const isCodePresent = function (roundInfo, index) {
  return isNumberExists(roundInfo.actualCode, roundInfo.guessedCode[index]);
};

const checkPartialMatch = function (roundInfo) {
  for (let index = 0; index < roundInfo.actualCode.length; index++) {

    if (!isIndexPresent(roundInfo, index) && isCodePresent(roundInfo, index)) {
      roundInfo.colorMatched.push(index);
    }
  }
  return roundInfo.colorMatched;
};

const checkExactMatch = function (roundInfo) {
  for (let index = 0; index < roundInfo.actualCode.length; index++) {

    if (roundInfo.actualCode[index] === roundInfo.guessedCode[index]) {
      roundInfo.positionMatched.push(index);
    }
  }
  return roundInfo.positionMatched;
};

const getRespectiveColor = function (letter) {
  const colors = {
    'r': 'red',
    'b': 'blue',
    'g': 'green',
    'y': 'yellow',
    'p': 'pink',
    'v': 'violet',
    'w': 'white',
    'o': 'orange'
  };
  return colors[letter];
};

const updateRoundDets = function (allRoundsInfo, roundInfo, guessedCode) {
  roundInfo.guessedCode = guessedCode[0].split(',').map(getRespectiveColor);
  roundInfo.positionMatched = checkExactMatch(roundInfo);
  roundInfo.colorMatched = checkPartialMatch(roundInfo);
  roundInfo.chance = allRoundsInfo.length + 1;

  if (roundInfo.positionMatched.length === 4) {
    roundInfo.isMatched = true;
  }

  return roundInfo;
};

const masterminds = function (roundInit) {
  const allRoundsInfo =
    JSON.parse(fs.readFileSync('./masterminds.json', 'utf8'));

  let roundInfo = roundInit;
  const guessedCode = process.argv.slice(2);
  roundInfo = updateRoundDets(allRoundsInfo, roundInfo, guessedCode);
  console.log(roundInfo.isMatched);
  allRoundsInfo.push(roundInfo);

  fs.writeFileSync('./masterminds.json', JSON.stringify(allRoundsInfo), 'utf8');
};

masterminds(roundInit);
