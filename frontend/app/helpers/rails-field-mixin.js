var AmpersandModel = require('ampersand-model');
var humps = require('humps');
var _ = require('underscore');

module.exports = {
  parse (attrs) {
    attrs = humps.camelizeKeys(attrs);
    return attrs;
  },

  serialize (opts = {}) {
    var opts = _.extend({decamelize: true}, opts);

    var attrs = AmpersandModel.prototype.serialize.apply(this, arguments);
    if(opts.decamelize === true) {
      attrs = humps.decamelizeKeys(attrs);
    }
    return attrs;
  }
}