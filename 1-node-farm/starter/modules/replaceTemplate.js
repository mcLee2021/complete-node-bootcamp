const replaceTemplate = (template, data) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, data.productName);
  output = output.replace(/{%QUANTITY%}/g, data.quantity);
  output = output.replace(/{%IMAGE%}/g, data.image);
  output = output.replace(/{%PRODUCTPRICE%}/g, data.price);
  output = output.replace(/{%PRODUCTDESC%}/g, data.description);
  output = output.replace(/{%PRODUCTNUTRITION%}/g, data.nutrients);
  output = output.replace(/{%PRODUCTORIGIN%}/g, data.from);
  output = output.replace(/{%ID%}/g, data.id);
  if (!data.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

module.exports = {
  replaceTemplate,
};
