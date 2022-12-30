import React, { useState } from "react";
import axios from "axios";

const Register = (props) => {
  const [ confirmReg, setConfirmReg ] = useState("");
  const [ errors, setErrors ] = useState({});

  const [ user, setUser ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    isApproved: true,
    password: "", 
    confirmPassword: "",
  })

  const roles = [
    "Administrator",
    "Instructor",
    "Student"
  ];

  const handleChange = (e) => {
    setConfirmReg("");
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      [user.isApproved]: user.role === "Instructor" ? false : true
    })
  }

  const register = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/api/users/register", 
      user,
      { withCredentials: true })
      .then(res => {
        console.log(res.data);

        setUser({
          firstName: "",            
          lastName: "",
          email: "",
          role: "",
          isApproved: true,
          password: "", 
          confirmPassword: ""
        })

        setConfirmReg("Your account was successfully created - please continue to login.");
        setErrors({});
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <h4>If you're new here, create your account below:</h4>
      <form onSubmit={ register }>
        <div>
          <label>First Name:</label>
          {
            errors.firstName ? <span className="error-text">{ errors.firstName.message }</span> : null
          }
          <input type="text" name="firstName" value={ user.firstName } onChange={ (e) => handleChange(e) } />
        </div>
        <div>
          <label>Last Name:</label>
          {
            errors.lastName ? <span className="error-text">{ errors.lastName.message }</span> : null
          }
          <input type="text" name="lastName" value={ user.lastName } onChange={ (e) => handleChange(e) } />
        </div>
        <div>
          <label>Email:</label>
          {
            errors.email ? <span className="error-text">{ errors.email.message }</span> : null
          }
          <input type="email" name="email" value={ user.email } onChange={ (e) => handleChange(e) } />
        </div>
        <div>
          <label>Role:</label>
          {
            errors.role ? <span className="error-text">{ errors.role.message }</span> : null
          }
          <select id="role" name="role" value={ user.role } onChange={ (e) => handleChange(e) }>
            <option value=""></option>
            {
              roles.map((role) => (
                <option key={ role } value={ role }>{ role }</option>
              ))
            }
          </select>
        </div>
        <div>
          <label>Password:</label>
          {
            errors.password ? <span className="error-text">{ errors.password.message }</span> : null
          }
          <input type="password" name="password" value={ user.password } onChange={ (e) => handleChange(e) } />
        </div>
        <div>
          <label>Confirm Password:</label>
          {
            errors.confirmPassword ? <span className="error-text">{ errors.confirmPassword.message }</span> : null
          }
          <input type="password" name="confirmPassword" value={ user.confirmPassword } onChange={ (e) => handleChange(e) } />
        </div>
        <div className="center">
            <input className="NormalButton" type="submit" value="Create Account"/>
        </div>
      </form>
      {
        confirmReg ? <h4 style={{color: "green"}}>{ confirmReg }</h4> : null
      }
    </div>
  );
};

export default Register;