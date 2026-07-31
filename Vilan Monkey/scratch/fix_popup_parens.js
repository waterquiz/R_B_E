const fs = require('fs');
let popup = fs.readFileSync('popup/index.js', 'utf8');

popup = popup.replace('.filter(m)})}),Ze=', '.filter(m)}),Ze=');
popup = popup.replace('.filter(m)}),Ze=', '.filter(m)})}),Ze=');

fs.writeFileSync('popup/index.js', popup, 'utf8');
