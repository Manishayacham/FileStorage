import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import ApiServices from "./ApiServices";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import DeleteButton from "./DeleteButton";

export default class AdminList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      userAndFileDatas: []
    };
  }
  render() {
    let Close = () => {
      this.setState({ open: false });
    };
    let handleShow = () => {
      this.setState({ open: true });
      ApiServices.fetchFiles(this.props.name).then(res => {
        this.setState({ userAndFileDatas: res.data });
      });
    };

    return (
      <div>
        <Button className="btn btn-success" onClick={handleShow}>
          List of Files
        </Button>

        <Modal show={this.state.open} onHide={Close}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              List of files uploaded by {this.props.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Container>
                <Table striped bordered hover size="xl">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userAndFileDatas.map(userAndFileData => (
                      <tr id={userAndFileData.keyName}>
                        <td>{userAndFileData.keyName}</td>
                        <td>
                          <DeleteButton
                            name={userAndFileData.username}
                            filename={userAndFileData.keyName}
                            reloadFileList={this.reloadFileList}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Container>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={Close}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

