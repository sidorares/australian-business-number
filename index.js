// see  http://www.mathgen.ch/codes/abn.html

var acnWeights = [8, 7, 6, 5, 4, 3, 2, 1];
var weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

var multiple = 11;
var suggestLookup = [];
for (var i=0; i < 10; ++i) {
  suggestLookup[i*19 % 89] = i;
}

function addWeighted(p, v, i) {
  return p+v*weights[i];
}

// http://downloads.icbglobal.org/au/ATO/ATO_Format_of_the_ABN_NAT2956.pdf
module.exports.generateABNfromACN = function generateABNfromACN(acn) {
  var digits = acn.replace(/[^\d]/g, '').split('').map(Number);
  var sum = [0, 0].concat(digits).reduce(addWeighted, 0);
  var moduloAdd = 89 - sum%89;
  var a10 = moduloAdd%10;
  var a11 = 1 + (moduloAdd - a10)/10;
  return [a11, a10].concat(digits).join('');
}

// also ARBN and ARSN
module.exports.validateACN = function validateACN(acn) {
  console.log('validateACN ', acn)
  var digits = acn.replace(/[^\d]/g, '').split('').map(Number);
  console.log(digits);
  if (digits.length != 9)
    return { valid: false };

  function addWeighted(p, v, i) {
    console.log(p, v, i, acnWeights[i], +v*acnWeights[i]);
    return p+v*acnWeights[i];
  }
  var sum = digits.slice(0,8).reduce(addWeighted, 0);
  console.log('ACN:', sum);
  var lastDigit = 10 - sum%10;
  if (lastDigit === digits[8])
    return { valid: true };

  return {
    valid: false,
    suggestion: digits.slice(0,8).concat([lastDigit]).join('')
  }
}

module.exports.validateABN = function validateABN(abn) {
  var digits = abn.replace(/[^\d]/g, '').split('').map(Number);
  if (digits.length != 11)
    return { valid: false };

  digits[0] -= 1;

  var sum = digits.reduce(addWeighted, 0);

  if (sum % 89 == 0) {
    return {
      valid: true,
      isACN: module.exports.validateACN(digits.slice(-9).join('')).valid
    };
  }

  digits[0] += 1;

  var sum1 = sum - digits[10]*weights[10];
  var digit = suggestLookup[89 - sum1%89];
  if (typeof digit != 'undefined') {
    return {
      valid: false,
      suggestion: digits.slice(0,10).concat([digit]).join('')
    }
  } else {
    var sum2 = sum1 - digits[9]*weights[9];
    for(var i=0; i<10; ++i) {
      sum1 = sum2 + i*weights[9];
      digit = suggestLookup[89 - sum1%89];
      if (typeof digit != 'undefined') {
        return {
          valid: false,
          suggestion: digits.slice(0,9).concat([i, digit]).join('')
        }
     }
    }
  }
};

console.log(module.exports.validateABN(process.argv[2]));
console.log(module.exports.validateACN(process.argv[2]));
console.log(module.exports.generateABNfromACN(process.argv[2]));

// console.log(module.exports.generateABNfromACN(process.argv[2]));

// 53 004 085 616
//
//validateACN()
/*
function pad11(n) {
  var p = '0000000000';
  var s = n.toString();
  return p.slice(0, 11 - s.length) + n;
}

var cc = 0;

for(var i=0; i < 100000000; ++i) {
  //var d = '53 004 085 '
  ///if  ( i < 10 )
  // d += '00' + i;
  //else if ( i < 100 )
  //  d += '0' + i;
  //else
  //  d += i;
  var d = pad11(i)
  //console.log(d);

  if (module.exports(d)) {
    //console.log(d);
    cc++;
  }
  var interval = 100000;
  if (i % interval == 0)
    console.log(i/cc);
}
*/
