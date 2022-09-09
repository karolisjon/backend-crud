const correctProductDetails = ({ title, description, categoryId, price, img }) =>
title !== undefined && typeof title === 'string' && title !== '' &&
description !== undefined && typeof description === 'string' && description !== '' &&
categoryId !== undefined && typeof categoryId === 'number' && categoryId !== '' &&
price !== undefined && typeof price === 'number' && price > 0 &&
img !== undefined && typeof img === 'string' && img !== '';

module.exports = { correctProductDetails } ;
