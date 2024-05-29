import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useCharacterContext } from "./CharacterProvider";
import {
  Avatar,
  Box,
  Chip,
  ChipOwnProps,
  Stack,
  ToggleButton,
  useTheme,
} from "@mui/material";
import BootstrapDialog from "./BootstrapDialog";
import { useEffect, useState } from "react";
import useCharacterDetailsOpenAnimation from "../utils/hooks/useCharacterDetailsOpenAnimation";

const CharacterDetails = () => {
  const theme = useTheme();
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
  const [isOriginExpanded, setIsOriginExpanded] = useState(false);
  const { open, setOpen, handleClose, currentCharacter, currentLocation, currentOrigin } =
    useCharacterContext();
  useCharacterDetailsOpenAnimation();

  useEffect(() => {
    if (!open) {
      setIsLocationExpanded(false);
      setIsOriginExpanded(false);
    }
  }, [open]);

  if (!currentCharacter) {
    setOpen(false);
    return <></>;
  }

  const { id, name, gender, image, species, status, type, location } = currentCharacter;
  const { type: locationType, dimension: locationDimension } = currentLocation || {};
  const {
    type: originType,
    name: originName,
    dimension: originDimension,
  } = currentOrigin || {};

  let statusColor: ChipOwnProps["color"] = "warning";
  if (status === "Alive") statusColor = "success";
  if (status === "Dead") statusColor = "error";
  const statusColorCode = theme.palette[statusColor];

  return (
    <>
      <BootstrapDialog
        className="character-details"
        onClose={handleClose}
        open={open}
        sx={{ width: "100%" }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} textAlign="center">
          {name}
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          {image && (
            <Box
              className="character-presentation"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: theme.palette.primary.light,
                padding: 1,
              }}
            >
              <>
                <Avatar
                  src={image}
                  alt={name}
                  sx={{
                    width: 120,
                    height: 120,
                    boxShadow: `0px 0px 0px 5px ${statusColorCode.main}`,
                  }}
                />
                <Chip
                  label={status}
                  color={statusColor}
                  sx={{ zIndex: 1, marginTop: -2 }}
                />
              </>
            </Box>
          )}
          <Box
            className="character-info"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 3,
            }}
          >
            {id && (
              <Typography gutterBottom>
                <span className="bold">ID:</span> {id}
              </Typography>
            )}
            {type && (
              <Typography gutterBottom>
                <span className="bold">Type:</span> {type}
              </Typography>
            )}
            {species && (
              <Typography gutterBottom>
                <span className="bold">Species:</span> {species}
              </Typography>
            )}
            {gender && (
              <Typography gutterBottom>
                <span className="bold">Gender:</span> {gender}
              </Typography>
            )}
            {currentLocation?.id && (
              <>
                <Stack direction={"row"} alignItems={"baseline"} gap={1}>
                  <Typography gutterBottom>
                    <span className="bold">Location: </span>{" "}
                  </Typography>
                  <ToggleButton
                    sx={{
                      p: 0,
                      px: 1,
                      border: "unset",
                      color: theme.palette.primary.main,
                    }}
                    value="check"
                    selected={isLocationExpanded}
                    onChange={() => {
                      setIsLocationExpanded(!isLocationExpanded);
                    }}
                  >
                    {location.name}
                  </ToggleButton>
                </Stack>

                <Box
                  sx={{
                    maxHeight: isLocationExpanded ? 1000 : 0,
                    transition: isLocationExpanded
                      ? "max-height 0.3s ease-in"
                      : "max-height 0.15s ease-out",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  {locationType && (
                    <Typography gutterBottom>
                      <span className="bold">Type:</span> {locationType}
                    </Typography>
                  )}
                  {locationDimension && (
                    <Typography gutterBottom>
                      <span className="bold">Dimension:</span> {locationDimension}
                    </Typography>
                  )}
                </Box>
              </>
            )}
            {currentOrigin?.id && (
              <>
                <Stack direction={"row"} alignItems={"baseline"} gap={1}>
                  <Typography gutterBottom>
                    <span className="bold">Origin: </span>{" "}
                  </Typography>
                  <ToggleButton
                    sx={{
                      p: 0,
                      px: 1,
                      border: "unset",
                      color: theme.palette.primary.main,
                    }}
                    value="check"
                    selected={isOriginExpanded}
                    onChange={() => {
                      setIsOriginExpanded(!isOriginExpanded);
                    }}
                  >
                    {originName}
                  </ToggleButton>
                </Stack>

                <Box
                  sx={{
                    maxHeight: isOriginExpanded ? 1000 : 0,
                    transition: isOriginExpanded
                      ? "max-height 0.3s ease-in"
                      : "max-height 0.15s ease-out",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  {originType && (
                    <Typography gutterBottom>
                      <span className="bold">Type:</span> {originType}
                    </Typography>
                  )}
                  {originDimension && (
                    <Typography gutterBottom>
                      <span className="bold">Dimension:</span> {originDimension}
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default CharacterDetails;
