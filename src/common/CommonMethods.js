import axios from "axios";
import { CardTitles, DUMMY_JSON } from "./Constants";

const JSON_DATA = getLocalStorageData()
const ACTIVE_UID = getActiveUserID()
// const ACTIVE_UID = "CID_l4zkawu0"


export function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}

export function ValidateEmail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function getLocalStorageData() {
    if (localStorage.users === undefined) {
        return null
    } else {
        return JSON.parse(localStorage?.users)
    }
}

export function getActiveUserID() {

    // console.log("calling getActiveUserID()");
    if (localStorage.activeUser === undefined) {
        return null
    } else {
        return localStorage.activeUser
    }
}

export function getActiveUserTaskDetails() {
    // console.log("calling getActiveUserTaskDetails()");
    const currentActiveUser = JSON_DATA?.filter((item) => {
        // console.log("item.userDetails.id", item.userDetails.id);
        // console.log("getActiveUserID()", getActiveUserID());
        if (item.userDetails.id === getActiveUserID()) {
            // console.log("crash match found");
            return item
        } else {
            // console.log("crash match not found");
        }
    })

    if (currentActiveUser !== undefined) {
        let obj = currentActiveUser[0]?.taskDetails
        return obj
    } else {
        // console.log("CardTitles", CardTitles);
        return []
    }

}

export function getDefaultTaskDetailsIfEmpty() {
    // console.log("calling getDefaultTaskDetailsIfEmpty()");

    if (getActiveUserTaskDetails()?.length > 0) {

        // console.log('contains data', getActiveUserTaskDetails());
        return getActiveUserTaskDetails()
    } else {
        // console.log('contains empty', CardTitles);
        // getActiveUserTaskDetails()
        // console.log("crash getActiveUserTaskDetails() " + getActiveUserTaskDetails());
        // return getActiveUserTaskDetails() //TODO: remove this later
        return CardTitles
    }
}


export const saveTaskDataInLocalStorage = (data) => {

    console.log("saveTaskDataInLocalStorage", saveTaskDataInLocalStorage);

    JSON_DATA?.filter((item) => {
        if (item.userDetails.id === ACTIVE_UID) {
            // console.log("hi am here", item);
            // item["AddOrders"] = props.ordersDataProp
            item["taskDetails"] = data
        }
    })

    localStorage.setItem("users", JSON.stringify(JSON_DATA));
}

export const getRandomNumBasedOnTime = () => {
    return (new Date().getTime()).toString(36)
}

export const sortTableByColumnName = (jsonData, propertyName, sortType) => {

    console.log("jsonData", jsonData);
    if (sortType === "asc") {
        return jsonData.sort((a, b) => a[propertyName] > b[propertyName] ? 1 : -1)
    } else if (sortType === "desc") {
        return jsonData.sort((a, b) => a[propertyName] < b[propertyName] ? 1 : -1)
    }

    return jsonData
}

export const checkEmailIDisAlreadyExists = (emailID) => {

    const stateData = JSON_DATA?.some(item => {
        if (item.userDetails.email === emailID) {
            console.log("email found");
            return true
        }
    })
    return stateData
}

export const getActiveMenuIDFromSessionStorage = () => {
    if (sessionStorage.getItem('menuID') !== null) {
        return parseInt(sessionStorage.getItem('menuID'))
    } else {
        return 1 // 1 -> first menu item
    }
}

export const checkStringContainsSpecialChars = (string) => {
    // var specialchars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let specialchars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    console.log("string", string);
    console.log("specialchars.test(string)", specialchars.test(string));
    return specialchars.test(string)
}

export const checkStringContainsUpperCase = (str) => {
    return (/[A-Z]/.test(str));
}

export const checkUsernameContainsAlphabets = (str) => {
    var pattern = /[a-zA-Z]/g;
    return pattern.test(str)
}