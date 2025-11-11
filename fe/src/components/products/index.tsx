import { useEffect, useState } from 'react';
import { ProductCard } from '../cards/Product';
import { Button } from '../button';
import { useFilterContext } from '../../contexts/filters';
import { ChevronDown } from 'react-feather';
import { fetchProducts } from '../../services/api';
import { IProduct } from '@shared/types/Product';

export const Products = () => {
  const { filters, query } = useFilterContext();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts({
          search: query,
          capacity: filters.capacity === '' ? undefined : filters.capacity,
          energyClass: filters.energyClass,
          feature: filters.feature,
          sort: filters.sort,
        });
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Nie udało się załadować produktów');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters, query]);

  if (loading) {
    return (
      <div>
        <p className="text-center text-gray-500 text-xl mt-4">Ładowanie...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-center text-red-500 text-xl mt-4">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div>
        <p className="text-center text-gray-500 text-xl mt-4">
          Brak produktów spełniających kryteria wyszukiwania
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-x-4 gap-y-5">
        {products.map((product) => (
          <ProductCard key={product.code} {...product} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          variant={'tertiary'}
          value={'Pokaż więcej'}
          icon={<ChevronDown />}
          onClick={() => console.log('some action')}
        />
      </div>
    </>
  );
};
