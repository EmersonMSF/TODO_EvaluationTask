import Cards from "./Cards";
import { addLeadingZeros, getActiveUserID, getLocalStorageData, getRandomNumBasedOnTime, saveTaskDataInLocalStorage } from "../../common/CommonMethods";
import AddCard from "../popups/AddCard";
import { useEffect, useState } from "react";
import DeleteCard from "../popups/DeleteCard";
import Logout from "../popups/Logout";

import { storeCardData } from "../../state/action/Action";
import { connect } from "react-redux";
import { CardTitles, CARD_ITEMID_CONSTANT } from "../../common/Constants";

import { MenuComponent } from "./HOC";

function Homepage(props) {

    const [addCardPopupIsActive, SetAddCardPopupIsActive] = useState(false) //Add a card Button
    const [deleteCardPopupIsActive, SetDeleteCardPopupIsActive] = useState(false) // delete card button
    const [logoutStatus, SetLogoutStatus] = useState(false) // change later


    const [cardIdToAddCard, setCardIdToAddCard] = useState(0)
    const [cardItemIdToDeleteCardItem, setCardItemIdToDeleteCardItem] = useState('0')

    const [AllCardsData, setAllCardsData] = useState(props.cardDataProp) // data from redux

    useEffect(() => {
        setAllCardsData(props.cardDataProp)
    }, [])
    // console.log("props.cardDataProp", props.cardDataProp);

    const closePopups = () => {
        SetAddCardPopupIsActive(false)
        SetDeleteCardPopupIsActive(false)
        SetLogoutStatus(false)

        setCardIdToAddCard(0) // resetting selected card (for add card)
    }

    onkeydown = (e) => {
        if (e.keyCode === 27) {
            closePopups()
        }
    }

    const addCardData = (enteredCarddata) => {

        const currentAllCardsData = AllCardsData

        // console.log("props.cardDataProp", props.cardDataProp);
        // console.log("enteredCarddata", enteredCarddata);
        // console.log("cardIdToAddCard", cardIdToAddCard);
        console.log("before currentAllCardsData", currentAllCardsData);

        currentAllCardsData?.filter(item => {

            if (item.cardID === cardIdToAddCard) {

                let currentData = item.data;

                if (currentData === undefined) {
                    currentData = []
                }
                // console.log("currentData", currentData?.length);
                currentData?.push({
                    ...enteredCarddata,
                    // itemID: CARD_ITEMID_CONSTANT + addLeadingZeros((currentData?.length + 1), 3) // 3 digits number
                    itemID: CARD_ITEMID_CONSTANT + '_' + getRandomNumBasedOnTime() // 3 digits number
                })

                item['data'] = currentData
            }
        })

        console.log("after currentAllCardsData", currentAllCardsData);

        props.storeCardDataFunc(currentAllCardsData)

        saveTaskDataInLocalStorage(currentAllCardsData)

    }


    const deleteCardData = () => {

        const currentAllCardsData = AllCardsData

        currentAllCardsData.filter(item => {

            if (item.cardID === cardIdToAddCard) {
                let currentData = item.data;
                // console.log("currentData", currentData);

                const trimmedData = currentData.filter(currentCardItemData => currentCardItemData.itemID !== cardItemIdToDeleteCardItem)
                item['data'] = trimmedData
            }
        })

        props.storeCardDataFunc(currentAllCardsData)

        saveTaskDataInLocalStorage(currentAllCardsData)
    }

    const moveCardItem = (prevCardID, cardItemID, newCardID) => {

        // console.log("moveCardItem", moveCardItem);

        const currentAllCardsData = AllCardsData


        const AddTargetItemToNewCard = (targetItem) => {

            currentAllCardsData.filter(item => {

                if (item.cardID == newCardID) {

                    // destinationCard = item

                    // console.log("found destination card", destinationCard);
                    console.log("final targetItem", targetItem);


                    let currentData = item.data;

                    if (currentData === undefined) {
                        currentData = []
                    }
                    currentData?.push({
                        ...targetItem,
                        itemID: CARD_ITEMID_CONSTANT + '_' + getRandomNumBasedOnTime() // 3 digits number
                    })

                    item['data'] = currentData
                }
            })
        }

        let targetCardItem
        currentAllCardsData.filter(item => {

            let sourceCard
            let destinationCard


            // currentData.filter(currentCardItemData => currentCardItemData.itemID !== cardItemIdToDeleteCardItem)

            // remove the card item from the source card
            if (item.cardID == prevCardID) {
                sourceCard = item
                console.log("found source card", sourceCard);

                let myData = item.data
                const trimmedData = myData.filter(dataItem => {
                    if (dataItem.itemID !== cardItemID) {
                        return dataItem
                    } else {
                        targetCardItem = dataItem
                        AddTargetItemToNewCard(dataItem)
                    }

                })
                console.log("crash targetCardItem", targetCardItem);
                // console.log("crash trimmedData", trimmedData);

                item['data'] = trimmedData
            }

            // add code here
            // add the card item to the destination card

        })









        console.log("final currentAllCardsData", currentAllCardsData);


        // TODO: pending -> adding the data to the redux and localstorage
        props.storeCardDataFunc(currentAllCardsData)

        saveTaskDataInLocalStorage(currentAllCardsData)



    }






    return <div className="homepage_container">
        {/* <Header /> */}
        <div className="card_container">

            {
                CardTitles.map((currentTitle, index) => {

                    // console.log("AllCardsData", AllCardsData);
                    const currentCardDataBasedOnID = AllCardsData?.filter((item) => {
                        if (item.cardID === currentTitle.cardID)
                            return item
                    })

                    // console.log("currentCardDataBasedOnID", currentCardDataBasedOnID[0].data);

                    return <Cards
                        key={index}
                        cardNo={currentTitle.cardID}
                        title={currentTitle.cardName}
                        cardData={currentCardDataBasedOnID.length > 0 ? currentCardDataBasedOnID[0]?.data : null}
                        // cardData={currentCardDataBasedOnID?.data}
                        setAddCardPopupActiveFunc={SetAddCardPopupIsActive}
                        setDeleteCardPopupIsActiveFunc={SetDeleteCardPopupIsActive}
                        setCardIDFunc={setCardIdToAddCard}
                        setCardItemIdToDeleteCardItemFunc={setCardItemIdToDeleteCardItem}
                        moveCardItemFunc={moveCardItem}
                    />
                })
            }

        </div>

        <AddCard status={addCardPopupIsActive} closePopups={closePopups} addCardDataFunc={addCardData} />
        <DeleteCard status={deleteCardPopupIsActive} closePopups={closePopups} deleteCardDataFunc={deleteCardData} />
        <Logout status={logoutStatus} closePopups={closePopups} />

    </div>
}


const mapStateToProps = state => {
    return {
        cardDataProp: state.card
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeCardDataFunc: (data) => dispatch(storeCardData(data))
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent(Homepage))
// export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
export default MenuComponent(connect(mapStateToProps, mapDispatchToProps)(Homepage))