import { useState } from "react";

import { getLocalStorageData } from "../../common/CommonMethods";

import { useNavigate } from 'react-router-dom';
import { PASSWORD_MAXLENGTH } from "../../common/Constants";

import { LoginElementComponent } from "../postlogin/HOC";
import Toast from "../popups/Toast";
import ErrorMessage from "../common/ErrorMessage";

function Login() {

    let JSON_DATA = getLocalStorageData()
    let navigate = useNavigate();
    const [showPassword, setPassword] = useState(false)

    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: '',
    });

    const [toastMessage, setToastMessage] = useState({
        active: false,
        message: null,
    });



    const [errorMessage, setErrorMessage] = useState({
        isEmailErrorMessageAction: false,
        emailErrorMessageContent: '',

        isPasswordErrorMessageAction: false,
        passwordErrorMessageContent: '',
    })

    const togglePasswordHandler = () => {
        setPassword(!showPassword)
    }

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
            setErrorMessage({
                ...errorMessage,
                isEmailErrorMessageAction: true,
                emailErrorMessageContent: "Please enter username!"
            })
            // console.log("Please enter username!")
            // ShowToastMessage("Please enter username!")
            return;
        } else if (loginDetails.password == "") {
            setErrorMessage({
                ...errorMessage,
                isEmailErrorMessageAction: false,
                isPasswordErrorMessageAction: true,
                passwordErrorMessageContent: "Please enter password!"
            })
            // ShowToastMessage("Please enter password!")
            return;
        } else if (loginDetails.password.length < PASSWORD_MAXLENGTH) {
            setErrorMessage({
                ...errorMessage,
                isPasswordErrorMessageAction: true,
                passwordErrorMessageContent: "Password is short!"
            })
            // ShowToastMessage("Password is short")
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
            setErrorMessage({
                ...errorMessage,
                isPasswordErrorMessageAction: true,
                passwordErrorMessageContent: "Wrong Credentials, Please Try again"
            })
        }
    }


    return <>
        <div className="field_input_holder">

            <div className="field_input">
                <i className="fa-solid fa-user"></i>
                <input type="text" placeholder="Username" value={loginDetails.username} onChange={(e) => {
                    setLoginDetails({
                        ...loginDetails,
                        username: e.target.value
                    })
                }} />
            </div>

            <ErrorMessage status={errorMessage.isEmailErrorMessageAction} message={errorMessage.emailErrorMessageContent} />
        </div>

        <div className="field_input_holder">

            <div className="field_input">
                <i className="fa-solid fa-lock"></i>
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={loginDetails.password} onChange={(e) => {
                    setLoginDetails({
                        ...loginDetails,
                        password: e.target.value
                    })
                }} />
                <span onClick={togglePasswordHandler} className="password-tooltip"> <i className="fa-solid fa-eye "></i> </span>

            </div>

            <ErrorMessage status={errorMessage.isPasswordErrorMessageAction} message={errorMessage.passwordErrorMessageContent} />

        </div>

        <div className="field_input submit_btn_field">
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