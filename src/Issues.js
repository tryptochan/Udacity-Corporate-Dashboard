import React from 'react';
import { Table, Tr, Td } from 'reactable';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Issues extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: ''
		}
	}

	render() {
		if (this.props.data.length === 0) return null;
		return (
			<article>
			<h4 style={{textAlign: 'center'}}>Table of all issues</h4>
			<Form inline style={{marginTop: 20}}>
			<FormGroup controlId='filter-keyword'>
				<ControlLabel>Filter by </ControlLabel>
				<FormControl type='text' style={{width: 200, marginLeft: 10}} 
					inputRef={ref => this.keyword = ref}
					onChange={() => this.setState({keyword: this.keyword.value})}/>
			</FormGroup>
			</Form>
			<div style={{overflowX: 'auto'}} >
			<Table className='table' sortable={true}
			  filterable={['Customer name', 'Customer email', 'Description',
			  	'Status', 'Employee name']}
			  hideFilterInput
			  filterBy={this.state.keyword}
			>
				{this.props.data.map(row => {
					return (
					<Tr key={row.submissionTime}>
						<Td column='Submission timestamp'>{row.submissionTime}</Td>
						<Td column='Customer name'>{row.customerName}</Td>
						<Td column='Customer email'>{row.customerEmail}</Td>
						<Td column='Description'>{row.description}</Td>
						<Td column='Status'>{row.status}</Td>
						<Td column='Closed timestamp'>{row.closedTime}</Td>
						<Td column='Employee name'>{row.employeeName}</Td>
					</Tr>
					)
				})}
			</Table>
			</div>
			<p style={{float: 'right'}}>
			<small>Updated on {this.props.timestamp.toLocaleString()}</small>
			</p>
			</article>
		)
	}
}

export default Issues;