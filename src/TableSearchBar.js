
const TableSearchBar = ({ setSearchQuery, setSearchField }) => {

    function handleSearchAll(input) {
        setSearchQuery(input.value);
        setSearchField('all');
    }
    
    return (
        <div className='table-search'>
            Search:
            <input className="input input-border text-field table-searchfield"
                type="text"
                id="search-field"
                title="Type in a name"
                onChange={(event) => handleSearchAll(event.target)}>
            </input>
        </div>
    );
}

export default TableSearchBar;
