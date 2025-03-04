const fs = require('fs');
const docs = JSON.parse(fs.readFileSync('../data/docs-min.json', 'utf8'));
const mapping = {};

function parseNode(node, path) {
    if (node.id) {
        mapping[node.id] = path.slice(0, -1);
    }
    Object.keys(node).forEach((key) => {
        if (Array.isArray(node[key])) {
            parseNode(node[key], path + key + "/");
        } else if (typeof node[key] === 'object') {
            parseNode(node[key], path + key + "/");
        }
    })
}

//
parseNode(docs, "#");
fs.writeFileSync('../data/ids-min.json', JSON.stringify(mapping, null, 0));
fs.writeFileSync('../data/docs-min.json', JSON.stringify(docs, null, 0));
