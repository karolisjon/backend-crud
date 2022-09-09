const {correctProductDetails} = require('../helpers/index');
const ProductModel = require('../models/product-model');

const fetchAll = async (req, res) => {
  const productDocuments = await ProductModel.find() 
  res.status(200).json(productDocuments);
};

const fetchOne = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);

    if (product === undefined) throw ({
      message: `Product with id '${productId}' does not exist`,
      status: 404
    })

    res.status(200).json(product);

  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'An error has occurred' })
    } else {
      const { message, status } = error;
      res.status(status).json({ message });
    };
  };
};

const post = async (req, res) => {
  const newProductDetails = req.body;
  console.log(1);

  try {
    if (!correctProductDetails(newProductDetails))
      throw ({
        message: 'Provided details about the product are invalid',
        status: 400
      });

    const newProduct = await ProductModel.create(newProductDetails);

    res.status(201).json(newProduct);

  } catch ({ status, message }) {
    res.status(status).json({ message });
  };
};

const put = async (req, res) => {
  const productId = req.params.id;
  const newProductDetails = req.body;

  try {
    if (!correctProductDetails(newProductDetails)) throw ({
      message: `Provided details about the product are invalid`,
      status: 400
    });

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      newProductDetails,
      { new: true, runValidators: true }
    );

    if (updatedProduct === null) throw ({
      message: `Product with id '${productId}' was not found`,
      status: 404
    });

    res.status(200).json(updatedProduct);

  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const remove = (req, res) => {
  const productId = req.params.id;

  try {
    const productInDatabaseIndex = database.products.findIndex(({ id }) => id === productId);
    if (productInDatabaseIndex === -1) throw ({
      message: `Product with id '${productId}' was not found`,
      status: 404
    });

    const [deletedProduct] = database.products.splice(productInDatabaseIndex, 1);

    res.status(200).json(deletedProduct);
    
  } catch ({ status, message }) {
    res.status(status).json({ message });
  };
};


module.exports = {
  fetchAll,
  fetchOne,
  post,
  put,
  remove,
};
