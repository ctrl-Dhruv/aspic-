import React, { useState, useEffect } from "react";
import Placeholderimg from "./Placeholderimg";
import { Avatar, createTheme } from "@mui/material";
import {
  FormControl,
  FormControlLabel,
  Container,
  Card,
  styled,
  ThemeProvider,
} from "@mui/material";
import { TextField, Typography, Button } from "@mui/material";
import { Radio, RadioGroup } from "@mui/material";
import { FormLabel } from "@mui/material";
import { Box } from "@mui/material";
import { Dropdown, MenuButton, MenuItem, Menu } from "@mui/joy";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Pages } from "@mui/icons-material";
import ModuleList from "./moduleTableApi";
import PlaceholderList from "./placeholderTableApi";
import BlockList from "./blockTableApi";
import { insertIntoModule } from "./inserIntoTableApi";
import { green, purple, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function Home() {
  var [menuHeading, setMenuHeading] = useState("Select a Page...");
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [boxes, setBoxes] = useState([1]);
  const [pages, setPages] = useState([]);
  const [pageName, setPageName] = useState("");
  const [openPageDialog, setOpenPageDialog] = useState();
  const [selectedPage, setSelectedPage] = useState();
  const [blocks, setBlocks] = useState([]);
  const [blockName, setBlockName] = useState("");
  const [openBlockDialog, setOpenBlockDialog] = useState();
  const [selectedBlock, setSelectedBlock] = useState();
  const [placeHolders, setPlaceHoledrs] = useState([]);
  const [placeHolderName, setPlaceHolderName] = useState("");
  const [openPlaceHolderDialog, setOpenPlaceHolderDialog] = useState();
  const [selectedPlaceHolder, setSelectedPlaceHolder] = useState();
  var pageInitialColor = "#EBF4F6";
  const [pagesUIListValues, setPagesUIListValues] = useState([]);
  

  const navigate = useNavigate();

  // useEffect(() => {
  //   const loggingOutUser = sessionStorage.clear();
  //   if (loggingOutUser) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const handleLogout = () => {
    // console.log("Logged out");
    // sessionStorage.clear();
    sessionStorage.setItem("username", "");
    navigate("/login");
    // const loggedInUser = sessionStorage.getItem("username");
    // console.log("loggedinuser",loggedInUser);
  };

  const ResponsiveText = styled(Typography)(({ theme }) => ({
    fontSize: "4rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.5rem",
    },
  }));

  const Responsivebttn = styled(Button)(({ theme }) => ({
    fontSize: "1rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.25rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.125rem",
    },
  }));

  const ResponsiveContainer = styled(Container)(({ theme }) => ({
    size: "4rem",
    [theme.breakpoints.down("md")]: {
      size: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      size: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      size: "0.5rem",
    },
  }));
  const addPage = async () => {
    await insertIntoModule();
    console.log("Calling inser API");
    // setPages([...pages, pageName]);
    // setPageName("");
    // pagesUIListValues.push(false);
    setOpenPageDialog(false);
  };

  function resetButtonUIValues(data) {
    for (var i = 0; i < data.length; i++) {
      data[i] = false;
    }
  }

  function onPageSelectFunc(page, index) {
    setSelectedPage(page);
    if (setPagesUIListValues[index] == false) {
      resetButtonUIValues(setPagesUIListValues);
      setPagesUIListValues[index] = true;
    }
    console.log("pageName", page);
    console.log("pageIndex", index);
  }

  const deletePage = (page) => {
    setPages(pages.filter((p) => p !== page));
    if (selectedPage === page) setSelectedPage(null);
  };

  const editPage = (oldName, newName) => {
    setPages(pages.map((p) => (p === oldName ? newName : p)));
    if (selectedPage === oldName) setSelectedPage(newName);
  };

  const addBlock = () => {
    setBlocks([...blocks, blockName]);
    setBlockName("");
    setOpenBlockDialog(false);
  };

  const deleteBlock = (block) => {
    setBlocks(blocks.filter((b) => b !== block));
    if (selectedBlock === block) setSelectedBlock(null);
  };

  const editBlock = (oldName, newName) => {
    setBlocks(blocks.map((b) => (b === oldName ? newName : b)));
    if (selectedBlock === oldName) setSelectedBlock(newName);
  };

  const addPlaceHolder = () => {
    setPlaceHoledrs([...placeHolders, placeHolderName]);
    setPlaceHolderName("");
    setOpenPlaceHolderDialog(false);
  };

  const deletePlaceHolder = (placeHolder) => {
    setPlaceHoledrs(placeHolders.filter((h) => h !== placeHolder));
    if (selectedPlaceHolder === placeHolder) setSelectedPlaceHolder(null);
  };

  const editPlaceHolder = (oldName, newName) => {
    setPlaceHoledrs(placeHolders.map((h) => (h === oldName ? newName : h)));
    if (selectedPlaceHolder === oldName) setSelectedPlaceHolder(newName);
  };

  function handleChange(e) {
    console.log(e.target.value);
    // setFile(URL.createObjectURL(e.target.files[0]));
  }

  var [currentComponent, setCurrentComponent] = useState(<Container />);
  var imageComponent = (
    <div className="App">
      <h2>Add Image:</h2>
      <input type="file" onChange={handleChange} />
      <img src={file} />
    </div>
  );
  var textComponent = (
    <div className="App">
      <h2>Add Text:</h2>
      <input type="text" onChange={handleChange} />
    </div>
  );

  const addBox = () => {
    setBoxes([...boxes, boxes.length]);
    console.log("boxes", boxes);
  };
  const newPages = () => {
    if (!ModuleList) {
      return pages.map((page, index) => (
        <Paper
          key={index}
          sx={{
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer",
            backgroundColor: setPagesUIListValues[index]
              ? "#3DC2EC"
              : pageInitialColor,
          }}
          onClick={() => onPageSelectFunc(page, index)}
        >
          <Typography variant="h5">{page}</Typography>
        </Paper>
      ));
    } else {
      return <ModuleList />;
    }
    // return <ModuleList/>;
  };

  const newPlaceHolders = () => {
    if (!PlaceholderList) {
      return blocks.map((placeHolder, index) => (
        <Paper
          key={index}
          sx={{
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#FFF6E9",
              color: "#3c52b2",
            },
          }}
          onClick={() => setSelectedPlaceHolder(placeHolder)}
        >
          <Typography variant="h5">{placeHolder}</Typography>
        </Paper>
      ));
    } else {
      return <PlaceholderList />;
    }
    // return <PlaceholderList/>;
  };

  const newBlocks = () => {
    if (!BlockList) {
      return placeHolders.map((block, index) => (
        <Paper
          key={index}
          sx={{
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#FFF6E9",
              color: "#3c52b2",
            },
          }}
          onClick={() => setSelectedBlock(block)}
        >
          <Typography variant="h5">{block}</Typography>
        </Paper>
      ));
    } else {
      return <BlockList />;
    }
  };

  return (
    <div className="content" style={{ overflowX: "hidden", overflowY: "auto" }}>
      <Grid container style={{ height: "auto", width: "100vw" }} spacing={1}>
        <Grid
          className="1"
          item
          xs={12}
          md={6}
          lg={4}
          style={{ height: "100%" }}
        >
          <Paper style={{ height: "auto", minHeight: "36.25rem" }}>
            <Container className="heading">
              <ResponsiveText variant="h1" align="center">
                Pages
              </ResponsiveText>{" "}
              <br />
              <Container
                sx={{ height: "390px", overflowX: "hidden", overflowY: "auto" }}
              >
                <Container>{newPages()}</Container>
              </Container>
              <Container
                sx={{
                  margin: "10px 0 auto 0",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Responsivebttn
                  sx={{ backgroundColor: "#FFD18E", borderRadius: "30px" }}
                  type="submit"
                  color="primary"
                  variant="outlined"
                  size="large"
                  onClick={() => setOpenPageDialog(true)}
                >
                  Add Page
                </Responsivebttn>
                <Dialog
                  open={openPageDialog}
                  onClose={async () => {
                    setOpenPageDialog(false);
                  }}
                  PaperProps={{ style: { width: "50vh", height: "30vh" } }}
                >
                  <DialogTitle id="dialog-title">Add New Page</DialogTitle>

                  <DialogContent>
                    <DialogContentText id="dialog-description">
                      Click on textfield to add page
                      <TextField
                        inputProps={{ style: { marginTop: "10px" } }}
                        size="normal"
                        label="Page Name"
                        variant="filled"
                        fullWidth
                        value={pageName}
                        onChange={(e) => setPageName(e.target.value)}
                      />
                    </DialogContentText>
                  </DialogContent>

                  <Container
                    sx={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <DialogActions>
                      <Button onClick={() => setOpenPageDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={addPage}>OK</Button>
                    </DialogActions>
                  </Container>
                </Dialog>
                <Responsivebttn
                  sx={{ borderRadius: "30px" }}
                  type="submit"
                  color="error"
                  variant="outlined"
                  size="large"
                  onClick={() => deletePage(selectedPage)}
                >
                  Delete Page
                </Responsivebttn>
                <Responsivebttn
                  sx={{ borderRadius: "30px" }}
                  type="submit"
                  color="secondary"
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    const newName = prompt(
                      "Enter new name for the page:",
                      selectedPage
                    );
                    if (newName) editPage(selectedPage, newName);
                  }}
                >
                  Edit Page
                </Responsivebttn>
              </Container>
            </Container>
          </Paper>
        </Grid>
        <Grid
          className="2"
          item
          xs={12}
          md={6}
          lg={4}
          style={{ height: "100%" }}
        >
          <Paper style={{ height: "auto", minHeight: "36.25rem" }}>
            <ResponsiveText variant="h1" align="center">
              Blocks
            </ResponsiveText>{" "}
            <br />
            <Container
              sx={{ height: "390px", overflowX: "hidden", overflowY: "auto" }}
            >
              <Container>{newBlocks()}</Container>
            </Container>
            <Container
              sx={{
                margin: "10px 0 auto 0",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Responsivebttn
                sx={{ borderRadius: "30px" }}
                type="submit"
                color="primary"
                variant="outlined"
                size="large"
                onClick={() => setOpenBlockDialog(true)}
              >
                Add Block
              </Responsivebttn>
              <Dialog
                open={openBlockDialog}
                onClose={() => setOpenBlockDialog(false)}
              >
                <DialogTitle id="dialog-title">Add New Block</DialogTitle>
                <DialogContent>
                  <DialogContentText id="dialog-description">
                    <TextField
                      label="Block Name"
                      fullWidth
                      value={blockName}
                      onChange={(e) => setBlockName(e.target.value)}
                    />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenBlockDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addBlock}>OK</Button>
                </DialogActions>
              </Dialog>
              <Responsivebttn
                sx={{ borderRadius: "30px" }}
                type="submit"
                color="error"
                variant="outlined"
                size="large"
                onClick={() => deleteBlock(selectedBlock)}
              >
                Delete Block
              </Responsivebttn>
              <Responsivebttn
                sx={{ borderRadius: "30px" }}
                type="submit"
                color="secondary"
                variant="outlined"
                size="large"
                onClick={() => {
                  const newName = prompt(
                    "Enter new name for the block:",
                    selectedBlock
                  );
                  if (newName) editBlock(selectedBlock, newName);
                }}
              >
                Edit Block
              </Responsivebttn>
            </Container>
          </Paper>
        </Grid>
        <Grid
          className="3"
          item
          xs={12}
          md={6}
          lg={4}
          style={{ height: "100%" }}
        >
          <Paper style={{ height: "auto", minHeight: "36.25rem" }}>
            <Container sx={{ display: "flex", justifyContent: "space-around" }}>
              <ResponsiveText variant="h1" align="center">
                Place Holder
              </ResponsiveText>{" "}
              <Box>
                <div style={{display: "flex"}}>
                <Avatar>D</Avatar>
                <Typography variant="h4">Dhruvuser</Typography>
                </div>
                <Button
                  type="submit"
                  variant="outlined"
                  size="small"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </Container>
            <br />
            <Container className="pid-details">
              <Container
                sx={{ height: "390px", overflowX: "hidden", overflowY: "auto" }}
              >
                <Container>{newPlaceHolders()}</Container>
              </Container>
              <Container
                sx={{ margin: "5px 0 auto 0", display: "flex", gap: "20px" }}
              >
                <Responsivebttn
                  sx={{ borderRadius: "30px" }}
                  type="submit"
                  color="primary"
                  variant="outlined"
                  size="large"
                  onClick={() => setOpenPlaceHolderDialog(true)}
                >
                  Add Placeholder
                </Responsivebttn>
                <Dialog
                  open={openPlaceHolderDialog}
                  onClose={() => setOpenPlaceHolderDialog(false)}
                >
                  <DialogTitle id="dialog-title">
                    Add New Place Holder
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="dialog-description">
                      <TextField
                        label="Place Holder Name"
                        fullWidth
                        value={placeHolderName}
                        onChange={(e) => setPlaceHolderName(e.target.value)}
                      />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenPlaceHolderDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addPlaceHolder}>OK</Button>
                  </DialogActions>
                </Dialog>
                <Responsivebttn
                  sx={{ borderRadius: "30px" }}
                  type="submit"
                  color="secondary"
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    const newName = prompt(
                      "Enter new name for the place holder:",
                      selectedPlaceHolder
                    );
                    if (newName) editPlaceHolder(selectedPlaceHolder, newName);
                  }}
                >
                  Edit Placeholder
                </Responsivebttn>
                <Responsivebttn
                  sx={{ borderRadius: "30px" }}
                  type="submit"
                  color="error"
                  variant="outlined"
                  size="large"
                  onClick={() => deletePlaceHolder(selectedPlaceHolder)}
                >
                  Delete Placeholder
                </Responsivebttn>
              </Container>
            </Container>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ height: "auto" }}>
        <Paper style={{ height: "auto" }}>
          <div
            style={{
              height: "31.25rem",
              width: "100vw",
              justifyContent: "center",
              paddingTop: "1.25rem",
            }}
          >
            <ResponsiveText variant="h1" align="center">
              Content
            </ResponsiveText>{" "}
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Placeholderimg />
            </div>
          </div>
        </Paper>
      </Grid>
    </div>
  );
}
