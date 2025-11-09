import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import Product from './models/Product';

dotenv.config();

const seedData = [
  {
    image:
      'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
    code: 'WW90T754ABT',
    name: 'Pralka QuickDrive™',
    color: 'biała',
    capacity: 9,
    dimensions: '55 x 60 x 85 cm',
    features: [
      'Drzwi AddWash™',
      'Panel AI Control',
      'Silnik inwerterowy',
      'Wyświetlacz elektroniczny',
    ],
    energyClass: 'A',
    price: {
      value: 2999.1,
      currency: 'zł',
      installment: {
        value: 53.31,
        period: 60,
      },
      validFrom: new Date('2021-01-01'),
      validTo: new Date('2021-12-31'),
    },
  },
  {
    image:
      'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
    code: 'WW90T754ABH',
    name: 'Pralka QuickDrive™',
    color: 'biała',
    capacity: 10.5,
    dimensions: '55 x 60 x 85 cm',
    features: ['Panel AI Control', 'Silnik inwerterowy', 'Wyświetlacz elektroniczny'],
    energyClass: 'A',
    price: {
      value: 1999.2,
      currency: 'zł',
      installment: {
        value: 53.31,
        period: 60,
      },
      validFrom: new Date('2021-01-01'),
      validTo: new Date('2021-12-31'),
    },
  },
  {
    image:
      'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
    code: 'WW90T754ABC',
    name: 'Pralka QuickDrive™',
    color: 'biała',
    capacity: 8,
    dimensions: '55 x 60 x 85 cm',
    features: [
      'Drzwi AddWash™',
      'Panel AI Control',
      'Silnik inwerterowy',
      'Wyświetlacz elektroniczny',
    ],
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
  {
    image:
      'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
    code: 'WW90T754ABD',
    name: 'Pralka QuickDrive™',
    color: 'biała',
    capacity: 9,
    dimensions: '55 x 60 x 85 cm',
    features: ['Drzwi AddWash™', 'Panel AI Control', 'Silnik inwerterowy'],
    energyClass: 'B',
    price: {
      value: 1999.0,
      currency: 'zł',
      installment: {
        value: 53.31,
        period: 60,
      },
      validFrom: new Date('2021-01-01'),
      validTo: new Date('2021-12-31'),
    },
  },
  {
    image:
      'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
    code: 'WW90T754ABE',
    name: 'Pralka QuickDrive™',
    color: 'biała',
    capacity: 10.5,
    dimensions: '55 x 60 x 85 cm',
    features: [
      'Drzwi AddWash™',
      'Panel AI Control',
      'Silnik inwerterowy',
      'Wyświetlacz elektroniczny',
    ],
    energyClass: 'C',
    price: {
      value: 1999.0,
      currency: 'zł',
      installment: {
        value: 53.31,
        period: 60,
      },
      validFrom: new Date('2021-01-01'),
      validTo: new Date('2021-12-31'),
    },
  },
  {
    image:
      'https://f00.esfr.pl/foto/5/71215465857/b7c91239dad8f45eae1abe48d24c6b3b/samsung-ww90ta046te,71215465857_8.jpg',
    code: 'WW90T754ABF',
    name: 'Pralka QuickDrive™',
    color: 'biała',
    capacity: 8,
    dimensions: '55 x 60 x 85 cm',
    features: ['Drzwi AddWash™', 'Panel AI Control', 'Wyświetlacz elektroniczny'],
    energyClass: 'B',
    price: {
      value: 1999.0,
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

const seedDatabase = async () => {
  try {
    await connectDatabase();

    await Product.deleteMany({});
    console.log('Existing products deleted');

    await Product.insertMany(seedData);
    console.log('Seed data inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
