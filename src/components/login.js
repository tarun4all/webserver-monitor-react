import React, { Component } from 'react';
import { Input, Button, Card, Table, Alert } from 'antd';
import $ from "jquery";
import 'antd/dist/antd.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
        otp: '',
        otpWait: false,
        login: false,
        user: '',
        data: []
    };
  }

  customAjax = (url, params) => {
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        data: params,
        success: (json) => {
            if(json.msg == 'OTP Sent') {
                this.setState({
                    otpWait: true,
			        sess: json.otp
                });
            } else if(json.msg == 'loginDone') {
                this.setState({
                    login: true,
                    user: json.id
                })
		        this.dashboard();
            } else if(Array.isArray(json)) {
                this.setState({
                    data: json,
                })
            } else if(json.msg == 'No data') {
                this.setState({
                    data: [],
                })
            }
        }
    });
  }

  dashboard = () => {
    this.customAjax('http://localhost:5000/api/fetch', {
        user: this.state.user
    });
  }

  login = () => {
    if(!document.getElementById('email')) {
        alert("Enter email or phone");
    } else {
        this.customAjax('http://localhost:5000/api/login', {
            contact: document.getElementById('email').value,
        });
    }
  }

  verifyOTP = () => {
    if(!document.getElementById('otp')) {
        alert("Enter otp");
    } else {
        this.customAjax('http://localhost:5000/api/verifyOTP', {
            otp: document.getElementById('otp').value, session: this.state.sess
        });
    }
  }

  render() {
      var columns = [], data = [];
      if(this.state.data.length > 0) {
         columns = [
            {
              title: 'Url',
              dataIndex: 'url',
              key: 'url',
            },
            {
              title: 'Id',
              dataIndex: 'id',
              key: 'id',
            },
          ];
         data = [];
        this.state.data.forEach((el, idx) => {
            let obj = {url: el.site, id: el._id, key: idx};
            data.push(obj);
        })
      }
    return (
       <div style={{"textAlign": "center", "width": '70%'}}>
            <center>
                {this.state.login ? <div><Table dataSource={data} columns={columns} /></div> :
                    <div>
                        <Card style={{ width: '100%', "marginTop":'10%' }}>
                            <div style={{"textAlign": "center"}}>
                                <Input id="email" placeholder="Enter Email or Phone" />
                                {!this.state.otpWait ? <Button type="primary" onClick={this.login}>Send OTP</Button> : 
                                    <div>
                                        <Input id="otp" placeholder="Enter otp" />
                                        <Button type="primary" onClick={this.verifyOTP}>Login</Button>
                                    </div>
                                }
                            </div>
                        </Card>
                    </div>
                }
            </center>
       </div>
    );
  }
}

export default Login;
