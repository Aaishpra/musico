import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

export default function Info(props) {
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo() {
    return (
 <Grid container spacing={1}>    
   <Grid item xs={12} align="center">
        <Typography component="h6" variant="h6">
          Join Page
        </Typography>
        <p>You can join Houseparty created by your friend entering the room code.</p>
      </Grid>
   
   </Grid> 
   );
  }

  function createInfo() {
    return (
        <Grid container spacing={1}>    
          <Grid item xs={12} align="center">
               <Typography component="h6" variant="h6">
                 Create Page
               </Typography>
               <p>You can create Houseparty for yourself and your friends just ask them to join the room using your codes and enjoy.</p>
             </Grid>
          
          </Grid> 
          );
  }

  useEffect(() => {
    console.log("ran");
    return () => console.log("cleanup");
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          How to use musico's House Party?
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
            <NavigateBeforeIcon />
          ) : (
            <NavigateNextIcon />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}