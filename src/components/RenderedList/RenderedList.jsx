import axios from 'axios';
import { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import MyPagination from '../Pagination/MyPagination';
import "./RenderedList.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function RenderedList({ list, setList, currentMember }) {

    const handlePurchase = async (gift) => {
        let giftObj = { giftNumber: gift, username: open, currentMember };
        try {
            let { data } = await axios.post(`${SERVER_URL}/updateGift`, giftObj);
            setList(data);
        } catch (e) {
            console.error(e.message);
        }
    }

    const handleDelete = async (gift) => {
        let giftObj = { giftNumber: gift, username: currentMember };
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
    const [open, setOpen] = useState("");
    const handleClose = () => setOpen("");
    const handleOpen = (username) => setOpen(username);

    return (
        <div id="rendered-list">
            {list.map((member, index) => (
                <div className="family-member-modal" key={index}>
                    <Button onClick={() => handleOpen(member.username)}>{member.username}</Button>
                    <Modal
                        open={open === member.username}
                        onClose={() => handleClose()}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <MyPagination handlePurchase={handlePurchase} open={open} currentMember={currentMember} handleDelete={handleDelete} gifts={member.gifts} />
                        </Box>
                    </Modal>
                </div>
            ))}
        </div>
    );
}

export default RenderedList;
