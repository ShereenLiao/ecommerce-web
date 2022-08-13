import Button from '../../components/button/button.component'
import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import { UserContext } from '../../contexts/user.context';

import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../../untils/firebase/firebase.untils";

import './sign-up-form.styel.scss'

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  
  const {setCurrentUser, currentUser} = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
    }

    createAuthUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        createUserDocumentFromAuth(user, { displayName });
        setCurrentUser(user);
        resetFormFields();
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("Cannot create user, email already in use");
        } else {
          console.log("user creation encountered an error", error);
        }
      });
  };

  const handleChange = (event) => {
    // console.log(event.target.id);
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email address"
          type="email"
          name="email"
          onChange={handleChange}
          required
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          required
          value={password}
        />

        <FormInput
          label="confirmedPassword"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          required
          value={confirmPassword}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
