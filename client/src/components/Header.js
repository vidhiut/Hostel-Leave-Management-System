import React from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Header.css'
import { logout } from "../features/logoutSlice";

function Header() {
  const navigate = useNavigate();
 const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  console.log(userToken);

  const userIcon = (
    <span>
      <FaUser />
    </span>
  );

   const handleLogout= () =>{
       dispatch(logout());
       navigate("/")
   }
  return (
    <Navbar className="bg-body-transparent glass-morf" style={{ height: "60px" }}>
      <Container>
        <Navbar.Brand
          className="fw-bold fs-3"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          LOGO
        </Navbar.Brand>
        <Nav>
          <Nav.Link onClick={() => navigate("/")} className="fw-bold fs-5">
            Home
          </Nav.Link>
          {/* <Nav.Link
            onClick={() => navigate("/pricing")}
            className="fw-bold fs-5"
          >
            Pricing
          </Nav.Link> */}
        </Nav>

         {userToken ? (
       
          <DropdownButton variant="transparent"  id="dashboard-dropdown"  title={userIcon} style={{ zIndex: 1000 }} >
        
            <Dropdown.ItemText className="fw-bold text-muted">{user?.firstname + " " +user?.lastname}</Dropdown.ItemText>
            {user.role === "admin"?(
<>
{/* <Dropdown.Item className="fw-bold " as="button" onClick={()=>navigate('/warden/dashboard')}>Dashboard</Dropdown.Item> */}
<Dropdown.Item className="fw-bold " as="button" onClick={()=>navigate('/warden/profile')}>Profile</Dropdown.Item>
<Dropdown.Item className="fw-bold " as="button" onClick={()=>navigate('/warden/student-registration')}>Student Registration</Dropdown.Item>
<Dropdown.Item className="fw-bold " as="button" onClick={()=>navigate('/warden/all-students')}>All Students</Dropdown.Item>
<Dropdown.Item className="fw-bold " as="button" onClick={()=>navigate('/warden/all-applications')}>All Applications</Dropdown.Item>
</>
            ):(
<>
{/* <Dropdown.Item className="fw-bold " as="button" onClick={()=>navigate('/dashboard')}>Dashboard</Dropdown.Item> */}
<Dropdown.Item className="fw-bold " as="button" onClick={()=>navigate('/dashboard/profile')}>Profile</Dropdown.Item>
<Dropdown.Item className="fw-bold " as="button" onClick={()=>navigate('/dashboard/applications')}>Applications</Dropdown.Item>
</>
            ) }
           
            <Dropdown.Item className="fw-bold " as="button" onClick={handleLogout}>Log Out</Dropdown.Item>
         
          </DropdownButton>
        
        ) : (
          <Button
            variant="dark"
            onClick={() => navigate("/auth/student-login")}
            className="rounded-pill px-4 fw-bold"
          >
            Login
          </Button>
        )} 

        
      </Container>
    </Navbar>
  );
}

export default Header;
