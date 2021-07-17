const Product = require('../models/product-model');
const HttpError = require('../models/http-error');

// get all products

const getAllProducts = async (req, res, next) => {
  let pageSize;
  const page = Number(req.query.pageNumber) || 1;

  if (req.headers.referer.includes('admin')) {
    pageSize = 10;
  } else {
    pageSize = 12;
  }

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  try {
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (er) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// get top rated products

const getTopRatedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5);

    res.json({ products });
  } catch (er) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// get product by id

const getProductById = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      const error = new HttpError('Product not found.', 404);
      return next(error);
    }

    res.json({ product });
  } catch (er) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// create product review - private

const createProductReview = async (req, res, next) => {
  const { newRating: rating, comment } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        const error = new HttpError('Product already reviewed.', 400);
        return next(error);
      }

      const review = {
        name: req.user.name,
        rating,
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.totalReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;

      const updatedProduct = await product.save();
      res.status(201).json({ product: updatedProduct });
    } else {
      const error = new HttpError('Product not found.', 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// delete product by id - private, admin

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndRemove(productId);

    if (!product) {
      const error = new HttpError('Product not found.', 404);
      return next(error);
    }

    res.json({ message: 'Product removed.' });
  } catch (er) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// create product - private, admin

const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      user: req.user._id,
      name: 'Product Name',
      brand: 'Product Brand',
      category: 'Product Category',
      image: '/images/product-image.jpg',
      description: 'Product Description',
      totalReviews: 0,
      rating: 0,
      price: 0,
      inStock: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json({ product: createdProduct });
  } catch (er) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

// update product - private, admin

const updateProduct = async (req, res, next) => {
  const { name, price, description, image, brand, category, inStock } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.inStock = inStock;

      res.json({ product });
    } else {
      const error = new HttpError('Product not found.', 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
};
