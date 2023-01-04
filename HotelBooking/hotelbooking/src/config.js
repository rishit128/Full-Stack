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
    valueGetter: (params) => {
      console.log(params);
      const cheapprice = params?.row?.rooms?.reduce(function (prev, curr) {
        return prev.price < curr.price ? prev : curr;
      }, 0);
      return cheapprice.price;
    },
  },
  {
    field: "rooms.",
    headerName: "Room Number's",
    width: 200,
    valueGetter: (params) => {
      const allroomnumbers = params?.row?.rooms?.map((e) =>
        e.roomno.map((e) => e.number)
      );
      return allroomnumbers;
    },
  },
];
