import React, { Component } from "react";
import { Form, Input, Button, Tag } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Bind } from "lodash-decorators";
import { login } from "../../services/user";
import notification from "../../utils/notification";
import { getResponse } from "../../utils/utils";

import styles from "./index.module.less";

type ColumnsObj = {
  columns: object[];
};
interface LoginProps {
  form: any;
  history: any;
  columnsState: ColumnsObj;
}
interface ConnectState {
  columnsState: object;
  loading: object;
}
const FormItem = Form.Item;
const { CheckableTag } = Tag;

@connect(({{ login, loading }: ConnectState}) => ({
  columnsState: state.columns
}))
class Generate extends Component<LoginProps> {
  @Bind()
  public handleLogin() {
    const {
      form: { validateFields }
    } = this.props;
    validateFields((err: object, values: object) => {
      if (!err) {
        login(values).then(res => {
          const result = getResponse(res);
          if (result) {
            const { _id } = result.content;
            notification.success();
            const path = {
              pathname: `/todo/${_id}`
              // state: {
              //   name: 'huangbin',
              //   age: 23
              // },
              // search: 'name=huang&age=23'
            };
            this.props.history.push(path);
          }
        });
      }
    });
  }
  public render() {
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
                {columns.map((i: any) => (
                  <CheckableTag key={i.COLUMN_NAME}>
                    {i.COLUMN_NAME}
                  </CheckableTag>
                ))}
              </div>
            )}
          </FormItem>
          <FormItem label="列表" help>
            {getFieldDecorator("passWord", {
              rules: [{ required: true }]
            })(<Input />)}
          </FormItem>
          <FormItem>
            <Button htmlType="submit" type="primary" onClick={this.handleLogin}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

// export default withRouter(Form.create()(Generate));
// export default withRouter(
//   connect(
//     (state: any) => ({ columnsState: state.columns })
//     // { addColumns: columnsActions.addColumns }
//   )(Form.create()(Generate))
// );
export default Generate;
