import React, { Fragment, useRef, useState, useEffect } from "react";
import "./Login.css";
import Loader from "../layout/Loader/Loader.js";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { register, login, clearErrors } from "../../actions/userAction.js";
import { useAlert } from "react-alert";
const Login = ({history}) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {error, loading, isAuthenticated, } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTabs = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  
  const {name, email, password} = user;
  
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/Profile.png');
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(isAuthenticated){
      history.push('/account');
    }
  }, [dispatch, alert, error, isAuthenticated, history]);
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTabs.current.classList.add("shiftToNeutral");
      switcherTabs.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTabs.current.classList.add("shiftToRight");
      switcherTabs.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('avatar', avatar);
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState===2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    } else {
        setUser({...user, [e.target.name]: e.target.value});
    }
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                  <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                </div>
                <button ref={switcherTabs}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot" className="forgotPassword">
                  Forgot Password?
                </Link>
                <input type="submit" value="login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="signUpBtn"
                //   disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
