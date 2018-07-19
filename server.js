const express = require('express');
const webpack = require('webpack');
const path = require('path')
const dotenv = require('dotenv')
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(express.static('dist'))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}
if (process.env.NODE_ENV !== 'production') {
  dotenv.load();
}

// PORT
const PORT = process.env.PORT || 3001

//> Get the file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/app/index.html'))
})

// Serve the files
app.listen(PORT, () => {
  console.log(`Now connected on port ${PORT}`)
})
