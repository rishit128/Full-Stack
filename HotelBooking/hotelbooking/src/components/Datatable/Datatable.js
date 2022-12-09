import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
const DataTable = ({ columns, data }) => {
  const [alldata, setAllData] = useState([]);

  useEffect(() => {
    var regex = /(<([^>]+)>)/gi;
    var newdata = data.map((d) => {
      let description = d.description.replace(regex, "");
      return { ...d, description };
    });

    setAllData(newdata);
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
        // getRowHeight={() => "auto"}
      />
    </div>
  );
};
export default DataTable;
