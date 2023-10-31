import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import './MyPagination.css';

function MyPagination({ handleDelete, gifts, currentMember, open }) {

    const [pageApi, setPageApi] = useState(1);
    const itemsPerPage = 5;
    let indexStart = (pageApi * itemsPerPage) - (itemsPerPage);
    let indexEnd = indexStart + itemsPerPage;
    let tempGifts = gifts.slice(indexStart, indexEnd);
    const pageCount = Math.ceil(gifts.length / itemsPerPage);

    const removeItem = (id) => {
        console.log(id);
        let tempIdx = 0;
        let tempPagNum = indexEnd;
        for (let ii = 0; ii < gifts.length; ii++) {
            if (gifts[ii]._id === id) {
                handleDelete(tempIdx);
                // Checks if deletion caused user to land in empty pagination page, then sets back one page if so (they will never sit on empty page)
                if ((tempPagNum !== indexEnd) && (pageApi === pageCount)) {
                    setPageApi(pageApi - 1);
                }
            } else {
                tempIdx++;
            }
        }
    }

    return (
        <div id="my-pagination">
            <ul>
                {tempGifts.map((gift, idx) => (
                    <li key={idx}>
                        {gift.link ? (
                            <a target="_blank" rel="noreferrer" href={gift.link}>{gift.giftName}</a>
                        ) : gift.giftName}
                        {/* Renders delete button only for yourself */}
                        {open === currentMember ? (
                            <button className='delGift' onClick={() => removeItem(gift._id)}>Delete</button>
                        ) : null}
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
