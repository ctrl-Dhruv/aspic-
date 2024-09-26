import React, { useState, useEffect } from "react";
import homePageFuncs from "./Home";
import { Paper } from "@mui/material";
import { TextField, Typography, Button } from "@mui/material";

const PlaceholderList = () => {
  const [placeholder, setplaceholder] = useState([]);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("/placeholder");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setplaceholder(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return placeholder.map((placeholder, index) => (
    <Paper
      key={placeholder.placeholder_id}
      sx={{
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer",
        backgroundColor: "#EBF4F6",
      }}
    >
      <Typography variant="h5">{placeholder.app_placeholder_id}</Typography>
    </Paper>
  ));
};

export default PlaceholderList;
