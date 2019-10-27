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
  };

  uploadFile = async e => {
    e.preventDefault();
    //File size will be in bytes
     if (this.state.file.size >= 10000000) {
      alert("Please select a file with size less than 10 MB");
    } else {
      this.setState({ isLoading: true });
      const currentUser = await Auth.currentAuthenticatedUser();
      this.state.username = currentUser.username;
      let formData = new FormData();
      formData.append("file", this.state.file);
      formData.append("username", this.state.username);
      formData.append("description", this.state.description);

      ApiServices.addfile(formData).then(res => {
        alert(res.data);
        window.location.reload(false);
        this.setState({ isLoading: false });
      });
    }
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
          <Navbar user={this.retriveUser} activelink="/upload" />
          <Row className="justify-content-md-center">
            <form onSubmit={this.uploadFile}>
              <h1>File upload</h1>
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
                {this.state.isLoading ? "Uploading…" : "Upload"}
              </Button>
            </form>
          </Row>
        </Container>
      </div>
    );
  }
}
