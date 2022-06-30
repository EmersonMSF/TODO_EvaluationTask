import { useState } from "react"
import { connect } from "react-redux";


function AddCard(props) {

    const AllCardsData = props.cardDataProp // data from redux

    const [CardItemData, setCardItemData] = useState({
        itemID: null,
        title: '',
        description: ''
    })

    const addCardItemHandler = () => {

        if (CardItemData.title == "" || CardItemData.title == null) {
            console.log('Please enter title');
            // ShowErrorMessage("Please enter title");
            return;
        } else if (CardItemData.description == "" || CardItemData.description == null) {
            console.log('Please enter description');
            // ShowErrorMessage("Please enter description");
            return;
        }

        console.log('card added');
        props.addCardDataFunc(CardItemData)

        setCardItemData({
            itemID: '',
            title: '',
            description: ''
        })
        props.closePopups(false)
    }

    return <>
        <div className={(props.status) ? "overlay active" : "overlay"} onClick={() => {
            props.closePopups(false)
        }}></div>
        <div className={(props.status) ? "addCard_popup_container popup_container active" : "addCard_popup_container popup_container"} >
            <p className="heading">Add a Card</p>

            <div className="field_input">
                <input type="text" placeholder="Title" value={CardItemData.title} onChange={(e) => {
                    setCardItemData({
                        ...CardItemData,
                        title: e.target.value
                    })
                }} />
            </div>

            <div className="field_input description_field">
                <textarea placeholder="Description" value={CardItemData.description} onChange={(e) => {
                    setCardItemData({
                        ...CardItemData,
                        description: e.target.value
                    })
                }}></textarea>
            </div>

            <button className="btn btn1" onClick={addCardItemHandler}>Add</button>

        </div>
    </>

}


const mapStateToProps = state => {
    return {
        cardDataProp: state.card
    }
}


export default connect(mapStateToProps, null)(AddCard)