import React, { Component } from "react";
import ApiServices from "./ApiServices";
import Table from "react-bootstrap/Table";
import Navbar from "./Navbar";
import Container from "react-bootstrap/Container";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./updatebutton";
import { Auth } from "aws-amplify";

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
          <Navbar />
          <br />
          <h2>List Of Users</h2>
          <br />
          <Table striped bordered hover size="xl">
            <thead>
              <tr>
                <th>UserName</th>
                <th>RecentFileUpload/uploadTime</th>
                <th>Storage utilized</th>
                <th>Number of files uploaded</th>
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
                  <td>{userAndFileData.split(",")[2] * 0.001} KB</td>
                  <td>{userAndFileData.split(",")[3]} </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
