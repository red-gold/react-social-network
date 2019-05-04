
const file = './node_modules/react-scripts/scripts/utils/verifyTypeScriptSetup.js'

module.exports = {
    overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {
       var fs = require('fs')
       fs.readFile(file, 'utf8', function (err,data) {
         if (err) {
           return console.log(err);
         }
         var result = data.replace(/isolatedModules: { value: true/g, 'isolatedModules: { value: false');
       
         fs.writeFile(file, result, 'utf8', function (err) {
            if (err) return console.log(err);
         });
       });
        // Always return the config object.
        return webpackConfig;
    }
};