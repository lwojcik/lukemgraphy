const jsonminify = require("jsonminify");

module.exports = (content, outputPath) => {
  if (outputPath && outputPath.endsWith(".json")) {
    return jsonminify(content);
  }
  return content;
};
