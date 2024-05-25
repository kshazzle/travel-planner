import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Paper, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface RecentLocationProps {
  city: string;
  onPress: () => void;
  onDelete: (city: string) => void;
}

const RecentLocation = (props: RecentLocationProps) => {
  return (
    <Box
      border={"3px solid #e5e5e5"}
      marginY={1}
      borderRadius={1.5}
      paddingY={0.25}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Button variant="text" onClick={props.onPress}>
          {props.city}
        </Button>
        <IconButton
          color="info"
          size="large"
          onClick={() => props.onDelete(props.city)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RecentLocation;
