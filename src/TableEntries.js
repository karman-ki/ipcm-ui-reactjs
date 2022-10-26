const TableEntries = ({tableData, defaultEntriesPerPage, setEntriesPerPage}) => {

    const changeEntriesPerPage = (value) => {
        setEntriesPerPage(Math.min(value, tableData.length));
    }

    return (
        <div>
            Number of table entries:
            <select className='input input-border select entries-picker'
                defaultValue={defaultEntriesPerPage}
                onChange={(event) => changeEntriesPerPage(event.target.value)}
            >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>

            </select>
        </div>
    );
}

export default TableEntries;
