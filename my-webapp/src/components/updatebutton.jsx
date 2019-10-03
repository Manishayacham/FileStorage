import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import ApiServices from "./ApiServices";

export default class UpdateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      filename: this.props.filename
    };
  }
  render() {
    let Close = () => {
      this.setState({ open: false });
      this.props.reloadFileList();
    };
    let handleShow = () => {
      this.setState({ open: true });
      alert(this.state.name);

      ///ApiServices.updatefile(this.state.name, this.state.filename);
    };
    let Confirm = () => {
      this.setState({ open: false });
      this.props.reloadFileList();
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
            <Button variant="primary" onClick={Close}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
