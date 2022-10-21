import { useState } from "react";


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
                    const cl = sortable
                        ? sortField === accessor && order === "asc"
                            ? "up"
                            : sortField === accessor && order === "desc"
                                ? "down"
                                : "default"
                        : "";
                    return (
                        <th
                            key={accessor}
                            onClick={sortable ? () => handleSortingChange(accessor) : null}
                            className={cl}
                        >
                            {label}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHead;
