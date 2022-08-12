import Button from "../../components/button/button.component";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { signInAuthWithEmailAndPassword } from "../../untils/firebase/firebase.untils";
import './sign-in-form.scss'

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../untils/firebase/firebase.untils";

const defaultFormFields = {
  password: "",
  email: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    await createUserDocumentFromAuth(response.user);
  };

  const handleChange = (event) => {
    // console.log(event.target.id);
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    signInAuthWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      resetFormFields();
    })
    .catch((error) => {
      switch(error.code){
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break;
        case 'auth/user-not-found':
          alert('no user assoicate with this email')
          break;
        default:
          console.log(error);
      }
    });
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email address"
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <div className='buttons-container'>

          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </Button>

        </div>
      </form>
    </div>
  );
};

export default SignInForm;