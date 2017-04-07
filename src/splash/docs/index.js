import React, { Component } from 'react';
import Radium from 'radium';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import Tabs from 'react-mdl/lib/Tabs/Tabs';
import Tab from 'react-mdl/lib/Tabs/Tab';
import styler from 'react-styling/flat';
import ChooseText from '../../shared/textarea/chooseText';

import Basic from './basic.js';
import Subset from './subset.js';
import Links from './links.js';

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
      tab: 2
    };
    this.css = style;
    this.changeTab = this.changeTab.bind(this)
    this.tabs = [
      <Links />,
      <Basic />,
      <Subset />,
      <div/>,
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
      <div >
          <Tabs style={css.tabs} activeTab={state.tab} onChange={this.changeTab} ripple>
              <Tab>Links</Tab>
              <Tab>Basic Usage</Tab>
              <Tab>Subsets</Tab>
              <Tab>Matches</Tab>
              <Tab>Extending</Tab>
              <Tab>Verbs</Tab>
              <Tab>Values</Tab>
          </Tabs>
          <section>
              {this.tabs[state.tab]}
          </section>
      </div>


      </div>
    )
  }
}

TheTabs = Radium(TheTabs);
module.exports = TheTabs
