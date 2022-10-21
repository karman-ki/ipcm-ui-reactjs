import { useState } from "react";



const TableHeadSearch = ({ columns, handleSearch }) => {

    const handleSearchChange = (input, accessor) => {
        if (handleSearch) {
            const searchQuery = input.value.toLowerCase();
            handleSearch(searchQuery, accessor);
        }
    };

    return (
        <thead>
            <tr>
                {columns.map(({ label, accessor, searchable }) => {
                    if (searchable) {
                        return (
                            <th key={accessor}>
                                <input className="input input-border text-field" type="text" id="search-field" onChange={(event) => handleSearchChange(event.target, accessor)} placeholder={label} title="Type in a name"></input>
                            </th>
                        );
                    } else if (accessor == "processing_status") {
                        return (<th key={accessor}>
                            <div className="process">
                                <div className="process-labels">
                                    <div className="label">Inclusion</div>
                                    <div className="label">Pathology</div>
                                    <div className="label">Biobank</div>
                                    <div className="label">Sequencing</div>
                                    <div className="label">Data delivered</div>
                                    <div className="label">Analysis</div>
                                    <div className="label">Curation</div>
                                    <div className="label">Report</div>
                                </div>
                            </div>
                        </th>);
                    } else {
                        return (<th key={accessor}></th>);
                    }
                })}
            </tr>
        </thead >
    );
};

export default TableHeadSearch;
