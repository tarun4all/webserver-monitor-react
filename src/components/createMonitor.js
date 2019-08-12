import React, { Component } from 'react';
import { Input, Button, Card, Select, Alert } from 'antd';
import $ from "jquery";
import 'antd/dist/antd.css';

const { Option } = Select;

class CreateMonitor extends React.Component {
  constructor() {
    super();
    this.state = {
        validate: '',
        type: '',
        urlDone: false,
        msg: '',
        url: '',
        range: '1',
        email: '',
        phone: ''
    };
  }

  customAjax = (param) => {
    $.ajax({
        type: "GET",
        url: "http://localhost:5000/api/createMonitor",
        dataType: 'json',
        data: {
            site: param.site,
            range: this.state.range,
            email: param.email,
            phone: param.phone
        },
        success: (json) => {
            if(json.msg) {
                alert("Created");
            } else {
                alert("Error");
            }
        }
    });
  }

  createCron = () => {
    let msg = 'Creating', type = '';
    if(!document.getElementById('url').value) {
        msg = "Enter URL";
        type = "error";
    }

    if(!this.state.range) {
        msg = "Select Range";
        type = "error";
    }

    if(!document.getElementById('email').value || !document.getElementById('phone').value) {
        msg = "Enter Email or Phone";
        type = "error";
    }

    console.log(msg);
    if(!type || type !== 'error') {
        this.setState({
            msg: msg,
            type: type ? type : 'success',
            validate: true,
        });


        this.customAjax({
            site: document.getElementById('url').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        });
    }
  }

  setRange = (e) => {
      console.log(e);
    this.setState({
        range: e,
    });
  }

  openDialog = () => {
    this.setState({
        urlDone: true,
    })
  }

  render() {
    return (
       <div style={{"textAlign": "center", "width": '70%'}}>
            <center>
                {this.state.validate ? <Alert message={this.state.msg} type={this.state.type} banner/> : ''}
                <Input id="url" placeholder="Enter URLs" />
                <Select id="range" defaultValue="1" style={{ width: 150, "marginLeft":'5%', "marginTop":'5%' }} onChange={this.setRange}>
                    <Option value="1">10 Sec</Option>
                    <Option value="2">1 Min</Option>
                    <Option value="3">5 Min</Option>
                    <Option value="4">10 Min</Option>
                    <Option value="5">15 Min</Option>
                    <Option value="6">1 Hour</Option>
                    <Option value="7">4 Hour</Option>
                    <Option value="8">6 Hour</Option>
                    <Option value="9">Daily</Option>
                </Select>
                <Button style={{ width: 150, "marginLeft":'5%', "marginTop":'5%' }} type="primary" onClick={this.openDialog}>Contact Details</Button>
                {this.state.urlDone ? <div>
                    <Card style={{ width: '100%', "marginTop":'10%' }}>
                        <div style={{"textAlign": "center"}}>
                            <Input id="email" placeholder="Enter Email" />
                            <Input id="phone" placeholder="Enter Phone" />
                            <Button type="primary" onClick={this.createCron}>Create Cron</Button>
                        </div>
                    </Card>
                </div>: ''}
            </center>
       </div>
    );
  }
}

export default CreateMonitor;
