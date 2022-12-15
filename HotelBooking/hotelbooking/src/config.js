export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250, hide: true },
  {
    field: "hotelname",
    headerName: "Name",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
  {
    field: "address",
    headerName: "Address",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "cheapestPrice",
    headerName: "CheapestPrice",
    width: 200,
  },
  {
    field: "rooms.",
    headerName: "Room Number's",
    width: 200,
    valueGetter: (params) => {
      const allroomnumbers = params?.row?.rooms?.roomno.map((e) => e.number);
      return allroomnumbers;
    },
  },
];
