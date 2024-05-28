import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useCharacterColumns from "../utils/hooks/useCharacterColumns";
import { CharacterAPIResponse } from "../types/RickAndMortyAPI";
import { RICK_AND_MORTY_CHARACTERS_API_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { Button, Skeleton } from "@mui/material";

const CharacterTable = () => {
  const fetchCharactersData = (): Promise<CharacterAPIResponse> =>
    axios.get(RICK_AND_MORTY_CHARACTERS_API_URL).then((response) => response.data);

  const { isPending, data, isError, error, refetch } = useQuery({
    queryKey: ["characterData"],
    queryFn: fetchCharactersData,
  });

  const handleReload = () => {
    refetch();
  };

  const MIN_TABLE_HEIGHT = 300;
  const TABLE_HEIGHT = "50vh";
  const { columns } = useCharacterColumns();

  if (isPending)
    return (
      <>
        <Skeleton variant="rounded" width="100%" height={TABLE_HEIGHT} />;
      </>
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

  const rows = data.results.map((result) => {
    return { ...result };
  });

  return (
    <>
      <div style={{ minHeight: MIN_TABLE_HEIGHT, height: TABLE_HEIGHT, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          rowSelection={false}
        />
      </div>
    </>
  );
};

export default CharacterTable;
