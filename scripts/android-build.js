const {spawn, spawnSync} = require('child_process');
const {type} = require('os');
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));
const packageVersion = require('../package.json').version;

// const isWindows = type() === 'Windows_NT';
// const gradleExecutor = isWindows ? 'gradlew' : './gradlew';

// androidId for development: all android emulators will have the same android id, so the server configuration does not need update
// const androidId = 'emulator-dev';

// Create devsetup.ts if it's not created. This file is necessary for metro bundler because RN doesn't support optional imports. Related issue: https://github.com/react-native-community/discussions-and-proposals/issues/120
// fs.closeSync(fs.openSync('devsetup.ts', 'a'));

// Get version number
const versionBasePath = '../../../VERSION_BASE';
const buildVersion = fs.existsSync(versionBasePath)
  ? fs.readFileSync(versionBasePath, 'utf8').trim()
  : packageVersion;

console.info('Build Version:', buildVersion);

// if (args['type'] === 'release') {
//   spawn(gradleExecutor, ['assembleRelease'], {
//     cwd: 'android',
//     env: {
//       ...process.env,
//       ENVFILE: args['env'] || '.env.prod',
//       buildVersion: buildVersion,
//     },
//     shell: true,
//     stdio: 'inherit',
//   }).on('exit', code => {
//     process.exit(code);
//   });
// } else if (args['type'] === 'qa') {
//   spawn(gradleExecutor, ['assembleReleaseQa'], {
//     cwd: 'android',
//     env: {
//       ...process.env,
//       ENVFILE: args['env'] || '.env.prod',
//       buildVersion: buildVersion,
//     },
//     shell: true,
//     stdio: 'inherit',
//   }).on('exit', code => {
//     process.exit(code);
//   });
// } else {
spawnSync(
  'react-native',
  ['run-android', '--port', '7100', '--appIdSuffix', 'debug'],
  {
    env: {
      ...process.env,
      ENVFILE: args['env'] || '.env.dev',
      buildVersion: buildVersion,
    },
    shell: true,
    stdio: 'inherit',
  },
);
// spawnSync(`adb shell settings put secure android_id ${androidId}`, {
//   shell: true,
//   stdio: 'inherit',
// });
// }
