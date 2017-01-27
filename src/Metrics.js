import React from 'react';
import ReactHighcharts from 'react-highcharts';
import { Grid, Row, Col } from 'react-bootstrap';
import './Metrics.css'

let config_line = {
  chart: { 
  	animation: false,
  	className: 'metric-chart',
  	style: { fontFamily: 'sans-serif' }
  },
  xAxis: {
    categories: []
  },
  yAxis: {
    labels: { format: '{value} k' },
    title: { text: 'Numbers' }
  },
  legend: { enabled: false },
  title: {text: 'Number of paying customers over time'},
  tooltip: {
    headerFormat: '<span style="font-size: 16px; font-weight:bold;">{point.key}</span><br/>',
    pointFormat: '{series.name}: <b>{point.y}</b> k'
  },
  series: [{
    type: 'line',
    name: 'Paying Customers',
    data: []
  }]
};

let config_bar = {
  chart: { 
  	animation: false,
  	className: 'metric-chart',
  	style: { fontFamily: 'sans-serif' }
  },
  xAxis: {
    categories: []
  },
  yAxis: {
    title: { text: 'Numbers' }
  },
  legend: { enabled: false },
  title: {text: 'Number of issues over time'},
  tooltip: {
    headerFormat: '<span style="font-size: 16px; font-weight:bold;">{point.key}</span><br/>',
    pointFormat: '{series.name}: <b>{point.y}</b> k'
  },
  series: [{
    type: 'column',
    name: 'Reported Issues',
    data: []
  }]
};

function Metrics(props) {
	if (props.data.length === 0) return null;
	config_line.xAxis.categories = props.data.users.months;
	config_line.series[0].data = props.data.users.number;
	config_bar.xAxis.categories = props.data.issues.months;
	config_bar.series[0].data = props.data.issues.number;
	return (
		<article>
		<Grid><Row>
		<Col xs={12} sm={12} md={12} lg={2}>
		<div className='issue-num-wrapper'>
		<h4 className='issue-num-header'>Open issues:</h4>
		<div className='issue-num'><span>{props.data.openIssues}</span></div>
		</div>
		</Col>
		<Col xs={12} sm={12} md={6} lg={5}>
		<ReactHighcharts config={config_line} />
		</Col>
		<Col xs={12} sm={12} md={6} lg={5}>
		<ReactHighcharts config={config_bar} />
		</Col>
		</Row></Grid>
		<p style={{float: 'right'}}>
		<small>Updated on {props.timestamp.toLocaleString()}</small>
		</p>
		</article>
	)
}

export default Metrics;