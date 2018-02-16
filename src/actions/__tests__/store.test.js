import * as StoreAction from "../../actions/store";
import types from "../../constants/actionTypes";

const { describe, it, expect } = global;

describe("auth action unitest", () => {
  it("should test create store action", () => {
    const payload = {
      data: {
        logo: {
          url: "https://google.com.tw",
          route: "stores/test"
        },
        name: "阿三的店",
        address: "台中市台灣大道二段二號十六樓",
        orderIn: {
          unit: "元",
          count: 300
        },
        tel: {
          block: "02",
          num: "2233222"
        },
        time: {
          start: "09:00",
          end: "11:00"
        },
        mark: "備註",
        menus: [],
        options: []
      }
    };
    const expectedAction = {
      type: types.CREATE_STORE,
      payload
    };
    expect(StoreAction.handleCreateStore(payload)).toEqual(expectedAction);
  });
});
