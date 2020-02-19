import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {ShoppingCartContext} from "../../../context/ShoppingCartContext";
import ResponsiveFontSizes from "../../ResponsiveFontSizes";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Remove';
import Grid from "@material-ui/core/Grid";

export default function SimpleTable(props) {
    const { cart, setCart } = useContext(ShoppingCartContext);


  const useStyles = makeStyles({
    table: {
      // maxWidth: 550
    },
    tableHeader: { fontWeight: "bold", fontSize: 20 },
    tableTitle : {
          textAlign: "center",
          color: "white",
          margin: "50px 0"
      }
  });
  const classes = useStyles();

  const quantityCalculation = courseTitle => {
    switch (courseTitle) {
      case "Advanced":
        return 50;
      case "Beginners":
        return 30;
      case "Pro":
        return 80;
      default:
        return 1;
    }
  };

  const increaseCart = (title) => {
      axios.get(`http://localhost:8080/increase-in-cart/${title}`)
          .then(response => setCart(response.data));
  };

  const decreaseCart = (title) => {
      axios.get(`http://localhost:8080/decrease-in-cart/${title}`)
          .then(response => setCart(response.data))
  };

  const removeFromCart = (title) => {
      axios.get(`http://localhost:8080/remove-from-cart/${title}`)
          .then(response => setCart(response.data))
  };

  return (
    <Grid item>
        <div className={classes.tableTitle}>
            <ResponsiveFontSizes variant={"h3"} text={"Ordered Items: "}/>
        </div>
      <TableContainer
        component={Paper}
        // style={{ maxWidth: 550, margin: "0 auto" }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Course Type</TableCell>
              <TableCell className={classes.tableHeader}>Quantity</TableCell>
              <TableCell className={classes.tableHeader}>Total Price</TableCell>
              <TableCell className={classes.tableHeader}> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Object.keys(cart).map(function(key) {
            return (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell align="center">
                  {cart[key]}
                </TableCell>
                <TableCell align="center">
                  {cart[key] *
                  quantityCalculation(key)} $
                </TableCell>
                <TableCell>
                    <Button onClick={() => decreaseCart(key)} startIcon={<RemoveIcon/>} > </Button>
                    <Button onClick={() => increaseCart(key)} startIcon={<AddCircleOutlineIcon/>}> </Button>
                    <Button onClick={() => removeFromCart(key)}
                            variant="contained"
                            className={classes.button}
                            startIcon={<DeleteIcon />}>Delete</Button>
                </TableCell>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
