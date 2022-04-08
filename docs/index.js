const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const users =require('./api');
const boxes =require('./api');
const cabines =require('./api');
const tarifs= require('./api');
const sizes=require('./api');
const door = require('./api');
const mobile =  require('./api');
module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...users,
    ...boxes,
    ...cabines,
    ...tarifs,
    ...sizes,
    ...door,
    ...mobile
};