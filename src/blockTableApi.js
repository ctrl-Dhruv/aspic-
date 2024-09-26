import React, { useState, useEffect } from "react";
import homePageFuncs from "./Home";
import { Paper } from "@mui/material";
import { TextField, Typography, Button } from "@mui/material";

const BlockList = () => {
  const [block, setblock] = useState([]);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("/block");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setblock(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return block.map((block, index) => (
    <Paper
      key={block.block_id}
      sx={{
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer",
        backgroundColor: "#EBF4F6",
      }}
    >
      <Typography variant="h5">{block.block_name}</Typography>
    </Paper>
  ));
};

export default BlockList;
