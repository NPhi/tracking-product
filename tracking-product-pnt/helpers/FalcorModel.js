var falcor = require('falcor')
var HttpDataSource = require('falcor-http-datasource')

var model = new falcor.Model({source: new HttpDataSource('/model.json') });

module.exports = model;