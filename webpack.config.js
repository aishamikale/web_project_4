const path = require("path");

module.exports = {
    entry: {
        main: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        publicPath: ""
    },
    mode: "development",
    devServer: {
        contentBase: path.resolve(__dirname, './dist'), // tell the server where to serve content from in dev mode
        compress: true, // this will speed up file loading in development mode
        port: 8080, // will open your site at localhost:8080 (you can use another port)
    
        open: true // site will open automatically in the browser after executing npm run dev
      },
}