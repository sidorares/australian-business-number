# abn
validate Australian Business Number. Also validates ACN, ARBN and ARSN

## usage:
```
  npm install australian-business-number
```


```js
var abn = require('australian-business-number');
//...
var abnStatus = abn('53 004 085 615');
console.log(abnStatus);
// logs { valid: false, suggestion: '53004085616' }

note that same rules applies to ACN numbers are 9 digits where ABN is 11. Verification scheme is the same, 2 leading zeros are added before calculations.

```
## See also
  - https://en.wikipedia.org/wiki/Australian_Business_Number
  - http://www.asic.gov.au/for-business/starting-a-company/how-to-start-a-company/australian-company-numbers/australian-company-number-digit-check/
  - http://softwaredevelopers.ato.gov.au/ABNformat
  - http://www.mathgen.ch/codes/abn.html
  - [tfn](https://github.com/sidorares/tfn) - validate TFN
  - [australian-tax-rate](https://github.com/sidorares/australian-tax-rate) - calculate tax rate based on taxable income
