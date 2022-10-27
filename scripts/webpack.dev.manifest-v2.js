const {merge} = require("webpack-merge");
const config = require("./webpack.config.manifest-v2.js");

module.exports = merge(config, {
    mode: "development",
    devtool: "inline-source-map"
});