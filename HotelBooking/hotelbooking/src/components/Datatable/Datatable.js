import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
const DataTable = ({ columns, data }) => {
  const [alldata, setAllData] = useState("");
  useEffect(() => {
    console.log(data);
    setAllData(data);
  }, [data]);
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={alldata}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};
export default DataTable;
