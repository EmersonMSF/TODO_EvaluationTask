import { getActiveUserTaskDetails, getDefaultTaskDetailsIfEmpty } from "../../common/CommonMethods";

// const initalState = [
//     {
//         cardID: 1,
//         cardName: 'TODO',
//         data: [
//             {
//                 itemID: 'CID001',
//                 title: "Evaluation Task",
//                 description: "Store the task with relevant status in localstorage"
//             }
//         ]
//     },
//     {
//         cardID: 2,
//         cardName: 'InProgress',
//         data: []
//     },
//     {
//         cardID: 3,
//         cardName: 'Completed',
//         data: []
//     },
//     {
//         cardID: 4,
//         cardName: 'Tested',
//         data: []
//     }
// ]

// const initalState = getActiveUserTaskDetails()

const initalState = getDefaultTaskDetailsIfEmpty()

// console.log("card initalState", initalState);

const card = (state = initalState, action) => {

    switch (action.type) {
        case "STORE_CARD":
            // console.log("getActiveUserTaskDetails()", getActiveUserTaskDetails());
            console.log("STORE_CARD state", state);
            console.log("STORE_CARD", action.payload);
            return Object.assign(state, action.payload)
            // return state
            break;



        default: return state
    }

}

export default card