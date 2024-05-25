import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Paper, Box } from "@mui/material";

interface ListDetailsProps {
  place: string;
  description: string;
}

const ListDetails = (props: ListDetailsProps) => {
  const [showDescription, setShowDescription] = useState(false);
  const handleButtonClick = () => {
    setShowDescription(!showDescription);
  };
  return (
    <Box
      border={"3px solid #e5e5e5"}
      borderRadius={1.5}
      marginY={1}
      paddingY={0.25}
      paddingX={1}
      display={"flex"}
      flexDirection={"column"}
      width={"70%"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typography variant="h5">{props.place}</Typography>
        <Button variant="text" color="primary" onClick={handleButtonClick}>
          {!showDescription ? "View Description" : "Hide Description"}
        </Button>
      </Box>
      {showDescription && (
        <Typography variant="body1">{props.description}</Typography>
      )}
    </Box>
  );
};

export default ListDetails;
