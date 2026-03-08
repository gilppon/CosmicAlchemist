const { execSync } = require('child_process');
const fs = require('fs');
try {
  const output = execSync('npx jest index.test.tsx', { encoding: 'utf8', stdio: 'pipe' });
  fs.writeFileSync('clean_out.txt', output);
  console.log('Success!', output);
} catch (e) {
  fs.writeFileSync('clean_out.txt', e.stdout || e.message);
  console.log(e.stdout || e.message);
}
