import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function HomePage() {
  return (
   
    <Container className='custom-section d-flex justify-content-center'>
        <Row className='py-5 my-5'>
            <Col  data-aos="zoom-in" data-aos-duration='500' data-aos-delay="300" >
                    <h1 className='display-1 fw-bold ' >Welcome to DigiGuard</h1>
            </Col>
        </Row>
    </Container>
  
  )
}

export default HomePage