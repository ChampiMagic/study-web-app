// React imports
import * as React from "react";
// MUI imports
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";

// Css imports
import styles from "./popUpCard.module.css";

export default function PopUpCard({ question }) {
  const [open, setOpen] = React.useState(true);
  return (
    <Modal open={open}>
      <ModalDialog
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <Typography
          component="h2"        
          fontSize="1.25em"
          mb="0.25em"
        >
          La pregunta de hoy es:
        </Typography>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <Typography
            variant="h1"
            component="h2"
            align="center"
            style={{ wordWrap: "break-word" }}
            >
            {/* En esta parte se muestra la pregunta que pasamos por prop */}
            {question}
          </Typography>

          <Input
            aria-label="empty textarea"
            placeholder="Tu respuesta es"
            style={{ minWidth: 300 }}
          />
          <br></br>
          <Button variant="outlined" color="primary" type="submit" >
            Enviar
          </Button>
        </form>
      </ModalDialog>
    </Modal>
  );
}
