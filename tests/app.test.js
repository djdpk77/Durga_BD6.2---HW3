let {
  app,
  getProducts,
  getProductById,
  addNewProduct,
} = require('../index.js');
let http = require('http');

jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  getProducts: jest.fn(),
  getProductById: jest.fn(),
  addNewProduct: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getProducts should return a list of products', () => {
    const mockProducts = [
      { id: 1, name: 'Laptop', category: 'Electronics' },
      { id: 2, name: 'Coffee Maker', category: 'Appliances' },
    ];

    getProducts.mockReturnValue(mockProducts);

    let result = getProducts();

    expect(result).toEqual(mockProducts);
    expect(getProducts).toHaveBeenCalled();
  });

  test('getProductById should return the product details', () => {
    const mockProduct = { id: 1, name: 'Laptop', category: 'Electronics' };
    getProductById.mockReturnValue(mockProduct);

    let result = getProductById(1);

    expect(result).toEqual(mockProduct);
    expect(getProductById).toHaveBeenCalledWith(1);
  });

  test('getProductById should return undefined for a non-existent product', () => {
    getProductById.mockReturnValue(undefined);

    let result = getProductById(99);

    expect(result).toBeUndefined();
    expect(getProductById).toHaveBeenCalledWith(99);
  });

  test('addNewProduct should add a new product', () => {
    const newProduct = { id: 5, name: 'Smartwatch', category: 'Wearables' };

    addNewProduct.mockReturnValue(newProduct);

    const addedProduct = addNewProduct(newProduct);

    expect(addedProduct).toEqual(newProduct);
    expect(addNewProduct).toHaveBeenCalledWith(newProduct);
  });
});
