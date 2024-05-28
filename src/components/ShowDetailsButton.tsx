import { Visibility } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useCharacterContext } from "./CharacterProvider";
import { Character } from "../types/RickAndMortyAPI";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";

interface Props {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}

const ShowDetailsButton = ({ params }: Props) => {
  const {
    setOpen,
    currentCharacter,
    setCurrentCharacter,
    setCurrentLocation,
    setCurrentOrigin,
  } = useCharacterContext();

  const handleShowDetails = (character: Character) => {
    setCurrentCharacter(character);
    setOpen(true);
    setCurrentLocation(null);
    setCurrentOrigin(null);
    setTimeout(() => {
      refetchLocationData().then((res) => {
        if (!res.isSuccess) return;
        setCurrentLocation(res?.data);
      });
      refetchOriginData().then((res) => {
        if (!res.isSuccess) return;
        setCurrentOrigin(res?.data);
      });
    }, 0);
  };

  const fetchLocationData = () => {
    console.log(currentCharacter);
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

  return (
    <>
      <Button
        variant="contained"
        endIcon={<Visibility />}
        size="small"
        sx={{ marginLeft: "auto" }}
        onClick={() => handleShowDetails(params.row)}
      >
        Details
      </Button>
    </>
  );
};

export default ShowDetailsButton;
