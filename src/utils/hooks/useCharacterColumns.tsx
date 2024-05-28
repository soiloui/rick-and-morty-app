import { Avatar, Chip, ChipOwnProps } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import ShowDetailsButton from "../../components/ShowDetailsButton";

const useCharacterColumns = () => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      sortable: true,
      width: 70,
    },
    {
      field: "image",
      headerName: "Image",
      sortable: false,
      renderCell: (params) => (
        <>
          <Avatar src={params.value} alt={params.row.name} />
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      width: 130,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      width: 110,
      renderCell: (params) => {
        let statusColor: ChipOwnProps["color"] = "warning";
        if (params.value === "Alive") statusColor = "success";
        if (params.value === "Dead") statusColor = "error";

        return (
          <>
            <Chip label={params.value} color={statusColor} />
          </>
        );
      },
    },
    {
      field: "species",
      headerName: "Species",
      sortable: true,
      width: 100,
    },
    {
      field: "details",
      headerName: "",
      sortable: false,
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        return <ShowDetailsButton params={params} />;
      },
    },
  ];

  return { columns };
};

export default useCharacterColumns;
