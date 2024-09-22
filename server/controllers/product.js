import Product from "../models/product.js";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const CreateNewProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};
export const GetAllProducts = async (_, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return sendErrorResponse(res, 404, "No products found.");
    }
    return res.status(200).json({ data: products });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return sendErrorResponse(res, 404, "Product not found.");
    }
    return res
      .status(201)
      .json({ message: "Product has been deleted successfully." });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const UpdateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!product) {
      return sendErrorResponse(res, 409, "Product not found.");
    }
    return res.status(201).json({ data: product });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const GetOneProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const oneProduct = await Product.findById(productId);
    if (!oneProduct) {
      return sendErrorResponse(res, 404, "Product not found."); // Use 404 status code
    }
    return res.status(200).json({ data: oneProduct }); // Use 200 status code
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};


export const LikeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return sendErrorResponse(res, 404, "Product not found.");
    }

    product.like += 1;
    await product.save();

    return res.status(200).json({ like: product.like });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};