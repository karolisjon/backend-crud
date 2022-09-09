// const idGenerator = () => {
//   let id = '';
//   let length = 36;
//   let char_list =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   for (let i = 0; i < length; i++) {
//     id += char_list.charAt(Math.floor(Math.random() * char_list.length));
//   }
//   return id;
// };

const correctProductDetails = ({ title, description, categoryId, price, img }) =>
title !== undefined && typeof title === 'string' && title !== '' &&
description !== undefined && typeof description === 'string' && description !== '' &&
categoryId !== undefined && typeof categoryId === 'number' && categoryId !== '' &&
price !== undefined && typeof price === 'number' && price > 0 &&
img !== undefined && typeof img === 'string' && img !== '';

module.exports = correctProductDetails;
