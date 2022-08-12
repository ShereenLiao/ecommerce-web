import { signInWithGooglePopup, createUserDocumentFromAuth} from "../../untils/firebase/firebase.untils";

const SignIn = ()=>{
    const logGoogleUser = async ()=>{
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log(userDocRef);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In with Google Popup
    </button>
        </div>
    )
}

export default SignIn;