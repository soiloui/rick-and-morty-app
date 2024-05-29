import { DataGrid } from "@mui/x-data-grid";
import useCharacterColumns from "../utils/hooks/useCharacterColumns";
import { Character } from "../types/RickAndMortyAPI";
import { toast } from "react-toastify";
import { Box, Button, Skeleton } from "@mui/material";
import useGetCharactersData from "../utils/hooks/useGetCharactersData";

const CharacterTable = () => {
  const { isPending, data, isError, error, refetch, fetchNextPage } = useGetCharactersData();
  const { columns } = useCharacterColumns();

  const handleReload = () => {
    refetch();
  };

  const handleGridLazyLoading = (gridState: any) => {
    const rowsCount = gridState.rows.totalRowCount;
    const currPage = gridState.pagination.paginationModel.page + 1;
    const pageSize = gridState.pagination.paginationModel.pageSize;
    const visibleRows = currPage * pageSize;

    if (visibleRows + pageSize > rowsCount) {
      fetchNextPage();
    }
  };

  const MIN_TABLE_HEIGHT = 300;
  const TABLE_HEIGHT = "50vh";

  if (isPending)
    return (
      <Skeleton
        variant="rounded"
        width="100%"
        height={TABLE_HEIGHT}
        sx={{ minHeight: MIN_TABLE_HEIGHT }}
      />
    );

  if (isError) {
    toast.error(error.message, {
      toastId: "dataFetchingError",
    });
    return (
      <>
        <Button variant="contained" onClick={handleReload} sx={{ width: "fit-content" }}>
          Try again
        </Button>
      </>
    );
  }

  const rows: Character[] = [];

  data.pages.forEach((page) => {
    page.results.forEach((result) => {
      rows.push({ ...result });
    });
  });

  return (
    <>
      <Box sx={{ minHeight: MIN_TABLE_HEIGHT, height: TABLE_HEIGHT, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          rowSelection={false}
          onStateChange={handleGridLazyLoading}
        />
      </Box>
    </>
  );
};

export default CharacterTable;
