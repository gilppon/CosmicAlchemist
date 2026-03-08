const fs = require('fs');
const data = JSON.parse(fs.readFileSync('audio_result.json', 'utf8'));
let output = "";
data.testResults.forEach(tr => {
    output += "=== ERROR START ===\n";
    output += tr.message + "\n";
    output += "=== ERROR END ===\n\n";
});
fs.writeFileSync('error_message.txt', output, 'utf8');
