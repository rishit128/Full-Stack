import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
const dataTable = ({ columns, data }) => {
  const [data, setData] = useState();
  useEffect(() => {
    setData(data);
  }, [data]);
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};
export default dataTable;
