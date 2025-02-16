import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import OAuth from "../components/OAuth"

const Signup = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setLoading(true)
            // take response 
            const res = await fetch("/api/auth/signup", {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (data.success == false) {
                setLoading(false);
                setError(data.message);
                return
            }
            setLoading(false)
            setError(null)
            navigate('/sign-in')
            console.log(data, "data is here")
            alert('User created successfully!');
        } catch (error) {
            setLoading(false)
            setError(error.message)
            alert(error.message)
        }
    }
    console.log(formData)
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="username" className="border p-3 rounded-lg" id="username" required onChange={handleChange} />
                <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" required onChange={handleChange} />
                <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" required onChange={handleChange} />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80" disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-5 font-sans">
                <p>Have an account?</p>
                <Link to='/sign-in'><span className="text-blue-700 font-semibold">Sign In</span></Link>
            </div>
            {error && <p className="text-red-600">{error}</p>}
        </div>
    )
}

export default Signup