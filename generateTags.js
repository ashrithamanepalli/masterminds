const formatAttr = function (attribute) {
  return ' ' + attribute.attr + '=' + '"' + attribute.value + '"';
};

const createAttributes = function (attributes) {
  return attributes ? attributes.map(formatAttr).join('') : '';
};

const openTag = (tag, attributes) => {
  const attributeDetails = createAttributes(attributes);
  return '<' + tag + attributeDetails + '>';
};

const closeTag = (tag) => '</' + tag + '>';

const generateTag = (tagName, content, attributes) => {
  return openTag(tagName, attributes) + content + closeTag(tagName);
};

const generateSelfCloseTag = (tagName, attributes) => {
  return openTag(tagName, attributes);
};

exports.generateTag = generateTag;
exports.generateSelfCloseTag = generateSelfCloseTag;
