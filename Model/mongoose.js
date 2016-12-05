var mongoose = require('mongoose');
mongoose.Promise = global.Promise;//to have save() run :)
module.exports = mongoose.connect('mongodb://heroku_dmqgr6px:1ctt8sd2721k9gtbqgmojo4ogl@ds119608.mlab.com:19608/heroku_dmqgr6px');//mongoose object
