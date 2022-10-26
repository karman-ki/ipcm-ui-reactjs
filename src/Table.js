import TableBody from "./TableBody";
import TableHead from "./TableHead";
import TableHeadSearch from "./TableHeadSearch";
import { SortData } from "./UpdateData";
import { SearchData } from "./UpdateData";

export function PrepareData( tableData, columns, sortField, sortOrder, searchField, searchQuery, currentPage, entriesPerPage ) {

    var data = SortData(tableData, sortField, sortOrder);
    data = SearchData(data, searchField, searchQuery, columns);

    const nPages = Math.ceil(data.length / entriesPerPage)
    const indexOfLastRecord = currentPage * entriesPerPage;
    const indexOfFirstRecord = indexOfLastRecord - entriesPerPage;

    // entries to be displayed on the current page
    data = data.slice(indexOfFirstRecord,
        indexOfLastRecord);

    return [data, nPages];
}

export function InitSort(columns) {
    var initSortField;
    var initSortOrder;
    columns.forEach((col) => {
        if (col.sortbyOrder) {
            initSortField = col.accessor;
            initSortOrder = col.sortbyOrder;
        }
    });
    return [initSortField, initSortOrder];
}

export const Table = ({ tableData, columns, order, sortField, handleSort, handleSearch }) => {
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
