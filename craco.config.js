// craco.config.js
module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    eslint: {
        enable: false
    },
    webpack: {
        configure: webpackConfig => {
          const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
            ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
          );
    
          webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
          return webpackConfig;
        }
    }
}