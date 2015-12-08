var React = require('react');
var ReactDOM = require('react-dom');
var app = require('ampersand-app');
var ampersandMixin = require('ampersand-react-mixin');
var classNames = require('classnames');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

module.exports = React.createClass({
  mixins: [ampersandMixin],

  displayName: 'TodoItem',

  getInitialState() {
    return {
      editText: this.props.todo.title,
      editing: false    
    };
  },

  propTypes: {
    todo: React.PropTypes.object.isRequired
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing) {
      var node = this.refs.editField;
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  },

  handleDestroyTodo (event) {
    this.props.todo.destroy();
  },

  handleToggle (event) {
    this.props.todo.toggle();
  },

  handleEdit (event) {
    this.setState({editing: true});
  },

  handleChange (event) {
    this.setState({editText: event.target.value});
  },

  handleSubmit (event) {
      var val = this.state.editText.trim();
      if (val) {
        this.props.todo.title = val;
        this.props.todo.save();

        this.setState({editText: val, editing: false});
      } else {
        this.props.todo.destroy();
      }
  },

  handleKeyDown (event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({
        editText: this.props.todo.title,
        editing: false
      });
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit();
    }
  },

  render () {
    const {todo} = this.props;

    return (
      <li className={classNames({
          completed: todo.completed,
          editing: this.state.editing
        })}
      >
        <div className="view">
          <input 
            type="checkbox" 
            className="toggle"
            checked={todo.completed}
            onChange={this.handleToggle}
          />
          <label onDoubleClick={this.handleEdit} >{todo.title}</label>
          <button className="destroy" onClick={this.handleDestroyTodo}/>
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleSubmit}
        />
      </li>
    )
  }
})
