import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';
import Home from './Pages/Home';
import Header from './Pages/Header';

const { Footer, Content } = Layout;

class App extends Component {

	render() {		
		return (
			<Router>
				<Layout>
					<Header />
					<Content style={{ padding: '0 50px', marginTop: 64 }}>
						<Route exact path="/" component={Home}/>
						{/* <Route path="/about" component={About}/>
						<Route path="/topics" component={Topics}/> */}
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						Said Calculation @2018 Created by CP
					</Footer>
				</Layout>
			</Router>
		);
	}
}

export default App;