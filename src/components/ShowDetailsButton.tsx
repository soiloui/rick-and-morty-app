import { Visibility } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useCharacterContext } from "./CharacterProvider";
import { Character } from "../types/RickAndMortyAPI";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import useGetCharactersDetails from "../utils/hooks/useGetCharactersDetails";

interface Props {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}

const ShowDetailsButton = ({ params }: Props) => {
  const { setOpen, setCurrentCharacter, setCurrentLocation, setCurrentOrigin } =
    useCharacterContext();
  const { refetchLocationData, refetchOriginData } = useGetCharactersDetails();

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
