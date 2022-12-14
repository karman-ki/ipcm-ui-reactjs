import React from "react";

const GlobalFilter = ({filter, setFilter}) => {
    return(
        <div className='form-inline table-search'>
            <label>Search:</label>
            <input className="form-control" 
                   value={filter || ''}
                   onChange={(e) => setFilter(e.target.value)} />               
        </div>
    )
}
export default GlobalFilter