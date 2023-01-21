import React, { useState } from "react";
// import styles from "./questionCard.module.css";
import { Card, CardContent, Typography, Button } from "@mui/material";

import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";

export default function QuestionCard({ id, answer, question }) {
  const [flip, setFlip] = useState(false);
  const handleClick = () => {
    setFlip(!flip);
  };

  return (
    <>
      <Card className="frontal" sx={{ maxWidth: 375, border: 1, p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="p">
            {flip ? question : answer}?
          </Typography>
        </CardContent>
        <Button
          onClick={handleClick}
          size="small"
          variant="contained"
          endIcon={<ThreeSixtyIcon />}
        >
          Ver respuesta
        </Button>
      </Card>
    </>
  );
}
