import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getError } from "../../utils/getError";
import { hideLoading, showLoading } from "../../features/loadingSlice";
import api from "../../utils/axios";
import FromField from "../../components/FormField";
import { BsArrowUpRight } from 'react-icons/bs';

function AllApplications() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getAllApplications = async () => {
    try {
      dispatch(showLoading());
      const response = await api.get("/api/admin/applications", {
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

  const handleAction = async(approvalStatus,applicationId)=>{

    try {
        dispatch(showLoading());

        const response = await api.patch(`/api/admin/application/${applicationId}`,{
            wardenapproval: approvalStatus,
        },{
          headers:{
            Authorization: token,
          }
        })

        dispatch(hideLoading());
        console.log(response);
        getAllApplications();
        setShowModal(false)
        
    } catch (error) {
        getError(error)
        dispatch(hideLoading());

    }
}

  const handleDetailsClick = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="d-flex justify-content-center align-items-center custom-section">
      <Container className="p-3 rounded-4 shadow bg-light">
        <h5 className="mb-4 text-center fw-bold">All Applications</h5>
        <Table responsive>
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Name</th>
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
                <td>
                  {`${application?.studentid?.firstname} ${application?.studentid?.lastname}`}
                </td>
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
            {/* Render detailed information from selectedApplication */}
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

            <Row>
              <Col md={4}>
              <p className="fw-bold">Parent Approval</p>
                <Button disabled variant="muted" style={{ color:selectedApplication?.parentapproval === "Approved"?"green":selectedApplication?.parentapproval === "Rejected"?"red":"orange"}}>{selectedApplication?.parentapproval}</Button>

              </Col>
              <Col>
              <p className="fw-bold">Warden Approval</p>
                <Button disabled variant="muted" style={{ color:selectedApplication?.wardenapproval === "Approved"?"green":selectedApplication?.wardenapproval === "Rejected"?"red":"orange"}}>{selectedApplication?.wardenapproval}</Button>

                {selectedApplication?.wardenapproval === "Pending"? 
<Row className="my-2">
            <Col >
              
              <Button
                variant="success"
                className="fw-bold rounded-pill w-100"
                onClick={()=> handleAction("Approved",selectedApplication._id)}
              >
                Approve
              </Button>
            </Col>
            <Col >

              <Button
                variant="danger"
                className=" fw-bold rounded-pill w-100"
                onClick={()=>handleAction("Rejected",selectedApplication._id)}
              >
                Reject
              </Button>
            </Col>
          </Row>

:null}

              </Col>

              </Row>    
               
              

              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
}

export default AllApplications;
