const myFunctions = require("./stock-portfolio.js");

// -------------- create an empty portfolio --------------
test("Testing createPortfolio -- success", () => {
  const result = myFunctions.createPortfolio();
});

// -------------- if portfolio is empty --------------
test("Testing isEmpty", () => {
  const target = false;
  const sp = myFunctions.createPortfolio();
  const empty = myFunctions.isEmpty(sp);
  expect(target).toBe(empty);
});

test("Testing isEmpty", () => {
  const target = true;
  const sp = myFunctions.createPortfolio();
  sp.push({"symbol": "PGE", "shares": 2})
  const empty = myFunctions.isEmpty(sp);
  expect(target).toBe(empty);
});

test("Testing isEmpty (sp isn't an array)", () => {
  expect(() => {
    myFunctions.isEmpty("text");
  }).toThrow('sp is not an array');
});

// -------------- counting unique tickers --------------
test("Testing countTickers", () => {
  const target = 4;
  const sp = myFunctions.createPortfolio();
  sp.push({"symbol": "GME", "shares": 5});
  sp.push({"symbol": "RBLX", "shares": 10});
  sp.push({"symbol": "AMGN", "shares": 3});
  sp.push({"symbol": "GME", "shares": 2});
  sp.push({"symbol": "TSLA", "shares": 1});
  const result = myFunctions.countTickers(sp);
  expect(target).toBe(result);
});

test("Testing isEmpty (sp isn't an array)", () => {
  expect(() => {
    myFunctions.isEmpty("portfolio");
  }).toThrow('sp is not an array');
});

// -------------- making a purchase --------------
test("Testing makePurchase", () => {
  const target = [{"symbol": "PGE", "shares": 2}];
  const sp = myFunctions.createPortfolio();
  const results = myFunctions.makePurchase(sp, "PGE", 2); 
  expect(target).toStrictEqual(results);
});

test("Testing makePurchase", () => {
  const target = [{"symbol": "PGE", "shares": 2},
                  {"symbol": "GME", "shares": 7},
                  {"symbol": "RBLX", "shares": 10}];
  const sp = myFunctions.createPortfolio();
  myFunctions.makePurchase(sp, "PGE", 2);
  myFunctions.makePurchase(sp, "GME", 5);
  myFunctions.makePurchase(sp, "RBLX", 10);
  const results = myFunctions.makePurchase(sp, "GME", 2);
  expect(target).toStrictEqual(results);
});

test("Testing makePurchase (sp isn't an array)", () => {
  expect(() => {
    myFunctions.makePurchase(0, "TICK", 5);
  }).toThrow('sp is not an array and/or sym is not a string and/or num_shares is not a number');
});

test("Testing makePurchase (sym isn't a string)", () => {
  const sp = myFunctions.createPortfolio();
  expect(() => {
    myFunctions.makePurchase(sp, 10, 5);
  }).toThrow('sp is not an array and/or sym is not a string and/or num_shares is not a number');
});

test("Testing makePurchase (num_shares isn't a number)", () => {
  const sp = myFunctions.createPortfolio();
  expect(() => {
    myFunctions.makePurchase(sp, "TICK", "6");
  }).toThrow('sp is not an array and/or sym is not a string and/or num_shares is not a number');
});

test("Testing makePurchase (num_shares is negative)", () => {
  const sp = myFunctions.createPortfolio();
  expect(() => {
    myFunctions.makePurchase(sp, "RBLX", -10);
  }).toThrow('num_shares is zero or negative');
});

// -------------- making a sale --------------
test("Testing makeSale", () => {
  const target = [{"symbol": "PGE", "shares": 2}];
  const sp = myFunctions.createPortfolio();
  myFunctions.makePurchase(sp, "PGE", 7); 
  const results = myFunctions.makeSale(sp, "PGE", 5); 
  expect(target).toStrictEqual(results);
});

test("Testing makeSale", () => {
  const target = [{"symbol": "PGE", "shares": 2},
                  {"symbol": "GME", "shares": 1},
                  {"symbol": "RBLX", "shares": 10}];
  const sp = myFunctions.createPortfolio();
  myFunctions.makePurchase(sp, "PGE", 2);
  myFunctions.makePurchase(sp, "GME", 6);
  myFunctions.makePurchase(sp, "RBLX", 10);
  const results = myFunctions.makeSale(sp, "GME", 5);
  expect(target).toStrictEqual(results);
});

