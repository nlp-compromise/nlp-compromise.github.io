import React from 'react';
import styler from 'react-styling';
import ChooseText from '../../shared/textarea/chooseText';

const style = styler`
  container
    margin-left:50
`

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.css = style
    this.onChange=this.onChange.bind(this)
  }
  onChange(obj){
    console.log(obj)
  }
  render() {
    let {css} = this
    return (
      <div style={css.container}>
        <ChooseText callback={this.onChange}/>
      </div>
    )
  }
}
module.exports = Text
