import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        try {
            // this is firebase functions 
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider)
            console.log(result)
            // user deails save in the result 
            const res = await fetch("/api/auth/google", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL })

            })
            const data = await res.json()
            dispatch(signinSuccess(data))
            navigate("/home")
            console.log(data, "data is here")
        } catch (error) {
            console.log("could not sign in with google", error)
        }
    }
    return (
        <button onClick={handleGoogleClick} type="button" className="bg-emerald-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign In With Google</button>

    )
}

export default OAuth