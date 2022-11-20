import { useState } from 'react';
import RenderedList from '../RenderedList/RenderedList.jsx';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Home({ list, currentMember, setList }) {

    const [item, setItem] = useState({ giftName: '', link: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let { data } = await axios.post(`${SERVER_URL}/addGift`, { giftName: item.giftName, link: item.link, username: currentMember });
            setList(data);
            setItem({ giftName: '', link: '' });
        } catch (e) {
            console.error(e.message);
        }
    }

    const handleChange = (e) => {
        switch (e.target.id) {
            case "giftName":
                setItem({ giftName: e.target.value, link: item.link });
                break;
            case "link":
                setItem({ giftName: item.giftName, link: e.target.value });
                break;
            default:
                console.error('Reading wrong element data.');
        }
    }

    return (
        <div id="home">
            <h3>Add an item to your list</h3>
            <form onSubmit={handleSubmit}>
                <label>Item name</label>
                <input id="giftName" value={item.giftName} onChange={handleChange} />
                <label>Item link</label>
                <input id="link" value={item.link} onChange={handleChange} />
                <button>Add it!</button>
            </form>
            <RenderedList currentMember={currentMember} list={list} setList={setList} />
        </div>
    );
}
