import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import ApiServices from "./ApiServices";

export default class DeleteButton extends Component {
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
    };
    let handleShow = () => {
      this.setState({ open: true });
    };
    let Confirm = () => {
      ApiServices.deleteFile(this.state.name, this.state.filename).then(res => {
        this.setState({ open: false });
        this.props.reloadFileList();
      });
    };

    return (
      <div>
        <Button className="btn btn-success" onClick={handleShow}>
          Delete
        </Button>

        <Modal show={this.state.open} onHide={Close}>
          <Modal.Header closeButton>
            <Modal.Title>Delete confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Confirm to delete ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={Close}>
              Close
            </Button>
            <Button variant="primary" onClick={Confirm}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
