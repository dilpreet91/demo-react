import React,{useState,useEffect} from 'react';
import API from "./../utils/API";
import { connect } from "react-redux";
import { saveData } from "./../reduxUtils/actions";
import { Redirect } from "react-router-dom";

const Home = (props) => {
    
    const [redToLogin,setRedToLogin] = useState(false);

    const logout = () => {
        localStorage.clear();
        setRedToLogin(true);
    }

    return(
        <>
            {redToLogin ? <Redirect to="/" /> : null}
            <p>Welcome {props.profile.fname} {props.profile.lname}</p> 

            <br />
            <p onClick={logout}>LOGOUT</p>
            <table className="table table-bordered table-striped">
                <tr>
                    <th>Name</th>
                    <th>about</th>
                    <th>age</th>
                    <th>email</th>
                    <th>phone No</th>
                    <th>gender</th>
                    <th>address</th>
                </tr>
                <tr>
                    <td> {props.profile.fname} {props.profile.lname}</td>
                    <td> {props.profile.about}</td>
                    <td> {props.profile.age}</td>
                    <td> {props.profile.email}</td>
                    <td> {props.profile.phone}</td>
                    <td> {props.profile.gender}</td>
                    <td> {props.profile.city} {props.profile.state} {props.profile.country} </td>
                </tr>
            </table>
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
)(Home);
// export default Home;