import "./App.css";
import React, { useState, useEffect } from "react";
import {
  getBlockchainBTC,
  getBlockchainETH,
  getBinanceBTC,
  getBinanceETH,
} from "./FetchCryptoData";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// setRow a template bir tablo ekle.

function createData(name, ask, bid) {
  return { name, ask, bid };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function App() {
  const [rows, setRows] = useState();
  const [recommendation, setRecommendation] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getBlockchainData();

    const interval = setInterval(() => {
      getBlockchainData();
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getBlockchainData = async () => {
    let empty = [];
    setRows(empty);

    getBlockchainBTC().then((items) => {
      setRows((oldArray) => [
        ...oldArray,
        createData("Blockchain BTC", items[0], items[1]),
      ]);
      console.log(items);
    });
    getBinanceBTC().then((items) => {
      setRows((oldArray) => [
        ...oldArray,
        createData("Binance BTC", items[0], items[1]),
      ]);

      console.log(items);
    });
    getBlockchainETH().then((items) => {
      setRows((oldArray) => [
        ...oldArray,
        createData("Blockchain ETH", items[0], items[1]),
      ]);

      console.log(items);
    });

    getBinanceETH().then((items) => {
      setRows((oldArray) => [
        ...oldArray,
        createData("Binance ETH", items[0], items[1]),
      ]);

      console.log(items);
    });
  };

  const handleClickOpen = () => {
    createRecommendation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createRecommendation = () => {
    let message = "";
    let btc = [];
    let eth = [];

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].name.includes("BTC")) {
        btc.push(rows[i]);
      } else {
        eth.push(rows[i]);
      }
    }

    message = comparePrices(btc);
    message += comparePrices(eth);
    setRecommendation(message);
  };

  const comparePrices = (arr) => {
    let message = "";

    if (parseInt(arr[0].ask) > parseInt(arr[1].ask)) {
      message += "You can buy " + arr[1].name + ", it is cheaper! ";
    } else {
      message += "You can buy " + arr[0].name + ", it is cheaper! ";
    }

    if (parseInt(arr[0].bid) > parseInt(arr[1].bid)) {
      message +=
        "If you have any, you can sell " + arr[0].name + ", it is higher! ";
    } else {
      message +=
        "If you have any, you can sell " + arr[1].name + ", it is higher! ";
    }

    return message;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Cryptocurrency</StyledTableCell>
              <StyledTableCell align="center">Ask (Buy)</StyledTableCell>
              <StyledTableCell align="center">Bid (Sell)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((data) => (
                <StyledTableRow key={data.name}>
                  <StyledTableCell component="th" scope="row">
                    {data.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{data.ask}</StyledTableCell>
                  <StyledTableCell align="center">{data.bid}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          TRY ME !
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Crypto Recommendation Assistant"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {recommendation}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Thanks!</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default App;
