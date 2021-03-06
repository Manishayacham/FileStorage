import React, { Component } from "react";
import ApiServices from "./ApiServices";
import Table from "react-bootstrap/Table";
import Navbar from "./Navbar";
import Container from "react-bootstrap/Container";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./updatebutton";
import { Auth } from "aws-amplify";

export default class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAndFileDatas: [],
      username: ""
    };
  }
  componentDidMount() {
    this.reloadFileList();
  }

  reloadFileList = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    this.state.username = currentUser.username;
    ApiServices.fetchFiles(currentUser.username).then(res => {
      this.setState({ userAndFileDatas: res.data });
    });
  };

  render() {
    return (
      <div>
        <Container>
          <Navbar name={this.state.username} activelink="/list" />
          <br />
          <h2>List of files</h2>
          <br />
          <Table striped bordered hover size="xl">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Description</th>
                <th>File Size</th>
                <th>Upload Time</th>
		<th>Update Time</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.userAndFileDatas.map(userAndFileData => (
                <tr id={userAndFileData.keyName}>
                  <td>{userAndFileData.keyName}</td>
                  <td>{userAndFileData.description}</td>
		  <td>{(userAndFileData.sizeOfFile * 0.001).toFixed(0)} KB</td>
                  <td>{userAndFileData.uploadTime
                      ? new Date(userAndFileData.uploadTime).toLocaleString()
                      : ""}</td>
		  <td>{userAndFileData.updateTime
                      ? new Date(userAndFileData.updateTime).toLocaleString()
                      : ""}</td>
                  <td>
                    <a
                      className="btn btn-success"
                      href={
                        "http://d7joqodov1z04.cloudfront.net/" +
                        userAndFileData.username +
                        "/" +
                        userAndFileData.keyName.replace(/ /g, "_")
                      }
                      target="_blank"
                    >
                      Download
                    </a>
                  </td>
                  <td>
                    <UpdateButton
                      username={userAndFileData.username}
                      oldFileName={userAndFileData.keyName}
		      uploadTime={new Date(
                        userAndFileData.uploadTime
                      ).toISOString()}
                      reloadFileList={this.reloadFileList}
                    />
                  </td>
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
    );
  }
}
