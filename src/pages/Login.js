import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const loginCall = () => {
    const body = {
      username: usernameValue,
      password: passwordValue,
    };
    axios
      .post("http://34.245.213.76:3000/auth/signin", body)
      .then((response) => checkResponse(response))
      .catch((error) => {
        setIsError(true);
      });
  };
  const checkResponse = (response) => {
    if (response.data && response.data.accessToken) {
      setIsError(false);
      navigate("/dashboard", {
        state: {
          token: response.data.accessToken,
        },
      });
    }
  };

  const checkValidation = () => {
    let result;
    if (usernameValue === "" || passwordValue === "") {
      result = true;
    } else {
      result = false;
    }
    return result;
  };

  useEffect(() => {}, []);

  return (
    <div className="login">
      <div className="form-group">
        <label className="input" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Username"
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
        />
        <div class="form-group">
          <label className="input" htmlFor="username">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter Password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          {isError ? (
            <div className="error">Invalid username or password</div>
          ) : (
            ""
          )}
        </div>
      </div>
      <button
        disabled={checkValidation()}
        onClick={() => loginCall()}
        className="btn btn-default"
      >
        {" "}
        Login
      </button>
    </div>
  );
}
export default Login;
