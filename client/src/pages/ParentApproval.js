import React, { useEffect, useState } from "react";
import { getError } from "../utils/getError";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../features/loadingSlice";
import api from "../utils/axios";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import FromField from "../components/FormField";

function ParentApproval() {
  const [application, setApplication] = useState(null);

  const dispatch = useDispatch();

  const { applicationId } = useParams();

  const approvalButtons = {
    Approved: <Button variant="success" disabled className="w-50 rounded-pill">Approved</Button>,
    Rejected: <Button variant="danger" disabled className="w-50 rounded-pill">Rejected</Button>,
    Pending: null,
  };

  const approvalButton = approvalButtons[application?.parentapproval];

  useEffect(() => {
    const getApplication = async () => {
      try {
        dispatch(showLoading());

        const response = await api.get(
          `/api/parent/application/${applicationId}`
        );

        console.log(response);

        dispatch(hideLoading());

        setApplication(response?.data?.application);
      } catch (error) {
        getError(error);
        dispatch(hideLoading());
      }
    };

    getApplication();
  }, [applicationId]);



    const handleAction = async(approvalStatus)=>{

        try {
            dispatch(showLoading());

            const response = await api.patch(`/api/parent/application/${applicationId}`,{
                parentapproval: approvalStatus,
            })

            dispatch(hideLoading());

            const {updatedApplication} = response.data;
            setApplication(updatedApplication);
            
            
        } catch (error) {
            getError(error)
            dispatch(hideLoading());


        }
    }


  return (
    <section className="d-flex justify-content-center align-items-center custom-section">
      <Container className="p-3 rounded-4 shadow bg-light">
       <h5 className="text-center fw-bold">Application</h5>

         {application?
          <Form>
         <FromField
            label="Name"
            value={`${application?.studentid?.firstname} ${application?.studentid?.lastname}`}
            disabled={true}
          />
          <FromField
            label="Subject"
            value={application?.subject}
            disabled={true}
          />
          <Row>
            <Col md={3}>
              <FromField
                label="From Date"
                // value={application?.fromdate}
                value={new Date(application?.fromdate).toISOString().split("T")[0]}
                disabled={true}
              />
            </Col>
            <Col md={3}>
              <FromField
                label="To Date"
                // value={application?.todate}
                value={new Date(application?.todate).toISOString().split("T")[0]}
                disabled={true}
              />
            </Col>
          </Row>

          <FromField
            label="Description"
            value={application?.description}
            disabled={true}
          />

{application?.parentapproval === "Pending"? 
<Row>
            <Col md={3}>
              
              <Button
                variant="success"
                className="mx-3 px-5 fw-bold rounded-pill w-100"
                onClick={()=> handleAction("Approved")}
              >
                Approve
              </Button>
            </Col>
            <Col md={3}>

              <Button
                variant="danger"
                className="mx-3 px-5 fw-bold rounded-pill w-100"
                onClick={()=>handleAction("Rejected")}
              >
                Reject
              </Button>
            </Col>
          </Row>


:null}
          
         
          </Form>
         
         : null}   
          
          {approvalButton}

      </Container>
    </section>
  );
}

export default ParentApproval;
