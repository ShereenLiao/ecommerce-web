import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../untils/firebase/firebase.untils";

const SignIn = () => {
  
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
      <SignUpForm/>
    </div>
  );
};

export default SignIn;
