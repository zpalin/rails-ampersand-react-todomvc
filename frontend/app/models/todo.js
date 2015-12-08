var AmpersandModel = require('ampersand-model');
var railsFieldMixin = require('../helpers/rails-field-mixin');

module.exports = AmpersandModel.extend(railsFieldMixin, {

  url: function(){
    var baseUrl = 'http://localtest.me:3000/todos';
    if (this.id === undefined) {
      return baseUrl;
    }
    return `${baseUrl}/${this.id}`;
  },

  props: {
    id: {
      type: 'number'
    },
    title: {
      type: 'string',
      default: ''
    },
    completed: {
      type: 'boolean',
      default: false
    },
    clientId: {
      type: 'string'
    }
  },

  session: {
    editing: {
      type: 'boolean',
      default: false
    }
  },
  
  toggle () {
    this.completed = !this.completed;
    this.save();
  }
});