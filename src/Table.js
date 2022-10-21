import { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import TableHeadSearch from "./TableHeadSearch";


const Table = ({tableData, columns, order, sortField, handleSort, handleSearch }) => {
    return (
        <>
            <table className="table">
                {/* ... */}
                <TableHead {...{ columns, order, sortField, handleSort }} />
                <TableHeadSearch {...{ columns, handleSearch }} />
                <TableBody {...{ columns, tableData }} />
            </table>
        </>
    );
};

export default Table;