// vue中修改webpack的配置文件

module.exports = {
    publicPath: "./",
    devServer: {
        proxy: {
            '/api': {
                target: 'http://kumanxuan1.f3322.net:8881/cms',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}