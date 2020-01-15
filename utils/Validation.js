// 入力必須
export const required = (value) => !value ? '必須やで' : undefined;

// 最大文字数
const maxLength = (value, max) => value && value.length > max ? '２０文字以内で入力してください' : undefined;
export const maxLength20 = (value) => maxLength(value, 20)
// 数値
export const number = (value, msg) => value && isNaN(value) ? msg : undefined;

// 最小文字数
export const minLength = (value, min, msg) => value && value.length < min ? msg : undefined;

// 最大値
export const maxNum = (value, max, msg) => value && value > max ? msg : undefined;

// 最小値
export const minNum = (value, min, msg) => value && value < min ? msg : undefined;

// フォーマット
export const format = (value, reg, msg) => value && !value.match(reg) ? msg : undefined;

// メールアドレス
export const email = (value, msg) => format(value, /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i, msg);
