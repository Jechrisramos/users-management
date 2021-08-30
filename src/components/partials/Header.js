import React, { useContext } from "react";
import UserContext from "../../UserContext";

import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
export default function Home(){

    // variables
    const { user } = useContext(UserContext);
    // useStates

    // useEffect

    // functions

    return(
        <header>
            <Navbar variant="dark" sticky="top" expand="lg">
                <Navbar.Brand as={Link} to="/">
                    <h3>User Management</h3>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="headerNav" />
                <Navbar.Collapse id="headerNav">
                    <Nav className="ml-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
                        <Navbar.Text>
                            Hi, {user.firstName}
                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    ); //end of return
} //end of Home()