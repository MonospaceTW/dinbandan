import React from "react";
import moment from "moment";
import propTypes from "prop-types";
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
import { grey500, red500 } from "material-ui/styles/colors";

const TelBlockContainer = styled.span`
  width: 80px;
  margin-right: 20px;
`;

const Input = styled.input`
  width: ${props => props.width || "200px"};
  height: 22px;
  font-size: 0.9em;
  line-height: 1.2em;
  border: 0px solid white;
  border-bottom: 1px solid ${grey500};
  &::placeholder {
    color: ${props => props.error ? red500 : grey500};
  }
  &:focus{
    &::placeholder {
      color: ${grey500}
    }
  }
`;

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
      data.time.start = moment(data.time.start).format("hh:ss");
      data.time.end = moment(data.time.end).format("hh:ss");
      console.log(data.time);
      // this.props.handleCreateStore({
      //   data
      // });
    }
  };

  render() {
    const { data, imageLoading } = this.state;
    const { store, history } = this.props;

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
            <Input
              name="name"
              placeholder="請輸入店名"
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
            <Input
              name="address"
              placeholder="請輸入地址"
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
              <Input
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
                placeholder="請輸入區碼"
                width="80px"
                value={data.tel.block}
              />
            </TelBlockContainer>
            <span>
              <Input
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
                placeholder="請輸入電話"
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
              <Input
                name="orderincount"
                width="80px"
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
            <RaisedButton
              label="取消"
              primary={true}
              style={{ margin: 12 }}
              onClick={() => history.push("/store")}
            />
          </div>
        </div>
      </Grid>
    );
  }
}

export default CreateStore;
