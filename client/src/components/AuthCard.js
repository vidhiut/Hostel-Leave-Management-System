import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import FromField from "./FormField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../features/loadingSlice";
import { getError } from "../utils/getError";
import api from "../utils/axios";
import { setUser } from "../features/userSlice";
import toast from "react-hot-toast";

function AuthCard() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const location = useLocation();
  const isStudentLogin = location.pathname.includes("student-login");
  const isWardenLogin = location.pathname.includes("warden-login");
  const { isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bgStyle = {
   
    borderRadius: "10px",
    minHeight: "500px",
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(showLoading());
      const response = await api.post("/api/student-login", {
        email: email,
        password: password,
      });

      if (response?.status === 200) {
        const { user, token } = response?.data;
        const { firstname, lastname } = response?.data?.user;
        console.log(token);
        dispatch(setUser({ user, token }));
        toast.success(`Welcome Back ${firstname} ${lastname}`);
        navigate("/");
      }
      dispatch(hideLoading());

      console.log(response);
    } catch (error) {
      dispatch(hideLoading());
      getError(error);
    }
  };

  const handleWardenLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(showLoading());
      const response = await api.post("/api/warden-login", {
        email: email,
        password: password,
      });

      if (response?.status === 200) {
        const { user, token } = response?.data;
        const { firstname, lastname } = response?.data?.user;
        console.log(token);
        dispatch(setUser({ user, token }));
        toast.success(`Welcome Back ${firstname} ${lastname}`);
        navigate("/");
      }
      dispatch(hideLoading());

      console.log(response);
    } catch (error) {
      dispatch(hideLoading());
      getError(error);
    }
  };


 


  return (
    <Form className="" onSubmit={isStudentLogin ? handleLogin : isWardenLogin? handleWardenLogin: null}>
      <Card className="rounded-5 p-3 mt-3 glass-morf" style={bgStyle} data-aos='zoom-in' data-aos-duration='500' data-aos-delay="300">
        <Card.Body>
          <h1>
            {isStudentLogin
              ? "Student Login"
              : isWardenLogin
              ? "Warden Login"
              : null}
          </h1>

          {isStudentLogin ? (
            <p className="text-end">
              <Link to="/auth/warden-login">Warden Login</Link>
            </p>
          ) : isWardenLogin ? (
            <p className="text-end">
             <Link to="/auth/student-login">Student Login</Link>
            </p>
          ) : null}

          <FromField
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FromField
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Card.Body>
        <Card.Footer className="border-0">
          <Button type="submit" className="w-100 rounded-pill">
            {isLoading ? 
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
           :
              "Login"
            }
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  );
}

export default AuthCard;
