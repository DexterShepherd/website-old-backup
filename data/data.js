const fs = require('fs');
const path = require('path');

const experimentsPath = path.join(__dirname, '../', 'src', 'experiments');

let experiments = fs.readdirSync(experimentsPath, (err, items) => {
  if (err) {
    return console.log(err);
  }
  return items;
});

experiments = experiments.filter((i) => {
  return ((i !== '.DS_Store') && (i !== 'index.js') && (i !== 'data'));
});


module.exports = {
  experiments
}
