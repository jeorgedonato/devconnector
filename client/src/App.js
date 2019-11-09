import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import 'typeface-roboto';
import Container from '@material-ui/core/Container';
//Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
	<Provider store={store}>
		<Router>
			<Fragment>
				<Navbar />
				<Route exact path='/' component={Landing} />
				<Container>
					<Switch>
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</Container>
			</Fragment>
		</Router>
	</Provider>
);

export default App;