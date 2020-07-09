import React,{useState,useRef} from 'react';
import { Container, Row, Modal,Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import SimpleReactValidator from 'simple-react-validator';
import { Redirect } from "react-router-dom";

import API from "./../utils/API";

import { connect } from "react-redux";
import { saveData } from "./../reduxUtils/actions";


const Login = (props) => {
    const validator = useRef(new SimpleReactValidator())
    const [, forceUpdate] = useState();
    
    const [values, setValues] = useState({ email: 'test@gmail.com', password: 'password' });
    const [btnLogin, setBtnLogin] = useState("Login");

    const [redToDashboard,setRedToDashboard] = useState(false);
    
    const handleChange = event => {
      const { name, value } = event.target;
      setValues({
        ...values,
        [name]: value
      })
    };

    const loginSubmit = e => {
        e.preventDefault();
        const formValid = validator.current.allValid();
          if (!formValid) {
            validator.current.showMessages();
            forceUpdate(1);
          }else{
              var formData = new FormData(e.target);
              formData.append("email", values.email);
              formData.append("password", values.password);
              setBtnLogin("Loading...");
                API.post('/api/login', formData).then((res) => {
                    console.log(res);
                    localStorage.setItem('user_token', JSON.stringify(JSON.stringify(res.data.token)));
                    getProfile(res.data.token);
                }).catch((er) => {
                  alert("invalid credentials");
                  setBtnLogin("Login");
                });
        }
      };
      const getProfile = (token) => {
        API.post('/api/user/details',{ headers: { Authorization: `Bearer ${token}`}}).then((res) => {
            console.log(res.data.profile);
            props.loginAction(res.data.profile);
            setRedToDashboard(true);
            setBtnLogin("Login");
        }).catch((er) => {
          console.log("error");
        });
    }

    return(
        <> 
        
        {redToDashboard ? <Redirect to="/home" /> : null}
        
        <Container>
          <Form className="login-form" onSubmit={loginSubmit} noValidate>
            <Form.Group as={Row}>
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              {validator.current.message('email', values.email, 'required')}
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              {validator.current.message('password', values.password, 'required')}
            </Form.Group>
            <Button type="submit" className="login-btn">
              {btnLogin}
            </Button>
          </Form>
          </Container>
        </>
    );
}
const mapDispatchToProps = {
    loginAction: saveData
};
const mapStateToProps = function(state) {
    return {
      profile: state.storeData,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
  
// export default Login;