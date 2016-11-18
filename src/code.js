'use strict';
const React = require('react');
const Codemirror = require('react-codemirror');

class Code extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    code: 'let x=3;'
  }
  this.css = style
}
updateCode: function (newCode) {
    this.setState({
      code: newCode
    });
  },
  render: function () {
    var options = {
      lineNumbers: true
    };
    return <Codemirror value = {
      this.state.code
    }
    onChange = {
      this.updateCode
    }
    options = {
      options
    }
    />
  }
});
module.exports = Code
