# Haven Protocol VBS calculator

This is a simple app that fetch datas required for the VBS calculation using AXIOS then do the math to return the VBS ratio.



## Deployment

Install dependencies

```bash
  npm i axios
```


## Endpoints

- https://api.coingecko.com/api/v3/simple/price?ids=haven&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true
- https://explorer.havenprotocol.org/api/supply
- https://oracle.havenprotocol.org/



## Response

```bash
node calculations.js
```
 should print


```bash
  Result: { vbsOffshore: 5, vbsOnshore: 10 }
```
> [!NOTE]
> Returned value may slightly differ from the wallet value due to price variations. This may be improved by using average price of different XHV pairs.


## What is VBS

[https://havenprotocol.org/en/knowledge/vbs/](https://havenprotocol.org/en/knowledge/vbs/)

