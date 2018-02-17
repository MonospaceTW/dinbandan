import React from "react";
import propTypes from "prop-types";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import styled from "styled-components";
import TimePicker from "material-ui/TimePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FirebaseManager from "../../utils/FirebaseManager";
import ImageHandler from "./ImageHandler";
import { Map } from "immutable";
import { Grid, Row, Col } from "react-flexbox-grid";
import { isEmpty } from "lodash";

const TelBlockContainer = styled.span`
  width: 80px;
  margin-right: 20px;
`;
const OrderInCountTextField = styled(TextField)``;

const OrderInSelectField = styled(SelectField)`
  width: 50px;
`;

class CreateStore extends React.Component {
  static propTypes = {
    store: propTypes.instanceOf(Map).isRequired,
    handleCreateStore: propTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      imageLoading: false,
      errors: {
        logo: "",
        name: "",
        address: "",
        telBlock: "",
        telNum: "",
        timeStart: "",
        timeEnd: ""
      },
      data: {
        logo: {
          url: undefined,
          route: ""
        },
        name: "",
        address: "",
        orderIn: {
          unit: "元",
          count: 0
        },
        tel: {
          block: "",
          num: ""
        },
        time: {
          start: "",
          end: ""
        },
        mark: "",
        menus: [],
        options: []
      }
    };
  }

  uploadImage = async file => {
    this.setState({ imageLoading: true });
    const { data } = this.state;
    const response = await FirebaseManager.uploadFile(file);
    data.logo.url = response.url;
    data.logo.route = response.route;
    this.setState({ data: { ...data }, imageLoading: false });
  };

  submit = data => {
    let error = false;
    const errors = {
      logo: "",
      name: "",
      address: "",
      telBlock: "",
      telNum: "",
      timeStart: "",
      timeEnd: ""
    };
    if (isEmpty(data.name)) {
      error = true;
      errors.name = "店名不可為空";
    }
    if (isEmpty(data.address)) {
      error = true;
      errors.address = "密碼不可為空";
    }
    if (isEmpty(data.logo.route)) {
      errors.logo = "商店圖片不可為空";
      error = true;
    }
    if (isEmpty(data.tel.num)) {
      error = true;
      errors.telNum = "商店電話不可為空";
    }
    if (error === true) {
      return this.setState({ errors });
    } else {
      this.props.handleCreateStore({
        data
      });
    }
  };

  render() {
    const { data, errors, imageLoading } = this.state;
    const { store } = this.props;

    return (
      <Grid style={{ width: "60%", marginTop: 20 }}>
        <div>
          <div>
            <ImageHandler
              uploadImage={this.uploadImage}
              isFetching={store.get("isFetching")}
              isLoading={imageLoading}
              image={data.logo.url}
            />
          </div>
          <div>
            <TextField
              name="name"
              hintText="請輸入店名"
              errorText={errors.account}
              value={data.name}
              onChange={e => {
                const newData = {
                  ...data,
                  name: e.target.value
                };
                this.setState({ data: newData });
              }}
            />
          </div>
          <div>
            <TextField
              name="address"
              hintText="請輸入地址"
              errorText={errors.password}
              value={data.address}
              onChange={e => {
                const newData = {
                  ...data,
                  address: e.target.value
                };
                this.setState({ data: newData });
              }}
            />
          </div>
          <div>
            <TelBlockContainer>
              <TextField
                name="telblock"
                onChange={e => {
                  const { data } = this.state;
                  const newData = {
                    ...data,
                    tel: {
                      ...data.tel,
                      block: e.target.value
                    }
                  };
                  this.setState({ data: newData });
                }}
                hintText="請輸入區碼"
                style={{ width: 80 }}
                value={data.tel.block}
              />
            </TelBlockContainer>
            <span>
              <TextField
                name="telnum"
                value={data.tel.num}
                onChange={e => {
                  const { data } = this.state;
                  const newData = {
                    ...data,
                    tel: {
                      ...data.tel,
                      num: e.target.value
                    }
                  };
                  this.setState({ data: newData });
                }}
                errorText={errors.telNum}
                hintText="請輸入號碼或手機"
                value={data.tel.num}
              />
            </span>
          </div>
          <Row>
            <Col xs={5} md={3}>
              <TimePicker
                format="24hr"
                hintText="開始營業時間"
                onChange={(err, date) => {
                  if (err) {
                    console.log(err);
                  }
                  const { data } = this.state;
                  const newData = {
                    ...data,
                    time: {
                      ...data.time,
                      start: date
                    }
                  };
                  this.setState({ data: newData });
                }}
              />
            </Col>
            <Col xs={5} md={3}>
              <TimePicker
                format="24hr"
                hintText="結束營業時間"
                onChange={(err, date) => {
                  if (err) {
                    console.log(err);
                  }
                  const { data } = this.state;
                  const newData = {
                    ...data,
                    time: {
                      ...data.time,
                      end: date
                    }
                  };
                  this.setState({ data: newData });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center", marginTop: 10 }} xs={1} md={1}>
              外送條件:
            </Col>
            <Col xs={3} md={3}>
              <OrderInCountTextField
                name="orderincount"
                style={{ width: 80 }}
                type="number"
                value={data.orderIn.count}
                onChange={e => {
                  const newData = {
                    ...data,
                    orderIn: {
                      ...data.orderIn,
                      count: e.target.value
                    }
                  };
                  this.setState({ data: newData });
                }}
              />
            </Col>
            <Col xs={1} md={1}>
              <OrderInSelectField
                name="orderunit"
                value={data.orderIn.unit}
                onChange={(event, index, value) => {
                  const newData = {
                    ...data,
                    orderIn: {
                      ...data.orderIn,
                      unit: value
                    }
                  };
                  this.setState({ data: newData });
                }}
                autoWidth={true}
              >
                <MenuItem value="份" primaryText="份" />
                <MenuItem value="元" primaryText="元" />
              </OrderInSelectField>
            </Col>
          </Row>
          <div>
            <RaisedButton
              label="新增"
              className="formSubmit"
              primary={true}
              style={{ margin: 12 }}
              onClick={() => this.submit(data)}
            />
          </div>
        </div>
      </Grid>
    );
  }
}

export default CreateStore;
