const fs = require('fs');
const path = require('path');
const os = require('os');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const appTsConfig = resolveApp('tsconfig.json')
const exist = fs.existsSync(appTsConfig)
if (exist) {
    const tsconfig = JSON.parse(fs.readFileSync(appTsConfig, 'utf8'));
    tsconfig.compilerOptions.isolatedModules = false
    fs.writeFileSync(appTsConfig, JSON.stringify(tsconfig, null, 2) + os.EOL)
    
}
