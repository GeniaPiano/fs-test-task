import { Request, Response, NextFunction } from 'express';
import { getProducts } from '../controllers/productController';
import Product from '../models/Product';

jest.mock('../models/Product');

describe('Product Controller - getProducts', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    req = { query: {} };
    res = { json: jsonMock };
    next = jest.fn();
    jest.clearAllMocks();
  });

  const mockQueryBuilder = (data: any[]) => {
    const query = {
      sort: jest.fn().mockReturnThis(),
      then: (resolve: any) => resolve(data),
    };
    return query;
  };

  it('should return all products when no filters provided', async () => {
    const mockData = [
      {
        image: 'https://example.com/product.jpg',
        code: 'WW90T754ABC',
        name: 'Pralka QuickDrive™',
        color: 'biała',
        capacity: 8,
        dimensions: '55 x 60 x 85 cm',
        features: ['Panel AI Control', 'Silnik inwerterowy'],
        energyClass: 'A',
        price: {
          value: 1799.0,
          currency: 'zł',
          installment: {
            value: 53.31,
            period: 60,
          },
          validFrom: new Date('2021-01-01'),
          validTo: new Date('2021-12-31'),
        },
      },
    ];
    (Product.find as jest.Mock).mockReturnValue(mockQueryBuilder(mockData));

    await getProducts(req as Request, res as Response, next);

    expect(Product.find).toHaveBeenCalledWith({});
    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      count: 1,
      data: mockData,
    });
  });

  it('should build search query with regex', async () => {
    req.query = { search: 'test' };
    (Product.find as jest.Mock).mockReturnValue(mockQueryBuilder([]));

    await getProducts(req as Request, res as Response, next);

    expect(Product.find).toHaveBeenCalledWith({
      $or: expect.arrayContaining([
        expect.objectContaining({ code: expect.any(Object) }),
        expect.objectContaining({ name: expect.any(Object) }),
        expect.objectContaining({ features: expect.any(Object) }),
      ]),
    });
  });

  it('should handle capacity and energyClass filters', async () => {
    req.query = { capacity: '10.5', energyClass: 'A' };
    (Product.find as jest.Mock).mockReturnValue(mockQueryBuilder([]));

    await getProducts(req as Request, res as Response, next);

    expect(Product.find).toHaveBeenCalledWith({
      capacity: 10.5,
      energyClass: 'A',
    });
  });

  it('should sort by price or capacity', async () => {
    req.query = { sort: 'price' };
    const sortMock = jest.fn().mockResolvedValue([]);
    (Product.find as jest.Mock).mockReturnValue({ sort: sortMock });

    await getProducts(req as Request, res as Response, next);

    expect(sortMock).toHaveBeenCalledWith({ 'price.value': 1 });
  });

  it('should pass errors to next middleware', async () => {
    const error = new Error('DB Error');
    (Product.find as jest.Mock).mockImplementation(() => {
      throw error;
    });

    await getProducts(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(jsonMock).not.toHaveBeenCalled();
  });
});
