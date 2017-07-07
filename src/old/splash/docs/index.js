import React, { Component } from 'react';
import Radium from 'radium';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import Tabs from 'react-mdl/lib/Tabs/Tabs';
import Tab from 'react-mdl/lib/Tabs/Tab';
import styler from 'react-styling/flat';
import ChooseText from '../../shared/textarea/chooseText';

import Install from './install.js';
import Links from './links.js';
import Basic from './basic.js';
import Subset from './subset.js';
import Match from './match.js';
import Extend from './extend.js';
import Api from './api.js';

const style = styler`
container:
  marginTop:65
tabs:
  font-family: 'Raleway', serif;
`
class TheTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: 0
    };
    this.css = style;
    this.changeTab = this.changeTab.bind(this)
    this.tabs = [
      <Install />,
      <Basic />,
      <Subset />,
      <Match/>,
      <Extend />,
    // <Api />,
    // <Links />,
    ]
  }
  changeTab(tabId) {
    this.setState({
      tab: tabId
    })
  }
  render() {
    let {css, state} = this;
    return (
      <div>
          <Tabs style={css.tabs} activeTab={state.tab} onChange={this.changeTab}>
              <Tab>Install</Tab>
              <Tab>Basic Usage</Tab>
              <Tab>Subsets</Tab>
              <Tab>Matches</Tab>
              <Tab>Extending</Tab>
          </Tabs>
          <div>
            {this.tabs[state.tab]}
          </div>
          <Api />
          <Links />
      </div>
    )
  }
}

TheTabs = Radium(TheTabs);
module.exports = TheTabs