test("Testing makeSale (sp isn't an array)", () => {
  expect(() => {
    myFunctions.makeSale(0, "TICK", 5);
  }).toThrow('sp is not an array and/or sym is not a string and/or num_shares is not a number');
});

test("Testing makeSale (sym isn't a string)", () => {
  const sp = myFunctions.createPortfolio();
  expect(() => {
    myFunctions.makeSale(sp, 10, 5);
  }).toThrow('sp is not an array and/or sym is not a string and/or num_shares is not a number');
});

test("Testing makeSale (num_shares isn't a number)", () => {
  const sp = myFunctions.createPortfolio();
  expect(() => {
    myFunctions.makeSale(sp, "TICK", "6");
  }).toThrow('sp is not an array and/or sym is not a string and/or num_shares is not a number');
});

test("Testing makeSale (trying to sell a negative amount of shares)", () => {
  const sp = myFunctions.createPortfolio();
  myFunctions.makePurchase(sp, "RBLX", 10);
  expect(() => {
    myFunctions.makeSale(sp, "RBLX", -1);
  }).toThrow('num_shares is zero or negative');
});

test("Testing makeSale (trying to sell zero shares)", () => {
  const sp = myFunctions.createPortfolio();
  myFunctions.makePurchase(sp, "RBLX", 10);
  expect(() => {
    myFunctions.makeSale(sp, "RBLX", 0);
  }).toThrow('num_shares is zero or negative');
});

// -------------- get number of shares for a symbol --------------
test("Testing getShares", () => {
  const target = 2;
  const sp = myFunctions.createPortfolio();
  myFunctions.makePurchase(sp, "PGE", 2); 
  const results = myFunctions.getShares(sp, "PGE"); 
  expect(target).toBe(results);
});

test("Testing getShares (sp doesn't have a given symbol)", () => {
  const sp = myFunctions.createPortfolio();
  myFunctions.makePurchase(sp, "PGE", 2); 
  expect(() => {
    myFunctions.getShares(sp, "RBLX");
  }).toThrow('sym does not exist in sp');
});

test("Testing getShares (sp isn't an array)", () => {
  const sp = myFunctions.createPortfolio();
  myFunctions.makePurchase(sp, "PGE", 2); 
  expect(() => {
    myFunctions.getShares("PGE", "PGE");
  }).toThrow('sp is not an array and/or sym is not a string');
});

test("Testing getShares (sym isn't a string)", () => {
  const sp = myFunctions.createPortfolio();
  myFunctions.makePurchase(sp, "PGE", 2); 
  expect(() => {
    myFunctions.getShares(sp, 2);
  }).toThrow('sp is not an array and/or sym is not a string');
});

// -------------- get number of shares for a symbol --------------
test("Testing makeSale (remove symbol is it has zero shares)", () => {
  const target = [{"symbol": "PGE", "shares": 2},
                  {"symbol": "RBLX", "shares": 10}];
  const sp = myFunctions.createPortfolio();
  myFunctions.makePurchase(sp, "PGE", 2);
  myFunctions.makePurchase(sp, "GME", 5);
  myFunctions.makePurchase(sp, "RBLX", 10);
  const results = myFunctions.makeSale(sp, "GME", 5);
  expect(target).toStrictEqual(results);
});

test("Testing makePurchase (num_shares is zero)", () => {
  const sp = myFunctions.createPortfolio();
  expect(() => {
    myFunctions.makePurchase(sp, "RBLX", 0);
  }).toThrow('num_shares is zero or negative');
});

// -------------- selling too many shares --------------
test("Testing makeSale (too many shares)", () => {
  const sp = myFunctions.createPortfolio();
  myFunctions.makePurchase(sp, "RBLX", 10);
  expect(() => {
    myFunctions.makeSale(sp, "RBLX", 11);
  }).toThrow('num_shares is too larger. RBLX only has 10 shares');
});