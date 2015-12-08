var app = require('ampersand-app');
var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('./router');
var TodoApp = require('./todoApp');
var Me = require('./models/me');
var Todo = require('./models/todo');
var Todos = require('./models/todos')

// window.Todo = Todo;
// window.Todos = Todos;

// window.td = new Todo({id: 1});
// td.fetch();

window.app = app.extend({
  init () {
    this.me = new Me();

    ReactDOM.render(<TodoApp me={this.me}/>, document.getElementById("react-container"));

    this.router = new Router();
    this.router.history.start();
  }
})

app.init();