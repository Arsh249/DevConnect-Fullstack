import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👩‍💻 DevConnect
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm md:text-base">Welcome, {user.firstName}</span>
            {(user.membershipType === 'gold' || user.membershipType === 'silverGold') ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0,0,256,256" className="inline-block ml-2" title="Gold Member">
                <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
                  <g transform="scale(5.33333,5.33333)">
                    <path d="M29.62,3l3.433,5.308l6.314,0.316l0.319,6.313l5.311,3.43l-2.881,5.628l2.884,5.625l-5.308,3.433l-0.316,6.314l-6.313,0.319l-3.43,5.311l-5.628,-2.881l-5.625,2.884l-3.433,-5.308l-6.314,-0.316l-0.319,-6.313l-5.311,-3.43l2.881,-5.628l-2.884,-5.625l5.308,-3.433l0.316,-6.314l6.313,-0.319l3.43,-5.311l5.628,2.881z" fill="#fcc419"></path>
                    <path d="M21.396,31.255l-6.497,-6.495l2.122,-2.121l4.407,4.407l9.568,-9.274l2.088,2.154z" fill="#ffffff"></path>
                  </g>
                </g>
              </svg>
            ) : user.membershipType === 'silver' ? (
              <img
                src="https://img.icons8.com/?size=100&id=2sZ0sdlG9kWP&format=png&color=000000"
                alt="Silver Badge"
                className="w-6 h-6 inline-block ml-2"
                title="Silver Member"
              />
            ) : null}
          </div>
          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>

              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default NavBar;
