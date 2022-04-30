import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap'

export default function Topbar() {
  return (
    <div className="topbar mb-3" style={{height:"40px"}} >
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/home">
            <img
              src="https://icon-library.com/images/blog-icon-free/blog-icon-free-14.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top me-3"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/home">Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/create">Create</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
