import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signinStart, signinFailour, signinSuccess } from "../redux/user/userSlice"
import OAuth from "../components/OAuth"
const Signin = () => {
    const [formData, setFormData] = useState({})
    const { loading, error } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            dispatch(signinStart())
            // take response 
            const res = await fetch("/api/auth/signin", {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (data.success == false) {
                dispatch(signinFailour(data.message))
                return
            }
            dispatch(signinSuccess(data))
            navigate('/home')
            console.log(data, "data is here")
            alert('User created successfully!');
        } catch (error) {
            dispatch(signinFailour(error.message))
            alert(error.message)
        }
    }
    console.log(formData)
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" required onChange={handleChange} />
                <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" required onChange={handleChange} />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80" disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-5 font-sans">
                <p>Dont have an account?</p>
                <Link to='/sign-up'><span className="text-blue-700 font-semibold">Sign Up</span></Link>
            </div>
            {error && <p className="text-red-600">{error}</p>}
        </div>
    )
}

export default Signin