import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import AddCharForm from "./AddCharForm";
import { Char } from "./interface";

interface Props {
  addChar: (newChar: Char) => void;
}

const AddCharButton: FC<Props> = ({ addChar }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [char, setChar] = useState<Char>({
    name: "",
    hp: 0,
    maxHp: 0,
    resistance: false,
    consSave: 0,
  });
  const addNewChar = () => {
    addChar(char);
    onClose();
  };

  const charInvalid =
    !char.name || char.hp <= 0 || char.maxHp <= 0 || char.consSave <= 0;

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add Character
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new Character</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddCharForm
              onNameChange={(name) => setChar({ ...char, name })}
              onHpChange={(hp) => setChar({ ...char, hp })}
              onMaxhpChange={(maxHp) => setChar({ ...char, maxHp })}
              onResistanceChange={(resistance) =>
                setChar({ ...char, resistance })
              }
              onConsSaveChange={(consSave) => setChar({ ...char, consSave })}
              char={char}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={addNewChar}
              disabled={charInvalid}
            >
              Add
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCharButton;
