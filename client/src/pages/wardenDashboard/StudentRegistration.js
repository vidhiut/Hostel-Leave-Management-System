import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../features/loadingSlice";
import { getError } from "../../utils/getError";
import toast from "react-hot-toast";
import api from "../../utils/axios";
import { setUser } from "../../features/userSlice";
import FromField from "../../components/FormField";

function StudentRegistration() {
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [parentsName, setParentsName] = useState("");
  const [parentsEmail, setParentsEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [parentMobile, setParentMobile] = useState("");

  const { isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bgStyle = {
    borderRadius: "10px",
    minHeight: "500px",
  };


  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      dispatch(showLoading());
      const response = await api.post("/api/student-register", {

        firstname: firstName,
        lastname: LastName,
        mobile:mobile,
        parentmobile:parentMobile,
        parentname:parentsName,
        parentemail:parentsEmail,
        email: email,
        password: password,
      });

      if (response?.status === 200) {
        toast.success('Student account created successfully');
        setFirstName("");
        setLastName("");
        setMobile("");
        setEmail("");
        setParentMobile("");
        setParentsEmail("");
        setParentsName("");
        setPassword("");
      }
      dispatch(hideLoading());

      console.log(response);
    } catch (error) {
      dispatch(hideLoading());
      getError(error);
    }
  };


  return (
    <section className="d-flex justify-content-center align-items-center custom-section">
    <Container className="p-3 rounded-4 shadow bg-light">
    <Form className="m-3" onSubmit={ handleRegistration}>
        
          <h1>
              Student Registration
          </h1>

              <Row>
                <Col md={6}>
                  <FromField
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col>
                  <FromField
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FromField
                    label="Parent's Full name"
                    type="text"
                    placeholder="Full name"
                    value={parentsName}
                    onChange={(e) => setParentsName(e.target.value)}
                  />
                </Col>
                <Col>
                  <FromField
                    label="Parent's Email"
                    type="email"
                    placeholder="Email"
                    value={parentsEmail}
                    onChange={(e) => setParentsEmail(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FromField
                    label="Mobile No."
                    type="number"
                    placeholder="Mobile No."
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Col>
                <Col>
                  <FromField
                    label="Parent's Mobile No."
                    type="number"
                    placeholder="Mobile No."
                    value={parentMobile}
                    onChange={(e) => setParentMobile(e.target.value)}
                  />
                </Col>
              </Row>
          
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
              "Register"
            }
          </Button>
     
      
    </Form>
    </Container>
    </section>
  );
}

export default StudentRegistration;
