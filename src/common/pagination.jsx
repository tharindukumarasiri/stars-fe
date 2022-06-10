import React from "react";

const Pagination = ({ pageNumber, pageCount, onChangePage }) => {

    const getPagesList = (start, end) => {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    return (
        <div className="cdp" actpage={pageNumber}>
            <a className="cdp_i" onClick={() => onChangePage('prev')} key={'pre'}>PREV</a>
            {getPagesList(1, pageCount).map(pageNum => {
                if (pageNum < pageNumber + 10 && pageNum > pageNumber - 10 || pageNum == 1 || pageNum == pageCount ) {
                    return <a className="cdp_i" onClick={() => onChangePage(pageNum)} key={pageNum}>{pageNum}</a>
                }
            })
            }
            <a className="cdp_i" onClick={() => onChangePage('next')} key={'nex'}>NEXT</a>
        </div>

    )
}

export default Pagination;