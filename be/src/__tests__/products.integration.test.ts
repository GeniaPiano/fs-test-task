import request from 'supertest';
import express, { Express } from 'express';
import cors from 'cors';
import productRoutes from '../routes/products';
import { errorHandler } from '../middleware/errorHandler';
import Product from '../models/Product';

jest.mock('../models/Product');

describe('Products API Integration', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api/products', productRoutes);
    app.use(errorHandler);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockQueryBuilder = (data: any[]) => {
    const query = {
      sort: jest.fn().mockReturnThis(),
      then: (resolve: any) => resolve(data),
    };
    return query;
  };

  it('should return products with correct response structure', async () => {
    const mockProducts = [
      {
        image: 'https://example.com/product.jpg',
        code: 'WW90T754ABT',
        name: 'Pralka QuickDrive™',
        color: 'biała',
        capacity: 10.5,
        dimensions: '55 x 60 x 85 cm',
        features: ['Panel AI Control', 'Silnik inwerterowy'],
        energyClass: 'A',
        price: {
          value: 2999.0,
          currency: 'zł',
          installment: {
            value: 53.31,
            period: 60,
          },
          validFrom: '2021-01-01T00:00:00.000Z',
          validTo: '2021-12-31T00:00:00.000Z',
        },
      },
    ];

    (Product.find as jest.Mock).mockReturnValue(mockQueryBuilder(mockProducts));

    const res = await request(app).get('/api/products');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      count: 1,
      data: mockProducts,
    });
  });

  it('should filter products by multiple parameters', async () => {
    (Product.find as jest.Mock).mockReturnValue(mockQueryBuilder([]));

    const res = await request(app).get(
      '/api/products?search=washer&capacity=8&energyClass=B'
    );

    expect(res.status).toBe(200);
    expect(Product.find).toHaveBeenCalledWith({
      $or: expect.any(Array),
      capacity: 8,
      energyClass: 'B',
    });
  });

  it('should sort products by price', async () => {
    const sortMock = jest.fn().mockResolvedValue([]);
    (Product.find as jest.Mock).mockReturnValue({ sort: sortMock });

    const res = await request(app).get('/api/products?sort=price');

    expect(res.status).toBe(200);
    expect(sortMock).toHaveBeenCalledWith({ 'price.value': 1 });
  });

  it('should handle database errors', async () => {
    (Product.find as jest.Mock).mockImplementation(() => {
      throw new Error('Database connection failed');
    });

    const res = await request(app).get('/api/products');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('success', false);
  });

  it('should include CORS headers', async () => {
    (Product.find as jest.Mock).mockReturnValue(mockQueryBuilder([]));

    const res = await request(app).get('/api/products');

    expect(res.headers['access-control-allow-origin']).toBeDefined();
  });
});
