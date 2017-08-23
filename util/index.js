/**
 * @file util methods
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

/**
 * Generates a random string of hexadecimal character with the given length.
 * @param {number} len string's length
 * @return {string} a random string of hexadecimal character with the given length
 */
function rand16Num (len = 0) {
  let result = []
  for (let i = 0; i < len; i++) {
    result.push('0123456789abcdef'.charAt(~~(Math.random() * 16)))
  }
  return result.join('')
}

/**
 * a random GUID legal string
 * format is “xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx”
 * x is 0-9 or a-f, a hexadecimal character
 *
 * @return {string} a random GUID legal string
 */
export function guid () {
  let curr = (new Date()).valueOf().toString()
  return ['4b534c46',  // Fixed first group. and a trick
    rand16Num(4),
    '4' + rand16Num(3),  // The first character of 3rd group is '4'.
    rand16Num(4),
    curr.substring(0, 12)
  ].join('-')
};

/**
 * a random unique string, using current time to generate
 *
 * @return {string} a random unique string
 */
export function uid () {
  return [
    (new Date()).valueOf().toString(),  // first 12 characters
    rand16Num(4)
  ].join('')
}
