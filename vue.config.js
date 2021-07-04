module.exports =  {
    productionSourceMap: true,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.devtool = 'source-map';
            config.output.sourceMapFilename = '../.sourcemap/' + process.env.UNI_PLATFORM + '/[name].js.map'
        }
    },
}
