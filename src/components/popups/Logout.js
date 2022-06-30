import { useNavigate } from 'react-router-dom';

export default function Logout(props) {
    let navigate = useNavigate();

    const cancelBtn = () => {
        props.closePopups(false)
    }

    const logoutBtnHandler = () => {
        props.closePopups(false)
        localStorage.removeItem('activeUser')
        navigate('/')
    }

    return <>

        <div className={(props.status) ? "overlay active" : "overlay"} onClick={() => {
            props.closePopups(false)
        }}></div>

        <div className={(props.status) ? "logout_container popup_container active" : "logout_container popup_container"} >


            <p className="heading">Are you want to logout?</p>


            {/* <p className="content">Are you want to delete the card? </p> */}

            <div className="actionBtns">

                <button className="btn btn2" onClick={cancelBtn}>Cancel</button>
                <button className="btn btn1" onClick={logoutBtnHandler}>OK</button>
            </div>
        </div>

    </>
}