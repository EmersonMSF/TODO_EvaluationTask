export default function DeleteCard(props) {

    const cancelBtnHandler = () => {
        props.closePopups(false)
    }

    const okBtnHandler = () => {
        props.deleteCardDataFunc()
        props.closePopups(false)
    }

    return <>
        <div className={(props.status) ? "overlay active" : "overlay"} onClick={() => {
            props.closePopups(false)
        }}></div>
        <div className={(props.status) ? "delete_card_popup_container popup_container active" : "delete_card_popup_container popup_container"} >

            <p className="heading">Are you want to delete the card?</p>


            {/* <p className="content">Are you want to delete the card? </p> */}

            <div className="actionBtns">
                <button className="btn btn2" onClick={cancelBtnHandler}>Cancel</button>
                <button className="btn btn1" onClick={okBtnHandler}>OK</button>
            </div>



        </div>
    </>
}