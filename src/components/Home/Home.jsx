import { useState } from 'react';
import RenderedList from '../RenderedList/RenderedList.jsx';
import axios from 'axios';
import { Button } from '@mui/material';
import "./Home.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Home({ list, currentMember, setList }) {

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
            <form id="add-item-form" onSubmit={handleSubmit}>
                <label className='add-form-item'>Item Name</label>
                <input className='add-form-item' id="giftName" placeholder='Required' value={item.giftName} onChange={handleChange} />
                <label className='add-form-item'>Link to Purchase</label>
                <input className='add-form-item' id="link" placeholder='Optional' value={item.link} onChange={handleChange} />
                <Button type='submit' variant='outlined'>Add it!</Button>
            </form>
            <RenderedList currentMember={currentMember} list={list} setList={setList} />
        </div>
    );
}

export default Home;
