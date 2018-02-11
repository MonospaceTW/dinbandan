import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import Image from "react-image";
import TimePicker from "material-ui/TimePicker";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import FirebaseManager from "../../utils/FirebaseManager";
import { Grid, Row, Col } from "react-flexbox-grid";

const ImageItem = styled(Image)`
  width: 100%;
  height: 100%;
`;

const TelBlockContainer = styled.span`
  width: 80px;
  margin-right: 20px;
`;
const OrderInCountTextField = styled(TextField)`
  width: 80px;
`;

class CreateStore extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        logo: {
          url: "https://ostarmotorsports.com/images/Unavailable/256px-No_image_available.svg.png",
          route: ""
        },
        name: "",
        address: "",
        orderIn: {
          unit: "元",
          count: 1
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
    const {data} = this.state;
    const response = await FirebaseManager.uploadFile(file);
    data.logo.url = response.url;
    data.logo.route = response.route;
    this.setState({data: {...data}});
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <Grid style={{ width: "80%", marginTop: 20 }}>
        <div>
          <div>
            <Dropzone onDrop={files => this.uploadImage(files[0])}>
              <ImageItem
                onLoad={() => console.log("load")}
                src={data.logo.url}
              />
            </Dropzone>
          </div>
          <div>
            <TextField
              hintText="請輸入店名"
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
              hintText="請輸入地址"
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
                hintText="請輸入區碼"
                style={{ width: 80 }}
                value={data.tel.block}
              />
            </TelBlockContainer>
            <span>
              <TextField hintText="請輸入號碼或手機" value={data.tel.num} />
            </span>
          </div>
          <Row>
            <Col xs={5} md={3}>
              <TimePicker
                format="24hr"
                hintText="開始營業時間"
                value={data.time.start}
                onChange={console.log}
              />
            </Col>
            <Col xs={5} md={3}>
              <TimePicker
                format="24hr"
                hintText="結束營業時間"
                value={data.time.end}
                onChange={console.log}
              />
            </Col>
          </Row>
          <div>
            <div>
              <OrderInCountTextField
                style={{ width: 50 }}
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
            </div>
            <div>
              <SelectField
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
              </SelectField>
            </div>
          </div>
          <div>
            <RaisedButton label="新增" primary={true} style={{ margin: 12 }} />
          </div>
        </div>
      </Grid>
    );
  }
}

export default CreateStore;
