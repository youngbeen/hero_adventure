
// NOTE: 加解密代码规则
// 每个字符代表2位数字，其中00-93对应ASCII码中33(!)到126(~)，94-99对应“风，林，火，山，天，地”汉字字符
// 加密转义时始终先将原始数字+33，之后超过126的匹配后续的汉字
// 解密代码相反

export default {
  // 加密 -- 需要加密的原始明文数字字符串（必须是偶数位）
  encode (rawCode) {
    let finalCode = ''

    if (rawCode) {
      let rawCodeStr = rawCode + ''
      // 每2位拆解数据，转为代码
      let codeLength = rawCodeStr.length / 2

      for (let i = 0; i < codeLength; i++) {
        let splitRawCode = rawCodeStr.substr(i * 2, 2)
        console.log('拆解的raw code ', i, ':', splitRawCode)
        let splitCode = Number(splitRawCode) + 33
        if (splitCode > 126) {
          // 匹配汉字
          switch (splitCode) {
            case 127:
              splitCode = '风'
              break
            case 128:
              splitCode = '林'
              break
            case 129:
              splitCode = '火'
              break
            case 130:
              splitCode = '山'
              break
            case 131:
              splitCode = '天'
              break
            case 132:
              splitCode = '地'
              break
          }
        } else {
          // 匹配ASCII码
          splitCode = String.fromCharCode(splitCode)
        }
        finalCode += splitCode
      }

      console.log('加密代码：', finalCode)
    }

    return finalCode
  },
  // 解密 -- 需要解密的加密过的密文字符串
  decode (code) {
    let source = ''

    if (code) {
      code += ''
      for (let i = 0; i < code.length; i++) {
        let str = code[i]
        switch (str) {
          case '风':
            str = '94'
            break
          case '林':
            str = '95'
            break
          case '火':
            str = '96'
            break
          case '山':
            str = '97'
            break
          case '天':
            str = '98'
            break
          case '地':
            str = '99'
            break
          default:
            // 标准ASCII码，反转为数字字符
            str = str.charCodeAt()
            str -= 33
            if (str < 10) {
              // 不足2位数，补足
              str = '0' + str
            } else {
              str += ''
            }
        }
        console.log('转义出的source code ', i, str)
        source += str
      }
    }

    return source
  },
  // 补全字符串 -- 需要补全的原始字符串 ,最终需要补全到的字符串长度, [补全的字符, 补全类型]
  // NOTE: 默认的补全字符是字符0，传入的补全字符只能是1位
  // 补全类型默认是在原始字符前面填充字符，设置为 'after' 可改为后面填充
  // 注意： 如果传入的原始字符串长度比需要补全的最终长度还长的话，原始字符串将被正向截取！
  fixStr (str, len, c, type) {
    c && c.length === 1 ? c : c = '0'
    type === 'after' ? type : type = 'before'
    let finalStr = ''

    if (str) {
      // 传入了str
      if (Number(len)) {
        str += ''
        if (str.length > Number(len)) {
          // 原始字符串比目标字符串还长，正向截取
          finalStr = str.substr(0, Number(len))
        } else {
          // 正常 case
          let paddingLength = Number(len) - str.length
          finalStr += str
          for (let i = 0; i < paddingLength; i++) {
            if (type === 'after') {
              finalStr += c
            } else {
              finalStr = c + finalStr
            }
          }
        }
      }
    } else {
      // 未传入str
      if (Number(len)) {
        for (let i = 0; i < Number(len); i++) {
          finalStr += c
        }
      }
    }

    return finalStr
  },
  // 通过品质获取对应的品质数据 -- 原始品质字符串
  // NOTE: 原始品质字符串可选值 '', 'c', 'g', 'e'；返回的值分别对应 '0', '1', '2', '3'
  getQualityNumberStr (quality) {
    if (quality === 'e') {
      return '3'
    } else if (quality === 'g') {
      return '2'
    } else if (quality === 'c') {
      return '1'
    } else {
      return '0'
    }
  },
  // 通过品质数字字符串获取对应的品质 -- 品质数字字符串
  // NOTE: 品质数字字符串可选值 '0', '1', '2', '3'；返回的值分别对应 '', 'c', 'g', 'e'
  getQualityStr (numberStr) {
    if (numberStr === '3') {
      return 'e'
    } else if (numberStr === '2') {
      return 'g'
    } else if (numberStr === '1') {
      return 'c'
    } else {
      return ''
    }
  }
}
