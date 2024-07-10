import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <header className="bg-slate-200 shadow-md ">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link>
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap gap-1">
                        <span className="text-slate-500">Real</span>
                        <span className="text-slate-700">World</span>
                    </h1>
                </Link>

                <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                    <input type="text" placeholder="Search..." className="bg-transparent outline-none w-28 sm:w-64" />
                    <FaSearch className='text-slate-600 cursor-pointer' />
                </form>
                <ul className='flex gap-4'>
                    <Link to="/">
                        <li className='hidden sm:inline font-semibold text-slate-600 hover:text-slate-800'>Home</li>

                    </Link>
                    <Link to="/about">
                        <li className='hidden sm:inline font-semibold text-slate-600 hover:text-slate-800'>About</li>

                    </Link>
                    <Link to="/sign-up">
                        <li className=' text-slate-600 font-semibold  hover:text-slate-800'>Sign Up</li>

                    </Link>
                    <Link to="/sign-in">
                        <li className=' text-slate-600 font-semibold  hover:text-slate-800'>Sign In</li>

                    </Link>

                </ul>
            </div>
        </header>
    )
}

export default Header