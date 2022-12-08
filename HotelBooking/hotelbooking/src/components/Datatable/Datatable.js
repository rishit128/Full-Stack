import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
const DataTable = ({ columns, data }) => {
  const [alldata, setAllData] = useState("");

  useEffect(() => {
    var regex = /(<([^>]+)>)/gi;
    for (var i = 0; i < data.length; i++) {
      data[i].description = data[i].description.replace(regex, "");
    }

    console.log(data);
    setAllData(data);
  }, [data]);
  return (
    <div className="datatable">
      <DataGrid className="datagrid" rows={alldata} columns={columns} />
    </div>
  );
};
export default DataTable;
