import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer } from "@hope-ui/solid"
import { Accessor, Component } from "solid-js"

export const ModalConfirm: Component<{
  isOpen: Accessor<boolean>;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}> = (props) => {
  return <Modal
    opened={props.isOpen()}
    onClose={props.onClose}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        {props.title}
      </ModalHeader>
      <ModalBody>
        <p>{props.message}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {
            props.onClose()
          }}
          variant="ghost"
          colorScheme="danger"
        >Cancelar</Button>
        <Spacer />
        <Button
          onClick={() => {
            props.onConfirm()
            props.onClose()
          }}
        >Ok</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
}
