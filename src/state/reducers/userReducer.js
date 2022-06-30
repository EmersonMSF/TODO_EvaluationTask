// const initalState = [
//     {
//         "userDetails": {
//             "id": "UIDl4e5nvxr",
//             "username": "Emerson BR",
//             "email": "emersoncrash256@gmail.com",
//             "password": "itsmecrash"
//         },
//         "taskDetails": [
//             {
//                 cardID: 1,
//                 cardName: 'TODO',
//                 data: [
//                     {
//                         itemID: 'CID001',
//                         title: "Evaluation Task",
//                         description: "Store the task with relevant status in localstorage"
//                     }
//                 ]
//             },
//             {
//                 cardID: 2,
//                 cardName: 'InProgress',
//                 data: []
//             },
//             {
//                 cardID: 3,
//                 cardName: 'Completed',
//                 data: []
//             },
//             {
//                 cardID: 4,
//                 cardName: 'Tested',
//                 data: []
//             }
//         ]

//     }
// ]

// const initalState = JSON.parse(localStorage.users)
// import { getLocalStorageData } from "../components/HelperFunction"
import { getLocalStorageData } from "../../common/CommonMethods"
const initalState = getLocalStorageData()

const user = (state = initalState, action) => {
    switch (action.type) {
        case "GET_USER_DATA":
            return state

        default: return state
    }
}

export default user