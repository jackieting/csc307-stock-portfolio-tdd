function createPortfolio() {
  return [];
}

function isEmpty(sp) {
  if(Array.isArray(sp))
    return sp.length > 0;
  else {
    throw new TypeError('sp is not an array');
  }
}

function countTickers(sp) {
  if(Array.isArray(sp)){
    var closed_list = []; // list of tickers that have already been accounted for
    var ticker_counter = 0;
    for(var i=0; i<sp.length; i++){
      if(closed_list.includes(sp[i]["symbol"]) == false){
        // increase ticker_counter and add ticker symbol to closed_list
        ticker_counter++;
        closed_list.push(sp[i]["symbol"]);
      }
    }
    return ticker_counter;
  } else {
    throw new TypeError('sp is not an array');
  }
}

function makePurchase(sp, sym, num_shares) {
  if(Array.isArray(sp) && typeof(sym) == 'string' && typeof(num_shares) == 'number'){
    if(num_shares > 0){
      for(var i=0; i<sp.length; i++){
        if(sp[i]["symbol"] === sym){
          sp[i]["shares"] += num_shares;
          return sp;
        }
      }
      sp.push({"symbol": sym, "shares": num_shares});
      return sp;
    } else {
      throw new TypeError('num_shares is zero or negative')
    }
  } else {
    throw new TypeError('sp is not an array and/or sym is not a string and/or num_shares is not a number');
  }
}

function makeSale(sp, sym, num_shares) {
  if(Array.isArray(sp) && typeof(sym) == 'string' && typeof(num_shares) == 'number'){
    if(num_shares > 0 ){ // make sure num_shares isn't a negative number
      for(var i=0; i<sp.length; i++){
        if(sp[i]["symbol"] === sym){
          if(sp[i]["shares"] < num_shares){ // num_shares is larger than what is in portfolio
            throw new ShareSaleException('num_shares is too larger. ' + sp[i]["symbol"] + ' only has ' + sp[i]["shares"] + ' shares');
          } else {
            sp[i]["shares"] -= num_shares;
            if(sp[i]["shares"] == 0){
              sp.splice(i, 1);  // removes symbol from sp
            }
            return sp;
          }
        }
      }
      throw new Error('sp does not contain sym');
    } else {
      throw new TypeError('num_shares is zero or negative')
    }
  } else {
    throw new TypeError('sp is not an array and/or sym is not a string and/or num_shares is not a number');
  }
}

function getShares(sp, sym) {
  if(Array.isArray(sp) && typeof(sym) == 'string'){
    for(var i=0; i<sp.length; i++){
      if(sp[i]["symbol"] === sym){
        return sp[i]["shares"];
      }
    }
    throw new Error ('sym does not exist in sp');
  }
  else {
    throw new TypeError('sp is not an array and/or sym is not a string');
  }
}

function ShareSaleException(message) {
  const error = new Error(message);
  return error;
}


exports.createPortfolio = createPortfolio;
exports.isEmpty = isEmpty;
exports.countTickers = countTickers;
exports.makePurchase = makePurchase;
exports.makeSale = makeSale;
exports.getShares = getShares;