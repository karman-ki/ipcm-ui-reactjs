import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import { FaSort } from "react-icons/fa";
import React from 'react';



const TableHead = ({ columns, order, sortField, handleSort }) => {

    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        handleSort(accessor, sortOrder);
    };

    return (
        <thead>
            <tr>
                {columns.map(({ label, accessor, sortable }) => {
                    const icon = sortable
                        ? sortField === accessor && order === "asc"
                            ? <FaSortUp className="sort-icon active" />
                            : sortField === accessor && order === "desc"
                                ? <FaSortDown className="sort-icon active" />
                                : <FaSort className="sort-icon" />
                        : "";
                    const cl = sortable ? "th-clickable" : "";
                    return (
                        <th
                            className={cl}
                            key={accessor}
                            onClick={sortable ? () => handleSortingChange(accessor) : null}
                        >
                            <div className="th-sort">
                                {label}
                                {icon}
                            </div>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHead;
