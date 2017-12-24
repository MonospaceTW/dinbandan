import React, { Component } from 'react';

export default class ListTable extends Component {
	render() {
		console.log(this.props.storeList);
		return this.props.storeList.map((v, i) => {
			return (
				<div key={v.StoreKey}>
					<input onClick={() => this.props._Delete(v.StoreKey)} value="刪除" type="button" />
					廠商名稱 {v.storeName}
				</div>
			);
		});
	}
}
