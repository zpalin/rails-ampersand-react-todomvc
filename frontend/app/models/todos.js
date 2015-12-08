var Collection = require('ampersand-rest-collection');
var SubCollection = require('ampersand-filtered-subcollection');
// var debounce = require('debounce');
var Todo = require('./todo');
var STORAGE_KEY = 'todos-ampersand';


module.exports = Collection.extend({
  model: Todo,
  url: "http://localtest.me:3000/todos",

  initialize: function () {
    // Attempt to read from localStorage
    this.fetch();

    // This is what we'll actually render
    // it's a subcollection of the whole todo collection
    // that we'll add/remove filters to accordingly.
    this.subset = new SubCollection(this);

  },
  getCompletedCount: function () {
    return this.reduce(function (total, todo) {
      return todo.completed ? ++total : total;
    }, 0);
  },
  // Helper for removing all completed items
  clearCompleted: function () {
    var toRemove = this.filter(function (todo) {
      return todo.completed;
    });

    toRemove.forEach( (todo) => {
      todo.destroy();
    });
  },

  // Updates the collection to the appropriate mode.
  // mode can 'all', 'completed', or 'active'
  setMode: function (mode) {
    if (mode === 'all') {
      this.subset.clearFilters();
    } else {
      this.subset.configure({
        where: {
          completed: mode === 'completed'
        }
      }, true);
    }
  }
  // // The following two methods are all we need in order
  // // to add persistance to localStorage
  // writeToLocalStorage: function () {
  //   localStorage[STORAGE_KEY] = JSON.stringify(this);
  // },
  // readFromLocalStorage: function () {
  //   var existingData = localStorage[STORAGE_KEY];
  //   if (existingData) {
  //     this.set(JSON.parse(existingData));
  //   }
  // },
  // // Handles events from localStorage. Browsers will fire
  // // this event in other tabs on the same domain.
  // handleStorageEvent: function (e) {
  //   if (e.key === STORAGE_KEY) {
  //     this.readFromLocalStorage();
  //   }
  // }
});