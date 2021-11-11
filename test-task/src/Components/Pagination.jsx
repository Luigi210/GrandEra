import React, {useState, useEffect} from 'react';
import './Pagination.sass';
import TableUsers from "./TableUsers";


export default function Pagination({ data, setData, title, pageLimit, dataLimit }) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
    }, [data]);
    function goToNextPage() {
        if (currentPage < 2)
            setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;

        if (data.length < 10){
            console.log("Less");
        }
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };
    const newData = getPaginatedData();
    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };
    return (
        <div className="">
            <h1 className={"text-center"}> {title}</h1>
            <div className="dataContainer">
                <TableUsers users={newData} setUsers={setData}/>
            </div>

            <div className="pagination p-3">

                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    prev
                </button>

                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === 2 ? 'disabled' : ''}`}
                >
                    next
                </button>
            </div>
    </div>);
}
