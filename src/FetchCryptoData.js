import axios from "axios";

const IP = "http://localhost:8080"; // şirket
// const IP = 'http://192.168.1.21:8080/HSHub/api/v1'; // ev

export const getBlockchainBTC = async () => {
  const response = await axios.get(IP + "/currencyBlockchainBTC");

  var ask = response.data.asks[0].px;
  var bid = response.data.bids[0].px;

  /*   console.log(
    "Blockchain BTC ask,bid price: " +
      ask +
      " , " +
      bid +
      " " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes()
  ); */
  return [ask.toString(), bid.toString()];
};

export const getBlockchainETH = async () => {
  const response = await axios.get(IP + "/currencyBlockchainETH");

  var ask = response.data.asks[0].px;
  var bid = response.data.bids[0].px;

  /*   console.log(
    "Blockchain ETH ask,bid price: " +
      ask +
      " , " +
      bid +
      " " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes()
  ); */
  return [ask.toString(), bid.toString()];
};

export const getBinanceBTC = async () => {
  const response = await axios.get(IP + "/currencyBinanceBTC");

  var ask = response.data.askPrice;
  var bid = response.data.bidPrice;

  /*   console.log(
    "Binance BTC ask,bid price: " +
      ask +
      " , " +
      bid +
      " " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes()
  ); */
  return [ask.toString(), bid.toString()];
};

export const getBinanceETH = async () => {
  const response = await axios.get(IP + "/currencyBinanceETH");

  var ask = response.data.askPrice;
  var bid = response.data.bidPrice;

  /*   console.log(
    "Binance ETH ask,bid price: " +
      ask +
      " , " +
      bid +
      " " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes()
  ); */
  return [ask.toString(), bid.toString()];
};
