import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Auth } from "aws-amplify";
import Login from "./LoginComponent";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import logo from "../images/1119728.jpg";
import Welcomepage from "./LoginPage";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }
  signOut = () => {
    const { onStateChange } = this.props;
    Auth.signOut()
      .then(res => {
        alert("Logged out");
      })
      .catch(err => alert(err));
  };
  render() {
    // const currentUser = Auth.currentAuthenticatedUser();
    // this.state.username = currentUser.username;
    return (
      <div style={{ backgroundColor: "#C0C0C0" }}>
        <Container>
          <Row>
            <Image src={logo} width="50px" height="50px" rounded />
            <Badge variant="primary">
              <h3>File Storage</h3>
            </Badge>
          </Row>
          <br />
          <Row>
            <Col>
              <Nav variant="pills" defaultActiveKey="/list">
                <Nav.Item>
                  <Nav.Link href="/list">list</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/upload">upload</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            {/* <Col md="auto">
              <h5> User: {this.props.username}</h5>
            </Col> */}
            <Col md="auto">
              <Button onClick={this.signOut} href="/" className="signOutButton">
                SignOut
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
