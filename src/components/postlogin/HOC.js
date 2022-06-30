import React from "react";
import Header from "../common/Header";


import loginBg from "../../assets/images/login_bg.jpg"
import logoImg from "../../assets/images/logo.jpg"

export const MenuComponent = OrginalComponent => {
    class NewComponent extends React.Component {
        render() {
            return <div className="main_container">
                <Header />
                <OrginalComponent />
            </div>
            // return <OrginalComponent />
        }
    }
    return NewComponent
}

export const LoginElementComponent = OrginalComponent => {
    class NewComponent extends React.Component {
        render() {
            return <div className="loginPage_container">

                <div className="form_elements">

                    <span className="welcomeTxt">Welcome to</span>

                    <span className="logo">
                        <img src={logoImg} />
                    </span>

                    <span className="page_content">Log in to get in the moment updates on the things that interest you.</span>

                    <OrginalComponent />


                </div>

                <span className="loginBg_holder">
                    <img src={loginBg} height="100%" />
                </span>


            </div>
        }
    }
    return NewComponent
}
