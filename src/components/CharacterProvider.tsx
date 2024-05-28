import { createContext, ReactNode, useContext, useState } from "react";
import { Character, LocationDetails } from "../types/RickAndMortyAPI";

interface CharacterContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  currentCharacter: Character | null;
  setCurrentCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
  currentLocation: LocationDetails | null;
  setCurrentLocation: React.Dispatch<React.SetStateAction<LocationDetails | null>>;
  currentOrigin: LocationDetails | null;
  setCurrentOrigin: React.Dispatch<React.SetStateAction<LocationDetails | null>>;
}

const CharacterContext = createContext<CharacterContextType>({} as CharacterContextType);
const useCharacterContext = () => useContext(CharacterContext);

const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationDetails | null>(null);
  const [currentOrigin, setCurrentOrigin] = useState<LocationDetails | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CharacterContext.Provider
      value={{
        open,
        setOpen,
        handleOpen,
        handleClose,
        currentCharacter,
        setCurrentCharacter,
        currentLocation,
        setCurrentLocation,
        currentOrigin,
        setCurrentOrigin,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export { CharacterProvider, CharacterContext, useCharacterContext };
