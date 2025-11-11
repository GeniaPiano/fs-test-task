import axios from 'axios';
import { IProduct, Capacity } from '../interfaces/product';

const API_URL = 'http://localhost:5000/api';

interface ProductsResponse {
  success: boolean;
  count: number;
  data: IProduct[];
}

interface FetchProductsParams {
  search?: string;
  capacity?: Capacity;
  energyClass?: string;
  feature?: string;
  sort?: string;
}

export const fetchProducts = async (params: FetchProductsParams = {}): Promise<IProduct[]> => {
  const response = await axios.get<ProductsResponse>(`${API_URL}/products`, {
    params: {
      search: params.search,
      capacity: params.capacity,
      energyClass: params.energyClass,
      feature: params.feature,
      sort: params.sort,
    },
  });

  return response.data.data.map((product) => ({
    ...product,
    price: {
      ...product.price,
      validFrom: new Date(product.price.validFrom),
      validTo: new Date(product.price.validTo),
    },
  }));
};
