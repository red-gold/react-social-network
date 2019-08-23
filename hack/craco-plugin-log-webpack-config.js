// TODO: Change all path to remove this file
const file = 'node_modules/react-scripts/scripts/utils/verifyTypeScriptSetup.js'

var fs = require('fs')
function disableIsoModule(path) {
  fs.readFile(path, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data)
    var result = data.replace(/isolatedModules: { value: true/g, 'isolatedModules: { value: false');
  
    fs.writeFile(path, result, 'utf8', function (err) {
      console.log(result)
       if (err) return console.log(err);
    });
  });
}
module.exports = {
    overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {
      const social_env = process.env.SOCIAL_ENV
      console.log('social env: ', social_env)
     if (social_env === 'docker') {
       disableIsoModule('/'+ file)
       console.log('/'+ file)
     } else {
      disableIsoModule('../'+file)
     }
      
        // Always return the config object.
        return webpackConfig;
    }
};