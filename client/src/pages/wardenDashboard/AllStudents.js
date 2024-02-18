import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getError } from "../../utils/getError";
import { hideLoading, showLoading } from "../../features/loadingSlice";
import api from "../../utils/axios";
import FromField from "../../components/FormField";
import { BsArrowUpRight } from 'react-icons/bs';

function AllStudents() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getAllStudents = async () => {
      try {
        dispatch(showLoading());
        const response = await api.get("/api/admin/students", {
          headers: {
            Authorization: token,
          },
        });
        console.log(response);

        dispatch(hideLoading());

        if (response.status === 200) {
          setData(response.data.users);
          console.log(data);
        }
      } catch (error) {
        getError(error);
        dispatch(hideLoading());
      }
    };

    getAllStudents();
  }, [token]);

//   const handleDetailsClick = (application) => {
//     setSelectedApplication(application);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

  return (
    <section className="d-flex justify-content-center align-items-center custom-section">
      <Container className="p-3 rounded-4 shadow bg-light">
        <h5 className="mb-4 text-center fw-bold">All Students</h5>
        <Table responsive>
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile no</th>
              <th>Parent Name</th>
              <th>Parent Mobile </th>
              <th>Parent Email</th>

             
             
              {/* <th>Details</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {user?.firstname} 
                </td>
                <td>
                  {user?.lastname}
                </td>
                <td>
                  {user?.email}
                </td>
                <td>
                  {user?.mobile}
                </td>
                <td>
                  {user?.parentname}
                </td>
                <td>
                  {user?.parentmobile}
                </td>
                <td>
                  {user?.parentemail}
                </td>
               {/* <td>
                  <Button
                    variant="primary"
                    className="rounded-pill"
                  //  onClick={() => handleDetailsClick(application)}
                  >
                    Details <BsArrowUpRight/>
                  </Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Application Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedApplication && (
              <>
              <Row>
                <Col md={8}>
                <FromField
                  label="Name"
                  value={`${selectedApplication?.studentid?.firstname} ${selectedApplication?.studentid?.lastname}`}
                  disabled={true}
                />

                </Col>
             
              </Row>
                
                <FromField
                  label="Subject"
                  value={selectedApplication.subject}
                  disabled={true}
                />
                <Row>
            <Col md={4}>
              <FromField
                label="From Date"
                // value={application?.fromdate}
                value={new Date(selectedApplication?.fromdate).toISOString().split("T")[0]}
                disabled={true}
              />
            </Col>
            <Col md={4}>
              <FromField
                label="To Date"
                // value={application?.todate}
                value={new Date(selectedApplication?.todate).toISOString().split("T")[0]}
                disabled={true}
              />
            </Col>
          </Row>
                <FromField
                  label="Description"
                  value={selectedApplication.description}
                  disabled={true}
                />
                <p className="fw-bold">Parent Approval</p>
                <Button disabled variant="muted" style={{ color:selectedApplication?.parentapproval === "Approved"?"green":selectedApplication?.parentapproval === "Rejected"?"red":"orange"}}>{selectedApplication?.parentapproval}</Button>

              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}
      </Container>
    </section>
  );
}

export default AllStudents;
