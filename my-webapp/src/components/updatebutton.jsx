import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import ApiServices from "./ApiServices";

export default class UpdateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      oldFileName: this.props.oldFileName,
      description: "",
      file: "",
      uploadTime: this.props.uploadTime
    };
  }

  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };
  onChangedesc = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let Close = () => {
      this.setState({ open: false });
    };
    let handleShow = () => {
      this.setState({ open: true });
    };
    let Upload = () => {  
    if (this.state.file.size >= 10000000) {
        alert("Please select a file with size less than 10 MB");
      } else {
        let formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("username", this.state.username);
        formData.append("description", this.state.description);
        formData.append("oldFileName", this.state.oldFileName);
        formData.append("uploadTime", this.state.uploadTime);
        ApiServices.updateFile(formData).then(res => {
          this.setState({ open: false });
          window.location.reload(false);
        });
      }
    };

    return (
      <div>
        <Button className="btn btn-success" onClick={handleShow}>
          Update
        </Button>

        <Modal show={this.state.open} onHide={Close}>
          <Modal.Header closeButton>
            <Modal.Title>Update File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={Close}>
              Close
            </Button>
            <Button variant="primary" onClick={Upload}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
