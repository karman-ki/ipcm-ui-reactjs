import React from "react";

const GlobalFilter = ({filter, setFilter}) => {
    return(
        <div className='table-search' >
            Search : {' '}
        <input 
            value={filter || ''} 
            onChange={(e) => setFilter(e.target.value)} 
          />               
        </div>
    )
}
export default GlobalFilter