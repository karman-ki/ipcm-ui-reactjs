
export function SortData(data, sortField, sortOrder) {
    if (sortField) {
        const sorted = [...data].sort((a, b) => {
            if (a[sortField] === null) return 1;
            if (b[sortField] === null) return -1;
            if (a[sortField] === null && b[sortField] === null) return 0;
            return (
                a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                    numeric: true,
                }) * (sortOrder === "asc" ? 1 : -1)
            );
        });
        return sorted;
    }
    return data;
}

export function SearchData(data, searchField, searchQuery, columns) {
    if (searchField) {
        let result = []
        if (searchField === 'all') {
            for (let i = 0; i < data.length; i++) {
                columns.every(col => {
                    let txtValue = "" + data[i][col['accessor']];
                    if (txtValue.toLowerCase().indexOf(searchQuery) > -1) {
                        result.push(data[i]);
                        return false;
                    }
                    return true;
                })
            }
            return result;
        } else {
            for (let i = 0; i < data.length; i++) {
                let txtValue = "" + data[i][searchField];
                if (txtValue.toLowerCase().indexOf(searchQuery) > -1) {
                    result.push(data[i]);
                }
            }
            return result;
        }
    }
    return data;
}
