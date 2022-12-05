
import { NavLink } from "react-router-dom";
import { Nav, Container, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { FaStackOverflow } from "react-icons/fa";
import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import CommonContext from "../context/CommonContext";

function Header() {

    const { isLoggedIn } = useContext(CommonContext);

    const searchBox = useRef();

    const history = useHistory();

    const handleSubmit = (e) => {

        e.preventDefault();

        const searchText = searchBox.current.value.trim();

        if (!searchText) {
            alert("Please enter something to search...");
        }
        else {

            const url = `/search/${searchText}`;
            searchBox.current.value = "";
            history.push(url);
        }
    }

    return <header className="headerMain">
        <Navbar className="headerNavbar" collapseOnSelect expand="lg" variant="light">
            <Container>
                <NavLink className="headerNavbarLogo" to="/">
                    <span className="logoSVG"><FaStackOverflow /> </span>
                    <span className="logoStack">stack</span>
                    <span className="logoOverflow">overflow</span>
                </NavLink>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Form onSubmit={handleSubmit} className="d-flex" >
                    <FormControl ref={searchBox}
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button type="submit" variant="outline-success">Search</Button>
                </Form>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavLink exact activeStyle={{ color: "hsl(27deg 90% 55%)" }} className="navLinks"
                            to="/">Home</NavLink>
                        <NavLink activeStyle={{ color: "hsl(27deg 90% 55%)" }} className="navLinks"
                            to="/questions">Questions</NavLink>
                        <NavLink activeStyle={{ color: "hsl(27deg 90% 55%)" }} className="navLinks"
                            to="/tags">Tags</NavLink>

                        {
                            isLoggedIn ? (<NavLink activeStyle={{ color: "hsl(27deg 90% 55%)" }} className="navLinks"
                                to="/profile">
                                <img src="https://res.cloudinary.com/hiddencloud1111/image/upload/v1634630235/defaultProfilePic_xlwkzb.png" alt="" className="proPic" /> Profile
                            </NavLink>) :
                                <><NavLink activeStyle={{ color: "hsl(27deg 90% 55%)" }} className="navLinks"
                                    to="/login">log-in</NavLink>
                                    <NavLink activeStyle={{ color: "hsl(27deg 90% 55%)" }} className="navLinks"
                                        to="/signup">sign-up</NavLink></>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>

}

export default Header;