import { Pagination, Stack, Button } from '@mui/material';
import { useState } from 'react';
import './MyPagination.css';

function MyPagination({ handlePurchase, handleDelete, gifts, currentMember, open }) {

    const [pageApi, setPageApi] = useState(1);
    const itemsPerPage = 5;
    let indexStart = (pageApi * itemsPerPage) - (itemsPerPage);
    let indexEnd = indexStart + itemsPerPage;
    let tempGifts = gifts.slice(indexStart, indexEnd);
    let pageCount = Math.ceil(gifts.length / itemsPerPage);

    const removeItem = (id) => {
        let tempIdx = 0;
        for (let ii = 0; ii < gifts.length; ii++) {
            if (gifts[ii]._id === id) {
                handleDelete(tempIdx);
                // Checks if deletion caused user to land in empty pagination page, then sets back one page if so (they will never sit on empty page)
                if ((Math.ceil((gifts.length - 1) / itemsPerPage)) !== (Math.ceil(gifts.length / itemsPerPage))) {
                    setPageApi(pageApi - 1);
                }
            } else {
                tempIdx++;
            }
        }
    }

    const handleClickedPurchase = (id) => {
        let tempIdx = 0;
        for (let ii = 0; ii < gifts.length; ii++) {
            if (gifts[ii]._id === id) {
                handlePurchase(tempIdx);
            } else {
                tempIdx++;
            }
        }
    }

    const handleClickedUnpurchase = (id, buyer) => {
        if (currentMember === buyer) {
            let tempIdx = 0;
            for (let ii = 0; ii < gifts.length; ii++) {
                if (gifts[ii]._id === id) {
                    handlePurchase(tempIdx);
                } else {
                    tempIdx++;
                }
            }
        }
    }

    return (
        <div id="my-pagination">
            <ul className='item-list'>
                {tempGifts.map((gift, idx) => (
                    <li key={idx}>
                        {gift.link ? (
                            <a target="_blank" rel="noreferrer" href={gift.link}>{gift.giftName}</a>
                        ) : gift.giftName}
                        {/* Renders delete button only for yourself */}
                        {open === currentMember ? (
                            <Button variant="outlined " id='delGift' onClick={() => removeItem(gift._id)}>Delete</Button>
                        ) : gift.bought ? (
                            // If not rendering delete, that means you are viewing someone else's list, in which case display purchase button as well as who is purchasing it.
                            <Button onClick={() => handleClickedUnpurchase(gift._id, gift.buyer)}>Bought By {gift.buyer}</Button>
                        ) : (
                            // No one is buying, click button to purchase.
                            <Button onClick={() => handleClickedPurchase(gift._id)}>Buy Gift</Button>
                        )}
                    </li>
                ))}
            </ul>
            <Stack spacing={2}>
                <Pagination count={pageCount} color="primary" onChange={((e, value) => setPageApi(value))} />
            </Stack>
        </div >
    )
}

export default MyPagination;
