import Timeline from "./Timeline.js";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";



const TableBody = ({ columns, tableData }) => {
    return (
        <tbody>
            {tableData.map((data) => {
                return (
                    <tr key={data.study_id}>
                        {columns.map(({ accessor }) => {
                            const tData = data[accessor] ? data[accessor] : "——";
                            if (accessor == "processing_status") return <td key={accessor}>{<Timeline step={tData} />}</td>;
                            else if (accessor == "action") {
                                return (
                                    <td className="td-action">
                                        <button className='input-border action-buttons info-button'><IoMdInformationCircleOutline/></button>
                                        <button className='input-border action-buttons edit-button'><BiEdit/></button>
                                        <button className='input-border action-buttons pending-button' >Pending</button>
                                    </td>
                                )
                            } else if (accessor == "action_cur") {
                                return (
                                    <td className="td-action">
                                        <button className='input-border action-buttons approved-button'><BsFillCheckCircleFill className="button-icon"/>Curation</button>
                                    </td>
                                )
                            }
                            else return <td key={accessor}>{tData}</td>;
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;
