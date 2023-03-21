import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const DataTable = ({ columns, data }) => {
  const [alldata, setAllData] = useState([]);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    setAllData(data);
  }, [data]);
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={alldata}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        disableColumnMenu={true}
        // getRowHeight={() => "auto"}
      />
    </div>
  );
};
export default DataTable;
