import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, capacity, energyClass, feature, sort } = req.query;

    let query: any = {};

    if (search) {
      query.code = { $regex: search, $options: 'i' };
    }

    if (capacity) {
      query.capacity = Number(capacity);
    }

    if (energyClass) {
      query.energyClass = energyClass;
    }

    if (feature) {
      query.features = feature;
    }

    let productsQuery = Product.find(query);

    if (sort === 'price') {
      productsQuery = productsQuery.sort({ 'price.value': 1 });
    } else if (sort === 'capacity') {
      productsQuery = productsQuery.sort({ capacity: 1 });
    }

    const products = await productsQuery;

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
