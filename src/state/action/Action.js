export const storeCardData = (data) => {
    return {
        type: "STORE_CARD",
        payload: data
    }
}

export const getUserData = () => {
    // console.log("id" + id);
    return {
        type: "GET_USER_DATA",
    }
}