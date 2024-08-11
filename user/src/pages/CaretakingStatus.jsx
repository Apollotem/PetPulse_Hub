import { useEffect, useState } from "react"
import { httpRequest } from "../API/api"
const CaretakingStatus = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const [caretakingList, setCaretakingList] = useState([])
    useEffect(() => {
        httpRequest('get', `api/user/getCaretaking?userId=${userId}`)
            .then((res) => {
                setCaretakingList(res.data)
                console.log(res.data);
                
            })
            .catch((err) => console.log(err))
    }, [])
    return (
        <div>
            caretaking service <br />
            {
                caretakingList.length===0?"service request is empty":""
            }
        </div>
    )
}

export default CaretakingStatus
