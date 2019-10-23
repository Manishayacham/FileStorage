import React, { Component } from "react";
import ApiServices from "./ApiServices";
import Navbar from "./Navbar";
import { Auth } from "aws-amplify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";

export default class UploadFilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      username: "",
      description: "",
      isLoading: false
    };
  }

  retriveUser = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    this.state.username = currentUser.username;
    alert(this.state.username);
  };

  uploadFile = async e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const currentUser = await Auth.currentAuthenticatedUser();
    this.state.username = currentUser.username;
    let formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("username", this.state.username);
    formData.append("description", this.state.description);

    ApiServices.addfile(formData).then(res => {
      this.setState({ isLoading: false });
    });
  };

  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };
  onChangedesc = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    this.retriveUser();
    return (
      <div>
        <Container>
          <Navbar user={this.retriveUser} />
          <Row className="justify-content-md-center">
            <form onSubmit={this.uploadFile}>
              <h1>File Upload</h1>
              <input type="file" name="file" onChange={this.onChange} />
              <br />
              <br />
              Description{" "}
              <input
                type="text"
                name="description"
                onChange={this.onChangedesc}
              />
              <br />
              <br />
              {/* <Button type="submit">Upload</Button> */}
              <Button
                variant="primary"
                disabled={this.state.isLoading}
                type="submit"
              >
                {this.state.isLoading ? "Loading…" : "Upload"}
              </Button>
            </form>
          </Row>
        </Container>
      </div>
    );
  }
}
