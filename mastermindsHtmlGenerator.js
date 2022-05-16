const fs = require('fs');
const generateTags = require('./generateTags.js');
const generateTag = generateTags.generateTag;
const generateSelfCloseTag = generateTags.generateSelfCloseTag;

const allRoundsInfo = JSON.parse(fs.readFileSync('./masterminds.json', 'utf8'));

const generateCodeColorDiv = function (color) {
  return generateTag('div', '', [{ attr: 'class', value: color }]);
};

const getCodeDivs = function (roundInfo) {
  return roundInfo.guessedCode.map(generateCodeColorDiv).join('');
};

const getPositionDivs = function () {
  return generateTag('div', '', [{ attr: 'class', value: 'positionMatched' }]);
};

const getColorDivs = function () {
  return generateTag('div', '', [{ attr: 'class', value: 'colorMatched' }]);
};

const getEmptyDivs = function () {
  return generateTag('div', '', [{ attr: 'class', value: 'empty' }]);
};

const getClueDivs = function (roundInfo) {
  const positionDivs = roundInfo.positionMatched.map(getPositionDivs).join('');
  const colorDivs = roundInfo.colorMatched.map(getColorDivs).join('');

  const remaining = roundInfo.actualCode.length -
    roundInfo.positionMatched.concat(roundInfo.colorMatched).length;

  const emptyDivs = Array(remaining).fill('0').map(getEmptyDivs).join('');

  return positionDivs + colorDivs + emptyDivs;
};

const generateRowDiv = function (colorDivs) {
  return generateTag('div', colorDivs, [{ attr: 'class', value: 'row' }]);
};

const getDivs = function (roundInfo) {
  const codeDiv = generateTag('div', getCodeDivs(roundInfo),
    [{ attr: 'class', value: 'code' }]);
  const clueDiv = generateTag('div', getClueDivs(roundInfo),
    [{ attr: 'class', value: 'clue' }]);
  return codeDiv + clueDiv;
};

const generateBody = function (allRoundsInfo) {
  const rowDivs = allRoundsInfo.map(getDivs).map(generateRowDiv).join('');
  return generateTag('div', rowDivs, [{ attr: 'class', value: 'rows' }]);
};

const generateHead = function () {
  const title = generateTag('title', 'Masterminds');
  const link = generateSelfCloseTag('link',
    [
      { attr: 'rel', value: 'stylesheet' },
      { attr: 'href', value: './styles.css' }
    ]);
  return title + link;
};

const generateMasterminds = function (allRoundsInfo) {
  const head = generateTag('head', generateHead());
  const body = generateTag('body', generateBody(allRoundsInfo));
  const html = generateTag('html', head + body);
  return html;
};

const main = function (allRoundsInfo) {
  return generateMasterminds(allRoundsInfo);
};

fs.writeFileSync('./masterminds.html', main(allRoundsInfo), 'utf8');
