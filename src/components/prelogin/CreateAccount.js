
import { useState } from "react"
import { getLocalStorageData, getRandomNumBasedOnTime, ValidateEmail, checkEmailIDisAlreadyExists, checkStringContainsSpecialChars, checkStringContainsUpperCase, checkUsernameContainsAlphabets } from "../../common/CommonMethods"
import { PASSWORD_MAXLENGTH, USER_ID_CONSTANT } from "../../common/Constants"
import { useNavigate } from 'react-router-dom';

import { LoginElementComponent } from "../postlogin/HOC"
import Toast from "../popups/Toast"
import ErrorMessage from "../common/ErrorMessage";

function CreateAccount() {

    let JSON_DATA = getLocalStorageData()

    let navigate = useNavigate();

    const [showPassword, setPassword] = useState(false)

    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: '',
    })

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

    const togglePasswordHandler = () => {
        setPassword(!showPassword)
    }

    const [errorMessage, setErrorMessage] = useState({
        isUserNameErrorMessageAction: false,
        userNameErrorMessageContent: '',

        isEmailErrorMessageAction: false,
        emailErrorMessageContent: '',

        isPasswordErrorMessageAction: false,
        passwordErrorMessageContent: '',
    })

    const submitBtnHandler = () => {

        if (userDetails.username == "" || userDetails.username == null) {
            // console.log('Please enter username');
            setErrorMessage({
                ...errorMessage,
                isUserNameErrorMessageAction: true,
                userNameErrorMessageContent: "Please enter Username"
            })
            // ShowToastMessage('Please enter Username');
            // ShowErrorMessage("Please enter username");
            return;
        } else if (!checkUsernameContainsAlphabets(userDetails.username)) {
            setErrorMessage({
                ...errorMessage,
                isUserNameErrorMessageAction: true,
                userNameErrorMessageContent: "Username should contain alphabets"
            })
            // ShowToastMessage('Username should contain alphabets');
            return;
        } else if (userDetails.email == "" || userDetails.email == null) {
            // console.log('Please enter email');
            setErrorMessage({
                ...errorMessage,
                isUserNameErrorMessageAction: false,
                isEmailErrorMessageAction: true,
                emailErrorMessageContent: "Please enter email"
            })
            // ShowToastMessage('Please enter email');
            // ShowErrorMessage("Please enter email");
            return;
        } else if (!ValidateEmail(userDetails.email)) {
            // console.log('Please enter valid email id');
            setErrorMessage({
                ...errorMessage,
                isEmailErrorMessageAction: true,
                emailErrorMessageContent: "Please enter valid email id"
            })
            // ShowToastMessage('Please enter valid email id');
            // ShowErrorMessage("Please enter valid email id");
            return;
        } else if (userDetails.password == "" || userDetails.password == null) {
            // console.log('Please enter password');
            setErrorMessage({
                ...errorMessage,
                isEmailErrorMessageAction: false,
                isPasswordErrorMessageAction: true,
                passwordErrorMessageContent: "Please enter password"
            })
            // ShowToastMessage('Please enter password');
            // ShowErrorMessage("Please enter password");
            return;

        } else if (userDetails.password.length < PASSWORD_MAXLENGTH) {
            // console.log('Password is short');
            setErrorMessage({
                ...errorMessage,
                isPasswordErrorMessageAction: true,
                passwordErrorMessageContent: "Password is short"
            })
            // ShowToastMessage('Password is short');
            // ShowErrorMessage("Password is short");
            return;

        } else if (!checkStringContainsUpperCase(userDetails.password)) {
            // console.log('Password must contain atleast one special chars', !checkStringContainsSpecialChars());
            setErrorMessage({
                ...errorMessage,
                isPasswordErrorMessageAction: true,
                passwordErrorMessageContent: "Password must contain atleast one Uppercase chars"
            })
            // ShowToastMessage('Password must contain atleast one Uppercase chars');
            return;
        } else if (!checkStringContainsSpecialChars(userDetails.password)) {
            // console.log('Password must contain atleast one special chars', !checkStringContainsSpecialChars());
            setErrorMessage({
                ...errorMessage,
                isPasswordErrorMessageAction: true,
                passwordErrorMessageContent: "Password must contain atleast one special chars"
            })
            // ShowToastMessage('Password must contain atleast one special chars');
            return;
        } else if (checkEmailIDisAlreadyExists(userDetails.email)) {
            // console.log('Email id is already exists');
            setErrorMessage({
                ...errorMessage,
                isPasswordErrorMessageAction: true,
                passwordErrorMessageContent: "Email id is already exists"
            })
            // ShowToastMessage('Email id is already exists');
            return;
        }


        if (JSON_DATA === null) {
            JSON_DATA = [];
        }

        JSON_DATA.push({
            userDetails: { ...userDetails, id: USER_ID_CONSTANT + getRandomNumBasedOnTime() },
            taskDetails: []
        });

        console.log(JSON_DATA);
        // Resetting State
        setUserDetails(
            {
                username: '',
                email: '',
                password: '',
            }
        )

        ShowToastMessage('User added Successfully');

        localStorage.setItem("users", JSON.stringify(JSON_DATA));

        navigate('/')
        // ShowErrorMessage("Login successful");
    }



    return <>

        <div className="field_input_holder">

            <div className="field_input">
                <i className="fa-solid fa-user"></i>
                <input type="text" placeholder="Username" value={userDetails.username}
                    onChange={(e) => { setUserDetails({ ...userDetails, username: e.target.value }) }} />
            </div>

            <ErrorMessage status={errorMessage.isUserNameErrorMessageAction} message={errorMessage.userNameErrorMessageContent} />

        </div>

        <div className="field_input_holder">

            <div className="field_input">
                <i className="fa-solid fa-user"></i>
                <input type="email" placeholder="Email" value={userDetails.email} onChange={(e) => { setUserDetails({ ...userDetails, email: e.target.value }) }} />
            </div>

            <ErrorMessage status={errorMessage.isEmailErrorMessageAction} message={errorMessage.emailErrorMessageContent} />

        </div>

        <div className="field_input_holder">

            <div className="field_input">
                <i className="fa-solid fa-lock"></i>
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={userDetails.password} onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }} />
                <span onClick={togglePasswordHandler} className="password-tooltip"> <i className="fa-solid fa-eye "></i> </span>
            </div>

            <ErrorMessage status={errorMessage.isPasswordErrorMessageAction} message={errorMessage.passwordErrorMessageContent} />
        </div>

        <div className="field_input submit_btn_field">
            <button className="btn btn1" onClick={submitBtnHandler}>Submit</button>
        </div>



        <span className="signUp_now">Already have an account? <a onClick={() => {
            navigate('/')
        }}>Sign In</a> </span>


        <Toast
            message={toastMessage.message}
            activeStatus={toastMessage.active}
        />

    </>
}

export default LoginElementComponent(CreateAccount)