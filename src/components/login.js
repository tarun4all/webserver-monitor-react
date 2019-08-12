import React, { Component } from 'react';
import { Input, Button, Card, Select, Alert } from 'antd';
import $ from "jquery";
import 'antd/dist/antd.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
        otp: '',
        otpWait: false,
        login: false,
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
                })
            } else if(json.msg == 'loginDone') {
                this.setState({
                    login: true,
                })
            }
        }
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
            contact: document.getElementById('otp').value,
        });
    }
  }

  render() {
    return (
       <div style={{"textAlign": "center", "width": '70%'}}>
            <center>
                {this.state.login ? <p>logged in</p> :
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
