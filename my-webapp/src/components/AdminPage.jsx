import React, { Component } from "react";
import ApiServices from "./ApiServices";
import Table from "react-bootstrap/Table";
import Navbar from "./Navbar";
import Container from "react-bootstrap/Container";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./updatebutton";
import { Auth } from "aws-amplify";
import AdminList from "./AdminList";

export default class adminList extends Component {
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
    ApiServices.adminList().then(res => {
      this.setState({ userAndFileDatas: res.data });
    });
  };

  render() {
    return (
      <div>
        <Container>
          <Navbar name={this.state.username} activelink="/list" />
          <br />
          <h2>List of users</h2>
          <br />
          <Table striped bordered hover size="xl">
            <thead>
              <tr>
                <th>Username</th>
                <th>Recent File Upload/uploadTime</th>
                <th>Storage Utilized</th>
                <th>Number of Files Uploaded</th>
		<th>List of Files</th>
              </tr>
            </thead>
            <tbody>
              {this.state.userAndFileDatas.map(userAndFileData => (
                <tr id={userAndFileData.keyName}>
                  <td>{userAndFileData.split(",")[0]}</td>
                  <td>
                    {userAndFileData.split(",")[4]}/
                    {userAndFileData.split(",")[1]}
                  </td>
		  <td>
                    {(userAndFileData.split(",")[2] * 0.001).toFixed(0)} KB
                  </td>
                  <td>{userAndFileData.split(",")[3]} </td>
		  <td>
                    <div>
                      {" "}
                      <AdminList name={userAndFileData.split(",")[0]} />
                    </div>{" "}
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
