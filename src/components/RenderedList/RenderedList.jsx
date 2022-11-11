import './RenderedList.css';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function RenderedList({ list, currentMember, setList }) {

    const handleDelete = async (gift) => {
        let giftObj = { giftNumber: gift, username: currentMember }
        try {
            // Removes deleted gift from back-end list
            await axios.post(`${SERVER_URL}/deleteGift`, giftObj);
            // Removes deleted gift from front-end list
            for (let ii = 0; ii < list.length; ii++) {
                if (list[ii].username === currentMember) {
                    let hardCopy = JSON.parse(JSON.stringify(list));
                    hardCopy[ii].gifts.splice(gift, 1);
                    setList(hardCopy);
                }
            }
        } catch (e) {
            console.error(e.message);
        }
    }

    const handleUpdate = async (person, gift) => {
        try {
            let username = list[person].username;
            let giftObj = { giftNumber: gift, username, currentMember };
            let { data } = await axios.post(`${SERVER_URL}/updateGift`, giftObj);
            console.log(data);
            setList(data);
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div id="renderedList">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Gifts & Links</th>
                </tr>
                {list.map((item, idx) => (
                    <tr key={idx}>
                        <th>{item.username}</th>
                        {item.gifts.map((gift, index) => (
                            <th key={index}>
                                <h5 id="giftName">{gift.giftName}</h5>
                                <a rel="noopener" href={gift.link}>LINK</a>
                                {item.username !== currentMember ? gift.bought === true ? <h6>DON'T BUY</h6> : null : null}
                                {item.username === currentMember ? (
                                    <div>
                                        <button id="deleteButton" onClick={() => handleDelete(index)}>Del</button>
                                    </div>
                                ) : null}
                                {item.username !== currentMember ? (
                                    <div>
                                        <button id="updateButton" onClick={() => handleUpdate(idx, index)}>Buy</button>
                                    </div>
                                ) : null}
                            </th>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    );
}
