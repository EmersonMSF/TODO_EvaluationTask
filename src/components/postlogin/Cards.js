
export default function Cards(props) {

    const cardData = props.cardData
    const CardID = props.cardNo

    // Card Item
    // const [DraggingCardItemID, SetDraggingCardItemID] = useState('')
    // const [DraggingCardItem_PrevCardID, SetDraggingCardItem_PrevCardID] = useState('')

    // to open delete card popup
    const openDeleteCardPopup = (itemID) => {
        props.setDeleteCardPopupIsActiveFunc(true)
        props.setCardIDFunc(CardID) // send card id to Hompage to delete card item
        props.setCardItemIdToDeleteCardItemFunc(itemID) // send card item id to Hompage to delete
    }

    const ToggleCardDummy = (e, styleValue) => {
        let cardItem_holder = e.target.closest('.card_holder').querySelector('.cardItem_holder')
        let card_dummy = cardItem_holder.querySelector('.card_dummy')
        card_dummy.style.display = styleValue // flex | none
    }

    /////////////////////////////////////////////////////////////////////////////// Card Board Drag Events

    const dropCardBoard = e => {
        console.log("drop over");

        e.preventDefault();
        const cardItem_target_id = e.dataTransfer.getData('cardItem_id');
        const cardItem = document.getElementById(cardItem_target_id)
        cardItem.style.display = 'flex'

        let cardItem_holder = e.target.closest('.card_holder').querySelector('.cardItem_holder')
        cardItem_holder.appendChild(cardItem)

        // SetDraggingCardItemID(cardItem.getAttribute('data-card-item-id'))

        console.log("cardItem", cardItem);

        let PrevCardID = cardItem.getAttribute('data-parent-card-id')
        let DraggingCardItemID = cardItem.getAttribute('data-card-item-id')
        let newCardID = e.target.closest('.card_holder').getAttribute('data-card-id')
        // console.log("PREVIOUS CardID", PrevCardID);
        // console.log("DraggingCardItemID", DraggingCardItemID);
        // console.log("NEW CardID", newCardID);

        props.moveCardItemFunc(PrevCardID, DraggingCardItemID, newCardID)

    }

    const dragOverCardBoard = e => {
        // console.log("drag over");
        e.preventDefault()
        // let cardItem_holder = e.target.closest('.card_holder').querySelector('.cardItem_holder')
        // let card_dummy = cardItem_holder.querySelector('.card_dummy')
        // card_dummy.style.display = "flex"

        ToggleCardDummy(e, 'flex')
    }

    const dragLeaveCardBoard = e => {
        // e.preventDefault()

        console.log('drag leave');
        // let cardItem_holder = e.target.closest('.card_holder').querySelector('.cardItem_holder')
        // let card_dummy = cardItem_holder.querySelector('.card_dummy')
        // card_dummy.style.display = "none"
        ToggleCardDummy(e, 'none')
    }

    const dragEndCardBoard = e => {
        // console.log('drag end');
        if (e.target.style.display === "none") {
            e.target.style.display = "flex"
        }

        // let cardItem_holder = e.target.closest('.card_holder').querySelector('.cardItem_holder')
        // let card_dummy = cardItem_holder.querySelector('.card_dummy')
        // card_dummy.style.display = "none"

        ToggleCardDummy(e, 'none')

    }

    //End of Card Board Drag Events

    /////////////////////////////////////////////////////////////////////////////// Card Item Drag Events

    const dragStart = e => {
        let target = e.target;
        e.dataTransfer.setData('cardItem_id', target.id)

        setTimeout(() => {
            target.style.display = "none"
        }, 0)

        // console.log("target",);
        // SetDraggingCardItem_PrevCardID(target.closest('.card_holder').getAttribute('data-card-id'))
        // console.log("crash DraggingCardItem_PrevCardID", target.closest('.card_holder').getAttribute('data-card-id'));
        // console.log("crash current card item id" + e.target.getAttribute('data-card-item'));
        // console.log("crash current CardID" + CardID);
    }

    const dragOver = e => {
        e.stopPropagation();
    }

    // Card Item Drag Events

    const CardItem = (props) => {

        return <div className="cardItem"
            id={props.CardItemID}
            draggable="true"
            onDragStart={dragStart}
            onDragOver={dragOver}
            data-card-item-id={props.CardItemID}
            data-parent-card-id={props.ParentCardID}>
            <p>{props.CardItemTitle}</p>
            <span className="close_btn" onClick={() => openDeleteCardPopup(props.CardItemID)}>&times;</span>
        </div>
    }



    return <div className="card_holder" onDragOver={dragOverCardBoard} onDragEnd={dragEndCardBoard} onDragLeave={dragLeaveCardBoard} onDrop={dropCardBoard} data-card-id={props.cardNo}>
        <div className="card">
            <span className="title">{props.title}</span>

            <div className="cardItem_holder">

                {
                    cardData?.map((card, index) => {
                        return <CardItem
                            key={index}
                            CardItemTitle={card.title}
                            CardItemID={card.itemID} // card item id
                            ParentCardID={props.cardNo} // card id
                        // id={"card_" + (index + 1)}
                        // draggable="true"
                        // className="card_item"
                        />
                    })
                }


                <div className="card_dummy"></div>
            </div>


            <div className="add_cardBtn">
                <button className="btn btn1" onClick={() => {
                    console.log("clicked");
                    props.setAddCardPopupActiveFunc(true)
                    props.setCardIDFunc(CardID)
                }}>
                    <i className="fa-solid fa-plus"></i>
                    Add a card</button>
            </div>

            {/* <div className="card_overlay"></div> */}
        </div>
    </div>
}