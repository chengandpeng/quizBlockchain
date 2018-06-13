import React, { Component } from 'react'
import factory from '../../ethereum/factory';
import { Button } from 'antd';

export default class Home extends Component {
	render() {
		console.log(factory);
		return (
			<div style={{ height: '100%' }}>
                lalala
				<Button type="primary">lala</Button>
			</div>
		)
	}
}
