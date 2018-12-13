const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');

module.exports = {
    overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {
        if (pluginOptions.preText) {
            console.log(pluginOptions.preText);
        }
        for (let index = 0; index < webpackConfig.plugins.length; index++) {
            let plugin = webpackConfig.plugins[index];
            if (plugin.options && plugin.options.compilerOptions && plugin.options.compilerOptions.isolatedModules) {
                plugin.options.compilerOptions.isolatedModules = false
                break;
            }
            
        }

        // Always return the config object.
        return webpackConfig;
    }
};