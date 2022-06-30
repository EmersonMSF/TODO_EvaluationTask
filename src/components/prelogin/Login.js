import { useState } from "react";

import { getLocalStorageData } from "../../common/CommonMethods";

import { useNavigate } from 'react-router-dom';
import { PASSWORD_MAXLENGTH } from "../../common/Constants";

import { LoginElementComponent } from "../postlogin/HOC";
import Toast from "../popups/Toast";


function Login() {

    let JSON_DATA = getLocalStorageData()

    let navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: '',
    });

    const [toastMessage, setToastMessage] = useState({
        active: false,
        message: null,
    });

    function ShowToastMessage(messageContent) {
        let errorMessageInterval = setInterval(() => {
            setToastMessage({
                ...toastMessage,
                active: false,
            });

            clearInterval(errorMessageInterval);
        }, 3000);

        setToastMessage({
            active: true,
            message: messageContent,
        });

    }

    function checkCred() {
        const res = JSON_DATA?.find((item) => {
            if (item.userDetails.email === loginDetails.username) {
                // console.log(true);

                if (item.userDetails.password === loginDetails.password) {

                    return true
                } else {
                    console.log("Password is wrong!");
                    ShowToastMessage("Password is wrong!")
                    return false
                }
            } else {
                console.log("Username is wrong!");
                ShowToastMessage("Username is wrong!")
                return false;
            }
        });

        return res
    }

    const loginNowHandler = () => {

        if (loginDetails.username == "") {
            ShowToastMessage("Please enter username!")
            return;
        } else if (loginDetails.password == "") {
            ShowToastMessage("Please enter password!")
            return;
        } else if (loginDetails.password.length < PASSWORD_MAXLENGTH) {
            ShowToastMessage("Password is short")
            return;
        }


        let loggedUser = checkCred()

        // console.log('loggedUser', loggedUser);

        if (loggedUser !== undefined) {
            localStorage.setItem("activeUser", loggedUser.userDetails.id)
            console.log("Login success", loginDetails.username);
            ShowToastMessage("Login success")
            navigate('/dashboard')
        } else {
            ShowToastMessage("Wrong Credentials, Please Try again")
            console.log("Login failed");
        }
    }



    return <>

        <div className="field_input">
            <i className="fa-solid fa-user"></i>
            <input type="text" placeholder="Username" value={loginDetails.username} onChange={(e) => {
                setLoginDetails({
                    ...loginDetails,
                    username: e.target.value
                })
            }} />
        </div>

        <div className="field_input">
            <i className="fa-solid fa-lock"></i>
            <input type="password" placeholder="Password" value={loginDetails.password} onChange={(e) => {
                setLoginDetails({
                    ...loginDetails,
                    password: e.target.value
                })
            }} />
        </div>

        <div className="field_input">
            <button className="btn btn1" onClick={loginNowHandler}>Sign In</button>
        </div>


        <span className="signUp_now" >Don't have an account? &nbsp;<a onClick={() => {
            // console.log("create account now");
            navigate('/createAccount');

        }}>Sign Up Now</a> </span>

        <Toast
            message={toastMessage.message}
            activeStatus={toastMessage.active}
        />
    </>
}

export default LoginElementComponent(Login)