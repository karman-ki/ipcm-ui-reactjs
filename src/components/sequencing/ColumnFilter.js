import React from "react";

const ColumnFilter = ({ column }) => {
    const {filterValue, setFilter} = column
    return(
        <span>
            <input className="input input-border text-field" id="search-field" value={filterValue || ''}
                placeholder={column.Header}
                onChange={e => setFilter(e.target.value)} />
        </span>
    )
}
export default ColumnFilter