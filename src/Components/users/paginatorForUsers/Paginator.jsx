import React from 'react';
import { useState } from 'react';
import style from './paginator.module.css';
import bodyStyle from './../../../body.module.css'
import cn from "classnames";

let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={style.paginator}>
        {portionNumber > 1 &&
            <button className={cn( bodyStyle.btn, style.paginator_btn) } onClick={() => { setPortionNumber(portionNumber - 1) }}>
                &laquo;
            </button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={cn({
                    [style.selected_page]: currentPage === p
                }, style.page_number) }
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
        {portionCount > portionNumber &&
            <button className={cn( bodyStyle.btn, style.paginator_btn) } onClick={() => { setPortionNumber(portionNumber + 1) }}>&raquo;</button>}
    </div>
}

export default Paginator;