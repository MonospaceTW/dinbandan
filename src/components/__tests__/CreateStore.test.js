import React from "react";
import PropTypes from "prop-types";
import CreateStore from "../CreateStore";
import initialState from "../../reducers/initialState";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { spy } from "sinon";
import { mount } from "enzyme";
import { cyan500 } from "material-ui/styles/colors";

const { describe, it, expect } = global;
const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500
  },
  appBar: {
    height: 60,
    zIndex: "20"
  }
});

describe("Create store page unitest", () => {
  it("should 檢查 Create store 流程", () => {
    const handleCreateStore = spy();

    const wrapper = mount(
      <CreateStore
        store={initialState.store}
        handleCreateStore={handleCreateStore}
      />,
      {
        context: { muiTheme },
        childContextTypes: { muiTheme: PropTypes.object }
      }
    );
    let state = wrapper.state();
    expect(state.data).toEqual({
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
    });
    wrapper
      .find("input[name='name']")
      .simulate("change", { target: { value: "unitest" } });
    expect(wrapper.state().data.name).toBe("unitest");
    wrapper
      .find("input[name='address']")
      .simulate("change", { target: { value: "彰化" } });
    expect(wrapper.state().data.address).toBe("彰化");
    wrapper
      .find("input[name='telblock']")
      .simulate("change", { target: { value: "04" } });
    expect(wrapper.state().data.tel.block).toBe("04");
    wrapper
      .find("input[name='telnum']")
      .simulate("change", { target: { value: "87654321" } });
    expect(wrapper.state().data.tel.num).toBe("87654321");
    wrapper.find("input[name='orderincount']").simulate("change", { target: { value: "20" } });
    expect(wrapper.state().data.orderIn.count).toBe("20");
  });

  it("should 測試 submit", () => {
    const handleCreateStore = spy();

    const wrapper = mount(
      <CreateStore
        store={initialState.store}
        handleCreateStore={handleCreateStore}
      />,
      {
        context: { muiTheme },
        childContextTypes: { muiTheme: PropTypes.object }
      }
    );
    console.log(wrapper.find(".formSubmit"));
  });
});
