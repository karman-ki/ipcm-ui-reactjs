import React from "react";

const GlobalFilter = ({filter, setFilter}) => {
    return(
        <div className='table-search'>
        <span>            
            Search : {' '}
            <input className="input input-border text-field table-searchfield"
            value={filter || ''}
          onChange={(e) => setFilter(e.target.value)} />               
        </span>
        </div>
    )
}
export default GlobalFilter