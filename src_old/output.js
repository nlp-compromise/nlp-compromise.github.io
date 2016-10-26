const React = require('react')
const hljs = require('highlight.js')
const r = require('r-dom');

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: 'html'
    };
    this.css = {
      tabs: {
        width: '100%'
      },
      output: {
        border: '1px solid lightsteelblue',
        marginLeft: '10%',
        marginRight: '10%'
      }
    };
  }
  render() {
    let css = this.css;
    let state = this.state;
    let output = state.output
    let result = this.props.result
    let str = ''
    if (output === 'html') {
      // str = r.span('', {
      //   'dangerouslySetInnerHTML': {
      //     __html: ['<span>' + result.asHtml() + '</span>']
      //   }
      // }, [])
    } else if (output === 'asArray') {
      str = JSON.stringify(result.asArray(), null, 2)
    } else if (output === 'plaintext') {
      str = result.plaintext()
    } else {
      str = result.plaintext()
    }
    return r.div({}, [
      r.div({
        style: css.tabs
      }, [
        r.span('asHtml()'),
        r.span('plaintext()'),
        r.span('asArray()')
      ]),
      r.div({
        style: css.output
      }, [
        str
      ])
    ])
  }
}
module.exports = Output;
