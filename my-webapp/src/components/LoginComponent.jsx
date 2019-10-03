import React from "react";
import { withAuthenticator } from "aws-amplify-react";
import ListUser from "./ListUser";

class LoginComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <ListUser />
      </div>
    );
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

// import React, { Component } from "react";
// import ApiServices from "../components/ApiServices";
// import { Auth } from "aws-amplify";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import { Button } from "react-bootstrap";
// import { browserHistory } from "react-router";

// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: ""
//     };
//   }

//   onChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   login = async e => {
//     e.preventDefault();
//     try {
//       await Auth.signIn(this.state.username, this.state.password);

//       alert("Logged in");
//       this.props.browserHistory.push("/list");
//     } catch (e) {
//       alert(e.message);
//     }
//   };

//   render() {
//     return (
//       <div>
//         <Form onSubmit={this.login}>
//           <Form.Group controlId="validationCustom01">
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               name="username"
//               type="text"
//               placeholder="Enter Username"
//               value={this.state.username}
//               onChange={this.onChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               name="password"
//               type="password"
//               placeholder="Password"
//               value={this.state.password}
//               onChange={this.onChange}
//               required
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Login
//           </Button>
//           or
//           <Button
//             variant="primary"
//             onClick={() => Auth.federatedSignIn({ provider: "Facebook" })}
//           >
//             Login In with Facebook
//           </Button>
//           or
//           <Button onClick={() => Auth.federatedSignIn({ provider: "Google" })}>
//             Login In with Google
//           </Button>
//         </Form>
//       </div>
//     );
//   }
// }
