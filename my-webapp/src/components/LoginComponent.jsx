import React from "react";
import { withAuthenticator } from "aws-amplify-react";
import ListUser from "./ListUser";
import { Auth } from "aws-amplify";
import Navbar from "./Navbar";
import AdminPage from "./AdminPage";

class LoginComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    if (Auth.user.username === "admin1") {
      return (
        <div>
          <AdminPage />
        </div>
      );
    } else {
      return (
        <div>
          <ListUser />
        </div>
      );
    }
  }
}
const MyTheme = {
  button: { backgroundColor: "blue" },
  a: { color: "blue" },
  signInButtonIcon: { display: "none" }
};

const federated = {
  google_client_id:
    "679240715614-87ubof74vd0pjh51c4ucslbh34aev56o.apps.googleusercontent.com",
  facebook_app_id: "538236237008954"
};

export default withAuthenticator(LoginComponent, {
  includeGreetings: false,
  authenticatorComponents: [],
  federated,
  theme: MyTheme,
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
    signUpFields: [
      {
        label: "First Name",
        key: "FirstName",
        required: false,
        type: "string"
      },
      { label: "Last Name", key: "Last Name", required: false, type: "string" }
    ]
  }
});
