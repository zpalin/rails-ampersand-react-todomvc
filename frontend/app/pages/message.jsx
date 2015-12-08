var React = require('react');

module.exports = React.createClass({
  displayName: 'MessagePage',

  propTypes: {
    title: React.PropTypes.string,
    message: React.PropTypes.string.isRequired
  },

  render () {
    const {title, message} = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    )
  }
})
