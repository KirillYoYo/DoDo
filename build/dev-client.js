/* eslint-disable */
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  console.log( event.action)
  if (event.action === 'reload') {
    console.log('reload')
    //window.location.reload()
  }
})
