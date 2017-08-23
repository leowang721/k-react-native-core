/**
 * @file core number processor
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

// <= 1000
const ROMAN_NUM = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
const ROMAN_MAP = {
  1000: 'm',
  900: 'cm',
  500: 'd',
  400: 'cd',
  100: 'c',
  90: 'xc',
  50: 'l',
  40: 'xl',
  10: 'x',
  9: 'ix',
  5: 'v',
  4: 'iv',
  1: 'i'
}

const CHINESE_NUM = ['十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿', '兆', '十兆', '百兆', '千兆']
const CHINESE_CHAR = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const CHINESE_NUM_UPPER = ['拾', '佰', '仟', '万', '拾万', '佰万', '仟万', '亿', '十亿', '百亿', '千亿', '兆', '十兆', '百兆', '千兆']
const CHINESE_CHAR_UPPER = ['零', '壹', '貮', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
const CHINESE_STEMS = ['甲', '乙', '丙', '丁', '午', '己', '庚', '辛', '壬', '癸']
const CHINESE_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

export const transferNumberByType = {
  roman (num, isUpperCase = false) {
    if (num < 0 || num < 100) {
      return num
    }
    let result = []
    let i = 0
    while (num > 0) {
      let currValue = ROMAN_NUM[i]
      while (num > currValue) {
        result.push(ROMAN_MAP[currValue])
        num -= currValue
      }
      i++
    }

    if (isUpperCase) {
      return result.join('').toUpperCase()
    }
    return result.join('')
  },
  latin (num, isUpperCase = false) {
    let result = num.toString(26).replace(/[a-z]/g, c => String.fromCharCode(c.charCodeAt() + 9)).replace(/\d/g, c => String.fromCharCode(0x60 + +c))
    if (isUpperCase) {
      return result.toUpperCase()
    }
    return result
  },
  chinese (num, isUpperCase = false) {
    let str = num.toString(10)
    let i = str.length - 1
    let pos = 0
    let result = []
    let toUseChar = isUpperCase ? CHINESE_CHAR_UPPER : CHINESE_CHAR
    let toUseNum = isUpperCase ? CHINESE_NUM_UPPER : CHINESE_NUM

    // start processing the last number
    let exresult = /0+$/.exec(str)
    if (!exresult) {
      result.unshift(toUseChar[str[i]])
      i--
    } else {
      i = exresult.index - 1
      pos += exresult[0].length - 1
    }

    // continue
    let curr
    let last = null
    while (i >= 0) {
      curr = +str[i]
      if (curr > 0) {
        result.unshift(toUseNum[pos])
        result.unshift(toUseChar[curr])
      } else if (last !== curr) {
        result.unshift(toUseChar[curr])
      }
      i--
      pos++
      last = curr
    }
    let rstr = result.join('')
    // only 1 '万' stays
    let wi = rstr.lastIndexOf('万')
    return rstr.substr(0, wi).replace('万', '') + rstr.substr(wi)
  },
  // 干支表
  // Chinese Era (Heavenly stems and Earthly Branches) will repeat every 60 counts
  // starts with 1
  // don't sugges use this if num > 60
  // if you wanna get chinese years, use another algorithm in date
  chineseEra (num) {
    if (num < 1) {
      return
    }
    num = num % 60
    if (num === 0) {
      num = 60
    }
    // start
    let first = num % 10
    if (first === 0) {
      first = 10
    }
    let second = num % 12
    if (second === 0) {
      second = 12
    }
    return CHINESE_STEMS[first - 1] + CHINESE_BRANCHES[second - 1]
  },
  // 天干
  chineseHeavenlyStem (num) {
    if (num < 1) {
      return
    }
    let str = (num - 1).toString(10)
    let last = str.length - 1
    return str.replace(/\d/g, (n, i) => CHINESE_STEMS[i === last ? n : n - 1])
  },
  // 地支
  chineseEarthlyBranch (num) {
    if (num < 0) {
      return
    }
    let str = (num - 1).toString(12)
    let last = str.length - 1
    return str.replace(/\d/g, (n, i) => CHINESE_BRANCHES[i === last ? n : n - 1]).replace(/[a-z]/g, (c, i) => CHINESE_BRANCHES[c.charCodeAt() - 87 - (i === last ? 0 : 1)])
  }
}
