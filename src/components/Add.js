import React, { Component } from 'react';
import styled from 'styled-components';

const Submit = styled.button``;
export default class Add extends Component {
	constructor(props) {
		super(props);
		this.state = { storeName: '' };
		this._Change = this._Change.bind(this);
	}

	_Change(evt) {
		this.setState({ storeName: evt.target.value });
	}

	render() {
		return (
			<div>
				請輸入商店名稱
				<input type="text" value={this.state.storeName} onChange={this._Change} />
				<Submit onClick={() => this.props._AddNewStore(this.state.storeName)}>新增</Submit>
			</div>
		);
	}
}
