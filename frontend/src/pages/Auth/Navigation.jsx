import { useState } from "react"
import {AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import "./Navigation.css"
import { useNavigate } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import {useLogoutMutation} from '../../redux/api/usersApiSlice.js'
import {logout} from '../../redux/features/auth/authSlice.js'
import { CgProfile } from "react-icons/cg";
import FavouritesCount from "../Products/FavouritesCount.jsx"

const Navigation = () => {
    const {userInfo} = useSelector(state => state.auth)
    const {cartItems} = useSelector(state => state.cart)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)

    const toggleDropDown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const closeDropDown = () => {
        setDropdownOpen(false)
    }

    const toggleSideBar = () => {
        setShowSidebar(!showSidebar)
    }

    const closeSideBar = () => {
        setShowSidebar(false)
    }

    const handleMouseLeave = () => {
        closeSideBar()
        closeDropDown()
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async() => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div 
            style={{zIndex: 999}}
            className={`${showSidebar ? "sidebar-open" : ""} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4
            text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
            id="navigation-container"
            onMouseEnter={toggleSideBar}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-col justify-center space-y-4">
                <Link
                    to = "/"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">Home</span> {" "}
                </Link>
                <Link
                    to = "/shop"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">Shop</span> {" "}
                </Link>
                <Link
                    to = "/cart"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">Cart</span> {" "}
                    <div className="absolute top-9">
                        {cartItems.length > 0 && (
                            <span>
                                <span className="ml-5 px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                                    {cartItems.reduce((a,c) => a + c.qty, 0)}
                                </span>
                            </span>
                        )}
                    </div>
                </Link>
                <Link
                    to = "/favourite"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <FaHeart className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">Favorites</span> {" "}
                    <FavouritesCount />
                </Link>
            </div>

            <div className="relative">
                <button
                    onClick={toggleDropDown}
                    className="flex items-center text-gray-800 focus:outline-none"
                >
                    {userInfo
                        ? (
                            showSidebar 
                                ? <span className="text-white nav-item-name">{userInfo.username}</span>
                                : <CgProfile size={26} color="white"/>
                        )
                        : (
                            <></>
                    )}
                    {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 ${
                                dropdownOpen ? 'transform rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                            />
                        </svg> 
                    )}
                </button>

                {dropdownOpen && userInfo && (
                    <ul
                        className={`absoulte right-0 mt-2 mr-14 space-y-2 bg-black text-gray-600 ${
                            !userInfo.isAdmin ? '-top-20' : '-top-80'
                        }`}
                    >
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link
                                        className="block px-4 py-2 bg-black text-white hover:bg-gray-900"
                                        to="/admin/dashboard"
                                    >Dashboard</Link>
                                </li>
                                <li>
                                    <Link
                                        className="block px-4 py-2 bg-black text-white hover:bg-gray-900"
                                        to="/admin/productlist"
                                    >Products</Link>
                                </li>
                                <li>
                                    <Link
                                        className="block px-4 py-2 bg-black text-white hover:bg-gray-900"                                        to="/admin/categorylist"
                                    >Category</Link>
                                </li>
                                <li>
                                    <Link
                                        className="block px-4 py-2 bg-black text-white hover:bg-gray-900"                                        to="/admin/orderlist"
                                    >Orders</Link>
                                </li>
                                <li>
                                    <Link
                                        className="block px-4 py-2 bg-black text-white hover:bg-gray-900"                                        to="/admin/userlist"
                                    >Users</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link
                                to = "/profile"
                                className="block px-4 py-2 bg-black text-white hover:bg-gray-900"
                            >Profile</Link>
                            </li>
                            <li>
                            <button
                                className="block px-4 py-2 bg-black text-white hover:bg-gray-900" 
                                onClick={logoutHandler}
                            >Log Out</button>
                        </li>
                    </ul>
                )}
            </div>

            {!userInfo && (
                <ul>
                <li>
                    <Link
                        to = "/login"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                    >
                        <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Login</span> {" "}
                    </Link>
                </li>
                <li>
                    <Link
                        to = "/register"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                    >
                        <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Register</span> {" "}
                    </Link>
                </li>
            </ul>
            )}
        </div>
    )
}

export default Navigation