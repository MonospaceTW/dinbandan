import React from 'react';
//import style from 'styled-components';
import firebase from 'firebase';
import Add from './Add';
import ListTable from './ListTable';
import _ from 'lodash';
const config = {
	apiKey: 'AIzaSyCJshSB2O3ZG84vRqT9hOMJPDtQXQqOY7U',
	authDomain: 'dinbandan-46e8c.firebaseapp.com',
	databaseURL: 'https://dinbandan-46e8c.firebaseio.com',
	storageBucket: 'dinbandan-46e8c.appspot.com',
	messagingSenderId: '544525397793',
	projectId: 'dinbandan-46e8c'
};
if (firebase.apps.length < 0) {
	firebase.initializeApp(config);
}

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = { list: [] };
	}
	async componentDidMount() {
		//console.log(firebase);
		var snapshot = await firebase.database().ref('/stores/').once('value').then(function(snapshot) {
			return snapshot.val();
		});
		this.setState({ list: snapshot });

		firebase.database().ref('/stores/').on('value', (snapshot) => {
			let storeList = _.values(snapshot.val());
			// let storeList = _.values(newList);
			this.setState({ list: storeList });

			//return snapshot.val();
		});

		// var StoreRef = firebase.database().ref('stores/')
		// StoreRef.on('child_added', (data)=>{
		// 	let storeList = _.values(this.state.list);
		// 	this.setState({ list: storeList });

		// });
	}

	_Delete = async (StoreKey) => {
		var snapshot = await firebase.database().ref('/stores/').child(StoreKey).remove();
		// console.log(snapshot);
		// this.setState({ list: snapshot });
	};
	_AddNewStore = async (storeName) => {
		//var newPostKey = firebase.database().ref().child('posts').push().key;
		var newStoreKey = await firebase.database().ref().child('stores').push().key;
		var updates = {};
		updates['/stores/' + newStoreKey] = {
			storeName: storeName,
			StoreKey: newStoreKey
		};
		var snapshot = await firebase.database().ref().update(updates);
		//this.setState({ list: snapshot });
	};

	render() {
		//console.log(this.state.list);

		let storeList = _.values(this.state.list);
		// console.log('storeList');
		// console.log(storeList);
		return (
			<div>
				廠商列表
				<ListTable storeList={storeList} _Delete={this._Delete} />
				<Add firebase={firebase} _AddNewStore={this._AddNewStore} />
			</div>
		);
	}
}

export default List;
