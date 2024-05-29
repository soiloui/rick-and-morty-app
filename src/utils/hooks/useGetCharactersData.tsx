import axios from "axios";
import { CharacterAPIResponse } from "../../types/RickAndMortyAPI";
import { RICK_AND_MORTY_CHARACTERS_API_URL } from "../constants";
import { useInfiniteQuery } from "@tanstack/react-query";

interface PageParams {
  pageParam: number;
}

const useGetCharactersData = () => {
  const fetchCharactersData = async ({
    pageParam,
  }: PageParams): Promise<CharacterAPIResponse> => {
    const res = await axios.get(
      RICK_AND_MORTY_CHARACTERS_API_URL + `/?page=${pageParam}`
    );
    return res.data;
  };

  return useInfiniteQuery({
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
};

export default useGetCharactersData;
