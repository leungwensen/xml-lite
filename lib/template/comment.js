const lang = require('zero-lang');
module.exports = function(data) {
    data = data || {};
    
    var __t;
    var __p = '';
    var __j = Array.prototype.join;
    var print = function() {
        __p += __j.call(arguments, '');
    };
    return (function(data) {
        __p += '<!--' +
            ((__t = (data)) == null ? '' : __t) +
            '-->\n';;
        return __p;
    })(data.data);
};