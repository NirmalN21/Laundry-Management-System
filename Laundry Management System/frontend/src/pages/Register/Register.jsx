import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import PasswordStrengthBar from "react-password-strength-bar";
import InputField from "../../components/subComponents/InputField";
import signup from "../../images/signup-image.jpg";
import "../../css/loginOrSignup.css";
import Navbar from  "../../components/Navbar"

import { SERVER_URL } from "../../constants";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "", phone: "", registration: "", room: "", password: "", cpassword: "", });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [activeTab, setActiveTab] = useState("user");

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (event) => {
    event.preventDefault();

    if (!user.name || !user.email || !user.phone || !user.registration || !user.room || !user.password || !user.cpassword) {
      window.alert("Fill all the fields");
    } else {
      if (user.password !== user.cpassword) {
        window.alert("Passwords didn't match");
      } else {
        localStorage.setItem("emailId", JSON.stringify(user.email));

        axios
          .post(`${SERVER_URL}/${activeTab}/register`, user)

          .then((res) => {
            console.log(res);
            window.alert(" Registration successfull");

            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
          });
      }
    }
  };


  return (
    <>
    <Navbar/>
      <section className="container-main">
        <div className="container">
          <Tabs className="register-tab">
            <TabList className="register-tab-menu">
              <Tab className={"staff" === activeTab ? `register-tab-menu-item-active` : `register-tab-menu-item`} onClick={() => { setActiveTab("staff"); console.log(activeTab) }}>
                <h1>Staff</h1>
              </Tab>
              <Tab className={"user" === activeTab ? `register-tab-menu-item-active` : `register-tab-menu-item`} onClick={() => { setActiveTab("user"); console.log(activeTab) }}>
                <h1>User</h1>
              </Tab>
            </TabList>

            <TabPanel className="register-tab-content">
              <div className="signup-content">
                <div className="signup-form">
                  <form method="" className="register-form" id="register-form">

                    <InputField htmlFor="name" className="zmdi zmdi-account material-icons-name" type="text" name="name" id="name"
                      value={user.name}
                      onChange={handleInput}
                      placeholder="Your Name"
                    />

                    <InputField htmlFor="email" className="zmdi zmdi-email material-icons-name" type="email" name="email" id="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="College Email"
                    />

                    <InputField htmlFor="phone" className="zmdi zmdi-phone material-icons-name" type="tel" name="phone" id="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="Phone No."
                    />

                    <InputField htmlFor="registration" className="zmdi zmdi-assignment-account material-icons-name" type="number" name="registration" id="registration"
                      value={user.registration}
                      onChange={handleInput}
                      placeholder="Registration No."
                    />

                    <InputField htmlFor="room" className="zmdi zmdi-hotel material-icons-name" type="text" name="room" id="room"
                      value={user.room}
                      onChange={handleInput}
                      placeholder="Room No."
                    />

                    <div className="form-group">

                      <label htmlFor="pass"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                      <input type={showPassword1 ? "text" : "password"} name="password" id="pass" autoComplete="off"
                        value={user.password}
                        onChange={handleInput}
                        placeholder="Password"
                      />

                      <div className="eye-div" onClick={() => setShowPassword1(!showPassword1)}>
                        {showPassword1 ? (<VscEye style={{ color: "blue" }} />) : (<VscEyeClosed />)}
                      </div>

                    </div>

                    <div className="password-strength"><PasswordStrengthBar password={user.password} /></div>

                    <div className="form-group">

                      <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline material-icons-name"></i></label>
                      <input type={showPassword2 ? "text" : "password"} name="cpassword" id="re_pass" autoComplete="off"
                        value={user.cpassword}
                        onChange={handleInput}
                        placeholder="Confirm password"
                      />

                      <div className="eye-div" onClick={() => setShowPassword2(!showPassword2)}>
                        {showPassword2 ? (<VscEye style={{ color: "blue" }} />) : (<VscEyeClosed />)}
                      </div>

                    </div>

                    {user.name && user.email && user.phone && user.registration && user.room && user.password && user.cpassword ? (
                      <div className="form-group form-button">
                        <input type="submit" name="signup" id="signup"
                          className="form-submit"
                          value="Register"
                          onClick={postData}
                        />
                      </div>
                    ) : (
                      <div className="form-group form-button">
                        <input type="submit" name="signup" id="signup"
                          className="form-not-submit"
                          value="Fill the form"
                          onClick={postData}
                        />
                      </div>
                    )}
                  </form>
                </div>

                <div className="signup-image">
                  <figure><img src={signup} alt="img" /></figure>
                  <div className="below-image">
                    <span className="new-here">Already member?</span>
                    <NavLink to="/login" className="signup-image-link">Login here</NavLink>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel className="register-tab-content">
              <div className="signup-content">
                <div className="signup-form">
                  <form method="" className="register-form" id="register-form">

                    <InputField htmlFor="name" className="zmdi zmdi-account material-icons-name" type="text" name="name" id="name"
                      value={user.name}
                      onChange={handleInput}
                      placeholder="Your Name"
                    />

                    <InputField htmlFor="email" className="zmdi zmdi-email material-icons-name" type="email" name="email" id="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="College Email"
                    />

                    <InputField htmlFor="phone" className="zmdi zmdi-phone material-icons-name" type="tel" name="phone" id="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="Phone No."
                    />

                    <InputField htmlFor="registration" className="zmdi zmdi-assignment-account material-icons-name" type="number" name="registration" id="registration"
                      value={user.registration}
                      onChange={handleInput}
                      placeholder="Registration No."
                    />

                    <InputField htmlFor="room" className="zmdi zmdi-hotel material-icons-name" type="text" name="room" id="room"
                      value={user.room}
                      onChange={handleInput}
                      placeholder="Room No."
                    />

                    <div className="form-group">

                      <label htmlFor="pass"><i className="zmdi zmdi-lock material-icons-name"></i></label>
                      <input type={showPassword1 ? "text" : "password"} name="password" id="pass" autoComplete="off"
                        value={user.password}
                        onChange={handleInput}
                        placeholder="Password"
                      />

                      <div className="eye-div" onClick={() => setShowPassword1(!showPassword1)}>
                        {showPassword1 ? (<VscEye style={{ color: "blue" }} />) : (<VscEyeClosed />)}
                      </div>

                    </div>

                    <div className="password-strength"><PasswordStrengthBar password={user.password} /></div>

                    <div className="form-group">

                      <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline material-icons-name"></i></label>
                      <input type={showPassword2 ? "text" : "password"} name="cpassword" id="re_pass" autoComplete="off"
                        value={user.cpassword}
                        onChange={handleInput}
                        placeholder="Confirm password"
                      />

                      <div className="eye-div" onClick={() => setShowPassword2(!showPassword2)}>
                        {showPassword2 ? (<VscEye style={{ color: "blue" }} />) : (<VscEyeClosed />)}
                      </div>

                    </div>

                    {user.name && user.email && user.phone && user.registration && user.room && user.password && user.cpassword ? (
                      <div className="form-group form-button">
                        <input type="submit" name="signup" id="signup"
                          className="form-submit"
                          value="Register"
                          onClick={postData}
                        />
                      </div>
                    ) : (
                      <div className="form-group form-button">
                        <input type="submit" name="signup" id="signup"
                          className="form-not-submit"
                          value="Fill the form"
                          onClick={postData}
                        />
                      </div>
                    )}
                  </form>
                </div>

                <div className="signup-image">
                  <figure><img src={signup} alt="img" /></figure>
                  <div className="below-image">
                    <span className="new-here">Already member?</span>
                    <NavLink to="/login" className="signup-image-link">Login here</NavLink>
                  </div>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default Register;
