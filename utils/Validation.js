// 入力必須
export const required = (value) => (!value ? '入力必須です' : undefined);

// 最大文字数
const maxLength = (value, max) => (value && value.length > max ? '２０文字以内で入力してください' : undefined);
export const maxLength20 = (value) => maxLength(value, 20);
