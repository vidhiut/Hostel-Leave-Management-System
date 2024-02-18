import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import FromField from "../../components/FormField";
import { getError } from "../../utils/getError";
import api from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState("");

  const isWardenProfile = window.location.pathname.includes("warden");

  useEffect(() => {
    const fetchProfile = async () => {

      const url = isWardenProfile?'/api/admin/profile':"/api/student/student-profile";

      try {
        const response = await api.get(url, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response);

        const { data } = response.data;
        setFormData(data);
        console.log(data);
      } catch (error) {
        getError(error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Name:", name);
    console.log("Value:", value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  const updateProfile = async (e) => {
    e.preventDefault();

    const url = isWardenProfile?'/api/admin/profile':"/api/student/student-profile";

    try {
      console.log("Form Data: ", formData);
      const response = await api.put(
        url,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);

      const { data } = response.data;
      setFormData(data);
      setIsEditing(false);
    } catch (error) {
      getError(error);
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center custom-section">
      <Container className="p-3 rounded-4 shadow bg-light">
        <h5 className="my-3 text-center fw-bold">
          {isWardenProfile ? "Warden Profile" : "Students Details"}
        </h5>

        <Form>
          <Row>
            <Col>
              <FromField
                label="First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Col>
            <Col>
              <FromField
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FromField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Col>
            <Col>
              <FromField
                label="Mobile No."
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Col>
          </Row>

          {!isWardenProfile && (
            <>
              <h5 className="my-3"> Parents Details</h5>
              <Row>
                <Col>
                  <FromField
                    label="Parents Name"
                    name="parentname"
                    value={formData.parentname}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Col>
                <Col>
                  <FromField
                    label="Parents Email"
                    type="email"
                    name="parentemail"
                    value={formData.parentemail}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FromField
                    label="Parents Mobile"
                    type="tel"
                    name="parentmobile"
                    value={formData.parentmobile}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Col>
              </Row>
            </>
          )}

          <Button
            className="px-4 me-3"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing && (
            <Button className="mx-3" onClick={updateProfile}>
              Update
            </Button>
          )}
        </Form>
      </Container>
    </section>
  );
}

export default Profile;
