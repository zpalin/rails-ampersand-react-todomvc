var React = require('react');
var ReactDOM = require('react-dom');
var app = require('ampersand-app');
var ampersandMixin = require('ampersand-react-mixin');
var localLinks = require('local-links');
var TodoItem = require('./components/todoItem.jsx');
var TodoFooter = require('./components/todoFooter.jsx');

module.exports = React.createClass({
  mixins: [ampersandMixin],

  displayName: 'TodoApp',

  propTypes: {
    me: React.PropTypes.object.isRequired
  },

  onClick (event) {
    var pathname = localLinks.getLocalPathname(event)
    if (pathname) {
      event.preventDefault()
      app.router.history.navigate(pathname, { trigger: true })
    }
  },

  handleToggleAll () {
    var targetState = !app.me.allCompleted;
    this.props.me.todos.each(function (todo) {
      todo.completed = targetState;
    });
  },

  handleSubmitNewTodo (event) {
    event.preventDefault();
    var val = this.refs.newField.value.trim();

    if (val) {
      this.props.me.todos.create({title: val}, {wait: true});
      this.props.me.todos.fetch();
      this.refs.newField.value = "";
    }
  },
  
  handleClearCompleted () {
    this.props.me.todos.clearCompleted();
  },

  render () {
    const {me} = this.props;
    var main;
    var footer;
    var todoItems = me.todos.subset.map( (todo) => {
      return (
        <TodoItem key={todo.id} todo={todo}/>
      );
    }, this);


    if(me.completedCount || me.activeCount) {
      footer = (
        <TodoFooter
          count={me.activeCount}
          completedCount={me.completedCount}
          nowShowing={me.mode}
          onClearCompleted={this.handleClearCompleted}
        />
      );      
    }

    return (
      <div onClick={this.onClick}>
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleSubmitNewTodo}>
            <input
              ref="newField"
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus={true}
            />
          </form>
        </header>
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.handleToggleAll}
            checked={me.allCompleted === true}
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
        {footer}

      </div>
    )
  }
})
