import React, { Component } from 'react';
import { cyan500, blue800, white, red900 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import RightIconButton from './components/RightIconButton';
import TextField from 'material-ui/TextField';
import firebase from 'firebase';
import Modal from 'react-modal';
import FontIcon from 'material-ui/FontIcon';
import styled from 'styled-components';
import _ from 'lodash';
import Store from './Store';
const LoginContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const muiTheme = getMuiTheme({
	palette: {
		textColor: cyan500
	},
	appBar: {
		height: 50,
		zIndex: '20'
	}
});

// const config = {
// 	apiKey: 'AIzaSyCJshSB2O3ZG84vRqT9hOMJPDtQXQqOY7U',
// 	authDomain: 'dinbandan-46e8c.firebaseapp.com',
// 	databaseURL: 'https://dinbandan-46e8c.firebaseio.com',
// 	storageBucket: 'dinbandan-46e8c.appspot.com',
// 	messagingSenderId: '544525397793',
// 	projectId: 'dinbandan-46e8c'
// };

var config = {
	apiKey: 'AIzaSyDua0iSQ9uvwcvUzA5L5BXuCr8-ihfXzrE',
	authDomain: 'dinbandan-3ac54.firebaseapp.com',
	databaseURL: 'https://dinbandan-3ac54.firebaseio.com',
	projectId: 'dinbandan-3ac54',
	storageBucket: 'dinbandan-3ac54.appspot.com',
	messagingSenderId: '266464659229'
};

firebase.initializeApp(config);

const auth = firebase.auth;
const provider = new firebase.auth.FacebookAuthProvider();

provider.addScope('');
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			LOGON: 'NONE',
			user: {},
			LoginModal: false,
			account: '',
			password: '',
			accountErrorText: '',
			passwordErrorText: ''
		};
	}

	login = async () => {
		try {
			await this.logout();
			const result = await auth().signInWithPopup(provider);
			this.setState({ user: result.user, LOGON: 'LOGON', LoginModal: false });
		} catch (error) {
			this.setState({ LoginModal: false });
		}
	};

	loginWithEmail = async () => {
		const { account, password } = this.state;
		if (_.isEmpty(account)) {
			this.setState({ accountErrorText: '帳號不可為空' });
		} else if (_.isEmpty(password)) {
			this.setState({ passwordErrorText: '帳號不可為空' });
		} else {
			try {
				const user = await firebase.auth().signInWithEmailAndPassword(account, password);
				this.setState({ user, LOGON: 'LOGON', LoginModal: false });
			} catch (error) {
				const user = await firebase.auth().createUserWithEmailAndPassword(account, password);
				this.setState({ user, LOGON: 'LOGON', LoginModal: false });
			}
		}
	};

	logout = async () => {
		await auth().signOut();
		this.setState({ user: {}, LOGON: 'NONE' });
	};

	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<Modal
						ariaHideApp={false}
						isOpen={this.state.LoginModal}
						style={{
							overlay: {
								height: '100vh',
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: 'rgba(0, 0, 0, 0.75)'
							},
							content: {
								marginLeft: '30vw',
								marginTop: '30vh',
								width: '30vw',
								height: '30vh'
							}
						}}
						contentLabel="Modal"
					>
						<LoginContent>
							<div>
								<TextField
									hintText="Account"
									type="email"
									errorText={this.state.accountErrorText}
									value={this.state.account}
									onChange={(e) => this.setState({ account: e.target.value })}
								/>
								<TextField
									hintText="Password"
									floatingLabelText="Password"
									errorText={this.state.passwordErrorText}
									type="password"
									value={this.state.password}
									onChange={(e) => this.setState({ password: e.target.value })}
								/>
								<RaisedButton
									label="登入"
									onClick={this.loginWithEmail}
									backgroundColor={blue800}
									labelColor={white}
								/>
							</div>
							<div>
								<RaisedButton
									label="FacebookLogin"
									onClick={this.login}
									style={{ margin: 10 }}
									primary={true}
									icon={<FontIcon className="fa fa-facebook" color={white} />}
								/>
							</div>
							<div>
								<RaisedButton
									label="取消"
									onClick={() => this.setState({ LoginModal: false })}
									backgroundColor={red900}
									labelColor={white}
								/>
							</div>
						</LoginContent>
					</Modal>
					<AppBar
						title="訂便當"
						onLeftIconButtonClick={() => console.log('left icon')}
						iconElementLeft={<IconButton iconClassName="fa fa-bars" />}
						iconElementRight={
							<RightIconButton
								logout={this.logout}
								setLoginModal={() => this.setState({ LoginModal: true })}
								LOGON={this.state.LOGON}
								user={this.state.user}
							/>
						}
					/>

					<Store />
				</div>
			</MuiThemeProvider>
		);
	}
}
