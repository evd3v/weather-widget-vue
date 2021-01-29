module.exports = {
    chainWebpack: (config) => {
        config.optimization.delete('splitChunks')
    },
    filenameHashing: false
}
