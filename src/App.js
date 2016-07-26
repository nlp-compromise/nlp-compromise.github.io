import React, { Component } from 'react';
import Show from './show/show';

class Expo extends Component {
  render() {
    let def = {
      title: 'my demo',
      input: 'The blue dog jumps',
      context: {},
      methods: [
        {
          kind: 'to',
          method: 'Exclamation'
        }
      ],
      render: 'html',
      css: `
        .nlpAdjective{
          color:steelblue;
        }
      `
    }
    return (
      <div >
        <Show data={def}/>
      </div>
      );
  }
}

export default Expo;
