import axios from "axios";

const USER_URL = "http://ec2-34-238-85-173.compute-1.amazonaws.com:8080";

class ApiServices {
  addRegistery(user) {
    alert("in");
    return axios.post(USER_URL + "/registration", user);
  }

  addfile(formData) {
    return axios.post(USER_URL + "/firstpage", formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }

  fetchFiles(username) {
    return axios.get(USER_URL + "/list/" + username);
  }

  adminList() {
    alert("yes");
    return axios.get(USER_URL + "/adminlist");
  }

  deleteFile(username, filename) {
    return axios.delete(USER_URL + "/delete/" + username + "/" + filename);
  }

  updateFile(formData) {
    return axios.post(USER_URL + "/updateFile", formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }
}

export default new ApiServices();
