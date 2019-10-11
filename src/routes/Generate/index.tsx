import React, { Component } from "react";
import { Form, Input, Button, Tag } from "antd";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Bind } from "lodash-decorators";
import { login } from "../../services/user";
import notification from "../../utils/notification";
import { getResponse } from "../../utils/utils";
import { generator } from "../../services/db";

import styles from "./index.module.less";

type ColumnsObj = {
  columns: object[];
};
interface LoginProps {
  form: any;
  history: any;
  columnsState: ColumnsObj;
}
// interface ConnectState {
//   columnsState: object;
//   loading: object;
// }
const FormItem = Form.Item;
const { CheckableTag } = Tag;

class Generate extends Component<RouteComponentProps & LoginProps, any> {
  constructor(props: LoginProps & RouteComponentProps) {
    super(props);
    this.state = {
      columnsNameArr: props.columnsState.columns.map((i: any) => i.COLUMN_NAME)
    };
  }

  @Bind()
  public handleLogin() {
    const { columnsNameArr } = this.state;
    const {
      columnsState: { columns }
    } = this.props;
    generator({
      columns: columns.filter((item: { COLUMN_NAME: string }) =>
        columnsNameArr.includes(item.COLUMN_NAME)
      )
    });
  }

  @Bind()
  handleChangeTag(flag: boolean, name: string, allFlag: string = "") {
    const { columnsNameArr } = this.state;
    const {
      columnsState: { columns }
    } = this.props;
    if (allFlag === "all") {
      console.log(columnsNameArr, columns);
      if (columns.length === columnsNameArr.length) {
        this.setState({
          columnsNameArr: []
        });
      } else {
        this.setState({
          columnsNameArr: columns.map((i: any) => i.COLUMN_NAME)
        });
      }
    } else {
      let newColumnsNameArr = [];
      if (flag) {
        newColumnsNameArr = [...columnsNameArr, name];
      } else {
        newColumnsNameArr = columnsNameArr.filter((i: string) => i !== name);
      }
      this.setState({
        columnsNameArr: newColumnsNameArr
      });
    }
  }

  public render() {
    const { columnsNameArr } = this.state;
    const {
      form: { getFieldDecorator },
      columnsState: { columns }
    } = this.props;
    return (
      <div className={styles.wrapper}>
        <Form>
          <FormItem label="查询条件" help>
            {getFieldDecorator("name", {
              rules: [{ required: true }],
              initialValue: true,
              valuePropName: "checked"
            })(
              <div>
                <CheckableTag
                  checked={columnsNameArr.length === columns.length}
                  onChange={() => this.handleChangeTag(true, "", "all")}
                >
                  全选
                </CheckableTag>
                {columns.map((i: any) => (
                  <CheckableTag
                    checked={columnsNameArr.includes(i.COLUMN_NAME)}
                    key={i.COLUMN_NAME}
                    onChange={value =>
                      this.handleChangeTag(value, i.COLUMN_NAME)
                    }
                  >
                    {i.COLUMN_NAME}
                  </CheckableTag>
                ))}
              </div>
            )}
          </FormItem>
          {/* <FormItem label="列表" help>
            {getFieldDecorator("passWord", {
              rules: [{ required: true }]
            })(<Input />)}
          </FormItem> */}
          <FormItem>
            <Button htmlType="submit" type="primary" onClick={this.handleLogin}>
              下载
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

// export default withRouter(Form.create()(Generate));
// export default withRouter(

// );
export default connect(
  (state: any) => ({ columnsState: state.columns })
  // { addColumns: columnsActions.addColumns }
)(Form.create()(Generate));
