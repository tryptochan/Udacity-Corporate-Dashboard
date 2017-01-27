import React from 'react';
import ReactHighmaps from 'react-highcharts/ReactHighmaps.src';
import maps from './world-lowres.geo.json';

let config = {
  chart: {
    spacingBottom: 20,
    animation: false,
  	style: { fontFamily: 'sans-serif' }
  },
  title: { text: 'Geospatial distribution of employees' },

  legend: { enabled: false },

  plotOptions: {
    map: {
      dataLabels: {
        enabled: true,
        color: 'white',
        style: {
          fontWeight: 'bold'
        }
      },
      tooltip: { headerFormat: '' }
    },
  },
  colorAxis: { min: 0 },

  series: [{
    mapData: maps,
    joinBy: 'hc-key',
    data: []
  }]
};

function Demography(props) {
	if (props.data.length === 0) return null;
	config.series[0].data = props.data;
	return (<article>
		<ReactHighmaps config={config} />
		<p style={{float: 'right'}}>
		<small>Updated on {props.timestamp.toLocaleString()}</small></p>
		</article>
	)
}

export default Demography;
