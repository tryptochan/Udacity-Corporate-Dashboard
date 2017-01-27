import React, { Component } from 'react';
import { Navbar, Tabs, Tab, Label } from 'react-bootstrap';
import parse from 'csv-parse';
import './bootstrap.css';
import Demography from './Demography';
import Metrics from './Metrics';
import Issues from './Issues';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabKey: 1,
      demographyData: [],
      metricsData: [],
      issuesData: [],
      updatedTime: {},
      updated: {1: false, 2: false, 3: false}
    };
    this.titles = {
      1: 'Demography',
      2: 'Key Metrics',
      3: 'Issues'
    };
    this.fetchDemographyData('/demography.csv');
    this.fetchMetricsData('/metrics.json');
    this.fetchIssuesData('/issues.json');
    this.connect();
  }

  connect() {
    this.ws = new WebSocket('ws://localhost:3001');
    this.ws.addEventListener('open', () => {
      this.ws.send('Hello')
    });
    this.ws.addEventListener('error', () => {
      setTimeout(this.connect(), 2000);
    });
    this.ws.addEventListener('message', (event) => {
      const { view, url } = JSON.parse(event.data);
      switch (view) {
        case 'demography':
          this.fetchDemographyData(url);
          break;
        case 'metrics':
          this.fetchMetricsData(url);
          break;
        case 'issues':
          this.fetchIssuesData(url);
          break;
        default:
      }
    })
  }

  fetchDemographyData(url) {
    fetch(url).then(response => response.text())
    .then(data => {
      parse(data, {auto_parse: true}, (err, data) => {
        this.setState({
          demographyData: data,
          updatedTime: Object.assign(this.state.updatedTime, {1: new Date()}),
          updated: Object.assign(this.state.updated, {1: this.state.tabKey !== 1})
        });
      })
    });
  }

  fetchMetricsData(url) {
    fetch(url).then(response => response.json())
    .then(json => this.setState({
      metricsData: json,
      updatedTime: Object.assign(this.state.updatedTime, {2: new Date()}),
      updated: Object.assign(this.state.updated, {2: this.state.tabKey !== 2})
    }))
  }

  fetchIssuesData(url) {
    fetch(url).then(response => response.json())
    .then(json => this.setState({
      issuesData: json,
      updatedTime: Object.assign(this.state.updatedTime, {3: new Date()}),
      updated: Object.assign(this.state.updated, {3: this.state.tabKey !== 3})
    }))
  }

  handleSelect(key) {
    this.setState({
      tabKey: key,
      updated: Object.assign(this.state.updated, {[key]: false})
    }) 
  }

  render() {
    return (
      <div className="App">
      <Navbar>
      <Navbar.Header><Navbar.Brand>
        Corporate Dashboard: {this.titles[this.state.tabKey]}
      </Navbar.Brand></Navbar.Header>
      </Navbar>
      <main>
        <Tabs activeKey={this.state.tabKey} id='dashboard-tabs'
          onSelect={(key) => this.handleSelect(key)}
          style={{margin: '0 10px'}}
        >
        <Tab eventKey={1}
          title={<span>{this.titles[1]} {this.state.updated[1] && <Label>New</Label>}</span>}
        >
          <Demography data={this.state.demographyData} timestamp={this.state.updatedTime[1]}/>
        </Tab>
        <Tab eventKey={2}
          title={<span>{this.titles[2]} {this.state.updated[2] && <Label>New</Label>}</span>}
        >
          <Metrics data={this.state.metricsData} timestamp={this.state.updatedTime[2]}/>
        </Tab>
        <Tab eventKey={3}
          title={<span>{this.titles[3]} {this.state.updated[3] && <Label>New</Label>}</span>}
        >
          <Issues data={this.state.issuesData} timestamp={this.state.updatedTime[3]}/>
        </Tab>
        </Tabs>
        </main>
      </div>
    );
  }
}

export default App;
