import Timeline from "./Timeline.js";




const TableBody = ({ tableData, columns }) => {
    return (
     <tbody>
      {tableData.map((data) => {
       return (
        <tr key={data.study_id}>
         {columns.map(({ accessor }) => {
          const tData = data[accessor] ? data[accessor] : "——";
          if(accessor == "processing_status") return <td key={accessor}>{<Timeline step={tData}/>}</td>;
          else return <td key={accessor}>{tData}</td>;
         })}
        </tr>
       );
      })}
     </tbody>
    );
   };

   export default TableBody;
