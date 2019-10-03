import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import logo from "../images/1119728.jpg";
import Login from "./LoginComponent";
import Badge from "react-bootstrap/Badge";

export default class Loginpage extends Component {
  render() {
    return (
      <div>
        <Row className="justify-content-md-center">
          <Image src={logo} width="60px" height="60px" rounded />
          <Badge variant="primary">
            <h3>File Storage</h3>
          </Badge>
        </Row>
        <Login />
      </div>
    );
  }
}
