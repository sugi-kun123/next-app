// 文字列操作ユーティリティ
/**
 * 指定された文字列を最大長で省略し、'...' を追加します。
 * @param text 対象の文字列
 * @param maxLength 最大文字数
 * @returns 省略された、または元の文字列
 */
export const truncateString = (text: string, maxLength: number = 15) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};
