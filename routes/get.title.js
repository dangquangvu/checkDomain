const jsdom = require("jsdom");

function parseData(html) {
    const { JSDOM } = jsdom;
    const dom = new JSDOM(html);
    const $ = (require('jquery'))(dom.window);
    var title = $("title").html();
    return title;
}

module.exports = parseData;