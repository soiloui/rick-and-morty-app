import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useCharacterContext } from "../../components/CharacterProvider";

const useGetCharactersDetails = () => {
  const {
    currentCharacter,
  } = useCharacterContext();
  
  const fetchLocationData = () => {
    if (!currentCharacter) return null;
    return axios
      .get(`${currentCharacter.location.url}`)
      .then((response) => response.data);
  };

  const { refetch: refetchLocationData } = useQuery({
    queryKey: ["location"],
    queryFn: fetchLocationData,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const fetchOriginData = () => {
    if (!currentCharacter) return null;
    return axios.get(`${currentCharacter.origin.url}`).then((response) => response.data);
  };

  const { refetch: refetchOriginData } = useQuery({
    queryKey: ["origin"],
    queryFn: fetchOriginData,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return {
    refetchLocationData,
    refetchOriginData
  }
};

export default useGetCharactersDetails;
