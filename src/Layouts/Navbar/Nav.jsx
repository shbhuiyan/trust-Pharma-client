import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Components/Hooks/AuthProviderHooks/useAuth";
import { FaUserGear } from "react-icons/fa6";
import { FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const Nav = () => {
  const { user, userLogOut } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    userLogOut()
    .then(()=> {
      Swal.fire({
        title: "Logout Successful",
        icon: "success",
        draggable: true
      });
      navigate("/")
    })
  }

  const navList = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/shop"}>Shop</NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm gap-2 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-cinzel font-bold"
          >
            {navList}
          </ul>
        </div>
        <Link to="/" className="text-xl font-bold font-cinzel md:text-3xl">
          <span className="text-blue-500">Trust</span>Pharma
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-cinzel text-lg font-bold gap-5">
          {navList}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        {user && user?.email ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt={user?.displayName} src={user?.photoURL} data-tooltip-id="my-tooltip" data-tooltip-content={user?.displayName} data-tooltip-place="bottom" />
                <Tooltip id="my-tooltip" style={{backgroundColor:"#2196F3" , color:"#000000"}}/>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-4 shadow font-cinzel font-bold"
            >
              <li>
                <Link to={"#"}><FaUserGear /> Update Profile</Link>
              </li>
              <li>
                <Link to={"/dashboard"}><FaClipboardList /> Dashboard</Link>
              </li>
              <li>
                <Link onClick={handleLogout}><FaSignOutAlt /> Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-2 md:px-4 py-1 md:py-2 font-inter font-semibold text-white bg-black rounded-lg hover:bg-black/80 transition-all"
          >
            Join US
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
