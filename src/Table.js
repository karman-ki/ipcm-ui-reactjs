import TableBody from "./TableBody";
import TableHead from "./TableHead";
import TableHeadSearch from "./TableHeadSearch";

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

const Table = ({ tableData, columns, order, sortField, handleSort, handleSearch }) => {
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