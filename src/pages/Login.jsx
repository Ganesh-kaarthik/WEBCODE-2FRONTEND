import { useContext, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { FaStackOverflow } from "react-icons/fa";

import { Link, useHistory, Redirect } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import CommonContext from "../context/CommonContext";
import Loader from "../components/Loader";

export default function Login() {

    const { isLoggedIn, SetIsLoggedIn, setIsLoading } = useContext(CommonContext);

    const [errors, setErrors] = useState();

    const history = useHistory();

    const initialValues = {
        email: "richardjones8102@gmail.com",
        password: "meltan805"
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Required'),
        password: Yup.string()
            .required('Required')
            .min(6, "minimum 6 characters")
            .max(100, "maximum 100 characters")
    });

    const onSubmit = ({ email, password }) => {

        const uploadToBackend = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.post(`/auth/login`, {
                    email,
                    password
                });

                localStorage.setItem("token", data.token);
                localStorage.setItem("id", data.id);

                SetIsLoggedIn(true);
                setIsLoading(false);

                history.replace("/");
            }
            catch (err) {
                setIsLoading(false);
                setErrors(err?.response?.data);
                console.error(err);
            }
        }

        uploadToBackend();

    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    return (
        isLoggedIn ? <Redirect to="/" /> :
            <Loader>
                <Container >
                    <div className="login">

                        <div className="loginBody">
                            <div className="loginBodyTop">
                                <div className="loginLogo">
                                    <span className="logoSVG"><FaStackOverflow /> </span>
                                    <span className="logoStack">stack</span>
                                    <span className="logoOverflow">Login</span>
                                </div>
                                {
                                    errors ? <div className="errorAlert">
                                        <Alert variant="danger">
                                            {errors}
                                        </Alert>
                                    </div> : null
                                }
                                <Form onSubmit={formik.handleSubmit} >
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Enter email"
                                            onChange={formik.handleChange} value={formik.values.email}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.errors.email && formik.touched.email ?
                                                <Form.Text className="redErrors">
                                                    {formik.errors.email}
                                                </Form.Text> : null
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password"
                                            value={formik.values.password} placeholder="Min 6 characters" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {
                                            formik.errors.password && formik.touched.password ?
                                                <Form.Text className="redErrors">
                                                    {formik.errors.password}
                                                </Form.Text> : null
                                        }
                                    </Form.Group>
                                    <Button type="submit" className="skyBlueButton">
                                        Log in
                                    </Button>
                                    <Link to="/forgotpassword">
                                        <Button className="skyBlueButtonOutline" variant="outline-primary">Forgot password</Button>
                                    </Link>
                                </Form>
                            </div>
                            <div className="loginBodyBottom">
                                <p>Dont have an account?
                                    <Link to="/signup">
                                        <Button className="skyBlueButtonOutline" variant="outline-primary">Sign up</Button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Loader>
    )
}