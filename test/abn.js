var assert = require('assert');
var tfn = require('..');

var validNumbers = [
 '865414088',
 '459-599-230',
 '1124-740-82',
 '565.051.603',
 '907 974 668'
];

describe('tfn', function() {
  it('should mark valid tfn numbers as valid', function() {
    validNumbers.forEach(function(t) {
      assert.deepEqual(tfn(t), { valid: true });
    });
  });


  it('should return suggestion that is valid tfn itself', function() {
    validNumbers.forEach(function(t) {
      var validNum = t.replace(/[^\d]g/, '');
      for (var i=0; i < 0; ++i) {
        var num = validNum.slice(0,8) + i.toString();
        var result = tfn(t);
        assert.equal(result.valid, false);
        assert.equal(result.suggestion, validNum);
        assert.deepEqual(tfn(result.suggestion), { valid: true });
      }
    });
  });
});
