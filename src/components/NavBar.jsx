import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./context/Contex";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function NavBar() {
  const { userId, verifyToken ,clearDetail} = useContext(GlobalContext);
  const token = JSON.parse(window.localStorage.getItem("token"));
  let navigate = useNavigate();
  useEffect(() => {
    verifyToken(token);
    return (()=> clearDetail())
  }, []);

  const handleLogout = () => {
    MySwal.fire({
      title: "¿Deseas cerrar sesión?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then(async (result) => {
      if (result.isConfirmed) {
        window.localStorage.removeItem("token");
        const res = await verifyToken(token);

        if (res === undefined) {
          await verifyToken(token);
          clearDetail()
          navigate("/login");
        }

        MySwal.fire("Logout correcto!", "Hasta pronto!", "success");
      }
    });
  };

  

  return (
    <Navbar className="my-3" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Bienvenido a tu ServisCar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userId == null || userId == undefined ? (
              <Nav.Link onClick={()=> navigate("/login")} >Login</Nav.Link>
            ) : (
              <>
                <Nav.Link  onClick={()=> navigate("/panel")}>Tus autos</Nav.Link>
                <Nav.Link   onClick={()=> navigate("/adminService")}>Tus services</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
            {userId == null || userId == undefined ? (
              <Nav.Link onClick={()=> navigate("/signup")} >Registrate</Nav.Link>
            ) : (
              <Nav.Link> Hola <b>{userId.msg.username}</b> </Nav.Link>
            )}

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
