import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import notification from "../../utils/notification";
import { getResponse } from "../../utils/utils";
import { register } from "../../services/user";
import * as columnsActions from "../../actions/columns"; // shadow name problem must to import *
import { Bind } from "lodash-decorators";
import styles from "./index.module.less";

interface RegisterProps {
  form: any;
  addColumns: any;
}

const FormItem = Form.Item;
class WorkSpace extends Component<RegisterProps & RouteComponentProps> {
  @Bind()
  public handleRegister() {
    const {
      addColumns,
      form: { validateFields }
    } = this.props;
    validateFields((err: object, values: object) => {
      if (!err) {
        register(values).then(res => {
          const result = getResponse(res);
          if (result) {
            addColumns(result);
            notification.success();
            this.props.history.push(`/generate`);
          }
        });
      }
    });
  }
  public render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className={styles.wrapper}>
        <Form>
          <FormItem label="数据库ip" help>
            {getFieldDecorator("ip", {
              rules: [{ required: true }]
            })(<Input />)}
          </FormItem>
          <FormItem label="端口号" help>
            {getFieldDecorator("port", {
              initialValue: 3306
            })(<Input />)}
          </FormItem>
          <FormItem label="用户名" help>
            {getFieldDecorator("passWord", {
              rules: [{ required: true }]
            })(<Input />)}
          </FormItem>
          <FormItem label="密码" help>
            {getFieldDecorator("passWord", {
              rules: [{ required: true }]
            })(<Input />)}
          </FormItem>
          <FormItem>
            <Button
              htmlType="submit"
              type="primary"
              onClick={this.handleRegister}
            >
              注册
            </Button>
            <Link style={{ marginLeft: "10px" }} to="/login">
              登录
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (state: any) => ({ columnsState: state.columns }),
    { addColumns: columnsActions.addColumns }
  )(Form.create()(WorkSpace))
);
