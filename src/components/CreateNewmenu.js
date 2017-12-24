import React from "react";
import propTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import uuid from "uuid/v4";
import FirebaseManager from "../utils/FirebaseManager";

class CreateNewmenu extends React.Component {
  state = {
    name: "",
    price: 0,
    count: 0
  };
  submit = () => {
    console.log("create new cuisine");
    FirebaseManager.createNewCuisine({ ...this.state }).catch(error =>
      console.log(error)
    );
  };
  render() {
    return (
      <div>
        <fieldset>CreateNewmenu</fieldset>
        <div>
          <lable>菜色名稱</lable>
          <TextField
            name="name"
            defaultValue={this.state.name}
            onBlur={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div>
          <lable>價格</lable>
          <TextField
            type="tel"
            name="price"
            defaultValue={this.state.price}
            onBlur={e => this.setState({ price: e.target.value })}
          />
        </div>
        <div>
          <lable>每份數量</lable>
          <TextField
            type="tel"
            name="count"
            defaultValue={this.state.count}
            onBlur={e => this.setState({ count: e.target.value })}
          />
        </div>
        <div>
          <RaisedButton
            label="新增"
            labelPosition="before"
            containerElement="label"
            onClick={this.submit}
          />
        </div>
      </div>
    );
  }
}

export default CreateNewmenu;
