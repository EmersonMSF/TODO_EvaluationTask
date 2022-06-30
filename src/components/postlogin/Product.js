import Header from "../common/Header"
import axios from "axios"
import { useEffect, useState } from "react"
import { PRODUCT_TABLEHEADERS, API_URL, PRODUCT_TABLE_MAXDATA } from "../../common/Constants"
import { sortTableByColumnName } from "../../common/CommonMethods"
import { DUMMY_JSON } from "../../common/Constants"
import React from "react"
import Loader from "../common/Loader"

export default function Product() {

    const [OrderData, setOrderData] = useState([])

    const [loaderStatus, setLoaderStatus] = useState(false)

    async function getAPIdata(columnID, sortType) {
        setLoaderStatus(true)

        await fetch(API_URL, {
            method: 'GET'
        }).then(r => r.json().then(data => ({ body: data })))
            .then(obj => {
                setLoaderStatus(false)

                console.log("obj", obj.body);


                const fetchedData = obj.body.map(data => {
                    return {
                        ...data,
                        id: parseInt(data.id),
                        price: parseFloat(data.price)
                    }
                })

                setOrderData(sortTableByColumnName(fetchedData, JSON_IDS[columnID], sortType)) //JSON_IDS[1] -> id

            })

    }


    const JSON_IDS = ['id', 'name', 'description', 'price']
    // 0 -> s.no
    // 1 -> id
    // 2 -> name
    // 3 -> description
    // 4 -> price

    // const [sortTableByColumnID, setSortTableByColumnID] = useState(0)

    useEffect(() => {
        // console.log("API data", fetchData());
        console.log("data changed");
        getAPIdata()
    }, [])

    return <div className="product_container">
        <Header />

        <table className="table_container">
            <thead>
                <tr>
                    {
                        PRODUCT_TABLEHEADERS.map((item, index) => {
                            return <th key={index} className="tableheader">{item}
                                <div className="tableheader_dropdown">
                                    <span onClick={(e) => {
                                        getAPIdata(index - 1, 'asc')
                                    }}>Ascending</span>
                                    <span onClick={(e) => {
                                        getAPIdata(index - 1, 'desc')
                                    }}>Descending</span>
                                </div>
                            </th>
                        })
                    }
                </tr>
            </thead>

            <tbody>

                {
                    OrderData?.slice(0, PRODUCT_TABLE_MAXDATA).map((item, index) => {
                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                        </tr>
                    })
                }

            </tbody>

        </table >

        <Loader status={loaderStatus} />

    </div >

}