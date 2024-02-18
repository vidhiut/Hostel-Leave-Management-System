import React, { useEffect, useState } from "react";
import FromField from "../../components/FormField";
import { Button, Col, Container, Form, Modal, Row, Spinner, Table } from "react-bootstrap";
import { getError } from "../../utils/getError";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../features/loadingSlice";
import api from "../../utils/axios";
import toast from "react-hot-toast";
import { BsArrowUpRight } from "react-icons/bs";

function Applications() {
  const { token } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.loading);

  const [data, setData] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);



  const dispatch = useDispatch();

  const getAllApplications = async () => {
    try {
      dispatch(showLoading());
      const response = await api.get("/api/student/application", {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);

      dispatch(hideLoading());

      if (response.status === 200) {
        setData(response.data.applications);
        console.log(data);
      }
    } catch (error) {
      getError(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {

    getAllApplications();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await api.post(
        "/api/student/application",
        {
          subject,
          description,
          fromdate: fromDate,
          todate: toDate,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      dispatch(hideLoading());
      const { success } = response.data;
      if (success) {
        toast.success("Application submitted");
        setSubject("");
        setDescription("");
        setFromDate("");
        setToDate("");
        setShowModal(false);
        getAllApplications();

      } else {
        toast.error("Failed to submit application");
      }
    } catch (error) {
      getError(error);
      dispatch(hideLoading());
    }
  };

  const handleDetailsClick = (application) => {
    setSelectedApplication(application);
    setShowApplication(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseApplication = () => {
    setShowApplication(false);
  };

  return (
    <section className="d-flex justify-content-center align-items-center custom-section">
      <Container className=" p-3 rounded-4 shadow bg-light">
       
        <h5 className="mb-4 text-center fw-bold">Applications</h5>
        <Button className="my-2" onClick={()=>setShowModal(true)}>New Request</Button>
        <Table responsive>
          <thead>
            <tr>
              <th>Sr.no</th>
              
              <th>Subject</th>
              <th>From date</th>
              <th>To date</th>
              <th>Parents Approval</th>
              <th>Warden Approval</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((application, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{application?.subject}</td>
                <td>
                  {new Date(application?.fromdate).toISOString().split("T")[0]}
                </td>
                <td>
                  {new Date(application?.todate).toISOString().split("T")[0]}
                </td>
                <td style={{ color:application?.parentapproval === "Approved"?"green":application?.parentapproval === "Rejected"?"red":"orange"}}>{application?.parentapproval}</td>
                <td style={{ color:application?.wardenapproval === "Approved"?"green":application?.wardenapproval === "Rejected"?"red":"orange"}}>{application?.wardenapproval}</td>
                <td>
                  <Button
                    variant="primary"
                    className="rounded-pill"
                    onClick={() => handleDetailsClick(application)}
                  >
                    Details <BsArrowUpRight/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Application Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FromField
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FromField
                label="Description"
                as="textarea"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FromField
                label="From Date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Col>
            <Col>
              <FromField
                label="To Date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Col>
          </Row>
          <Button type="submit"  className="px-5">
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                aria-label="Loading"
              />
            ) : (
              "Submit"
            )}
          </Button>
        </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showApplication} onHide={handleCloseApplication}>
          <Modal.Header closeButton>
            <Modal.Title>Application Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Render detailed information from selectedApplication */}
            {selectedApplication && (
              <>
             
                
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

             <Row >
              <Col>
              <p className="fw-bold ">Parent Approval</p>
                <Button disabled variant="muted"  style={{ color:selectedApplication?.parentapproval === "Approved"?"green":selectedApplication?.parentapproval === "Rejected"?"red":"orange"}}>{selectedApplication?.parentapproval}</Button>

              </Col>
              <Col>
              <p className="fw-bold">Warden Approval</p>
                <Button disabled variant="muted" style={{ color:selectedApplication?.wardenapproval === "Approved"?"green":selectedApplication?.wardenapproval === "Rejected"?"red":"orange"}}>{selectedApplication?.wardenapproval}</Button>

              </Col>
            </Row>
               
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseApplication}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
       
      </Container>
    </section>
  );
}

export default Applications;
