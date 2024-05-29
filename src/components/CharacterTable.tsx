import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import useCharacterColumns from "../utils/hooks/useCharacterColumns";
import { Character, CharacterAPIResponse } from "../types/RickAndMortyAPI";
import { RICK_AND_MORTY_CHARACTERS_API_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { Box, Button, Skeleton } from "@mui/material";

interface PageParams {
  pageParam: number;
}

const CharacterTable = () => {
  const fetchCharactersData = async ({
    pageParam,
  }: PageParams): Promise<CharacterAPIResponse> => {
    const res = await axios.get(
      RICK_AND_MORTY_CHARACTERS_API_URL + `/?page=${pageParam}`
    );
    return res.data;
  };

  const { isPending, data, isError, error, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: ["characterData"],
    queryFn: fetchCharactersData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (lastPage.info.pages - 1 < lastPageParam) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });

  const handleReload = () => {
    refetch();
  };

  const MIN_TABLE_HEIGHT = 300;
  const TABLE_HEIGHT = "50vh";
  const { columns } = useCharacterColumns();

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

  const handleGridLazyLoading = (gridState: any) => {
    const rowsCount = gridState.rows.totalRowCount;
    const currPage = gridState.pagination.paginationModel.page + 1;
    const pageSize = gridState.pagination.paginationModel.pageSize;
    const visibleRows = currPage * pageSize;

    if (visibleRows + pageSize > rowsCount) {
      fetchNextPage();
    }
  };

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
