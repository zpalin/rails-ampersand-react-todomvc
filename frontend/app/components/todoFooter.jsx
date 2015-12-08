var React = require('react');
var ReactDOM = require('react-dom');
var app = require('ampersand-app');
var ampersandMixin = require('ampersand-react-mixin');
var classNames = require('classnames');

module.exports = React.createClass({
  render: function () {
    var activeTodoWord = this.props.count === 1 ? 'item' : 'items';
    var clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      );
    }

    var nowShowing = this.props.nowShowing;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <a
              href="/"
              className={classNames({selected: nowShowing === 'all'})}>
                All
            </a>
          </li>
          {' '}
          <li>
            <a
              href="/active"
              className={classNames({selected: nowShowing === 'active'})}>
                Active
            </a>
          </li>
          {' '}
          <li>
            <a
              href="/completed"
              className={classNames({selected: nowShowing === 'completed'})}>
                Completed
            </a>
          </li>
        </ul>
        {clearButton}
      </footer>
    );
  }
});