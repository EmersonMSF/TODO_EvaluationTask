import { useEffect, useState } from "react"
import { MenuItems } from "../../common/Constants"
import { useNavigate } from 'react-router-dom';
import Logout from "../popups/Logout";
import { getActiveMenuIDFromSessionStorage } from "../../common/CommonMethods";

export default function Header() {

    const [activeMenuID, setActiveMenuID] = useState(getActiveMenuIDFromSessionStorage())

    const [logoutPopupIsActive, SetLogoutPopupIsActive] = useState(false) //Add a card Button

    let navigate = useNavigate();

    const onClickHandler = (indexValue, pathValue) => {
        setActiveMenuID(indexValue + 1)
        sessionStorage.setItem('menuID', indexValue + 1)
        navigate(pathValue) // /dashboard | product
    }

    // useEffect(() => { }, [activeMenuID])

    const openLogoutPopup = () => {
        SetLogoutPopupIsActive(true)
    }
    onkeydown = (e) => {
        if (e.keyCode === 27) {
            closePopups()
        }
    }

    const closePopups = () => {
        SetLogoutPopupIsActive(false)
    }

    return <div className="header_container">

        <ul>
            {/* <li>Dashboard</li> */}
            {
                MenuItems.map((item, index) => {
                    return <li key={index} className={activeMenuID === (index + 1) ? "active" : null} onClick={() => {
                        onClickHandler(index, item.path)
                    }}>{item.name}</li>
                })
            }
        </ul>

        <span onClick={openLogoutPopup} className="logout_btn"><i className="fa-solid fa-power-off"></i></span>

        <Logout status={logoutPopupIsActive} closePopups={closePopups} />

    </div >
}