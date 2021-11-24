import supertest from 'supertest';
import { initializeDatabase } from '../src/database/connect';
import { ProductService } from '../src/services';
import { Product } from '../src/database/models';
import { sampleProduct } from './samples';

const app = require('../src/server');

describe('Routes Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
});


describe('product enpoints', () => {
  beforeAll(async () => {
    await initializeDatabase('test');
  });

  describe('get', () => {
    let productId = null;

    beforeAll(async () => {
      // create product sample
      const res = await ProductService.create(sampleProduct);
      productId = res.data.id;
    });

    test('get products', async () => {
      const res = await supertest(app).get('/api/v1/product');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('count');
      expect(res.body.data.count).toBe(1);
      expect(res.body.data).toHaveProperty('rows');
      expect(res.body.data.rows.length).toBe(1);
    });

    test('get products by name', async () => {
      const res = await supertest(app)
        .get('/api/v1/product')
        .send({
          name: sampleProduct.name,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('count');
      expect(res.body.data.count).toBe(1);
      expect(res.body.data).toHaveProperty('rows');
      expect(res.body.data.rows.length).toBe(1);
      expect(res.body.data.rows[0]).toHaveProperty('name');
      expect(res.body.data.rows[0].name).toBe(sampleProduct.name);
    });

    test('get products by description', async () => {
      const res = await supertest(app)
        .get('/api/v1/product')
        .send({
          description: sampleProduct.description,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('count');
      expect(res.body.data.count).toBe(1);
      expect(res.body.data).toHaveProperty('rows');
      expect(res.body.data.rows.length).toBe(1);
      expect(res.body.data.rows[0]).toHaveProperty('name');
      expect(res.body.data.rows[0].description).toBe(sampleProduct.description);
    });

    test('get products by price', async () => {
      const res = await supertest(app)
        .get('/api/v1/product')
        .send({
          price: sampleProduct.price,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('count');
      expect(res.body.data.count).toBe(1);
      expect(res.body.data).toHaveProperty('rows');
      expect(res.body.data.rows.length).toBe(1);
      expect(res.body.data.rows[0]).toHaveProperty('name');
      expect(res.body.data.rows[0].price).toBe(sampleProduct.price);
    });

    test('get product by id', async () => {
      const res = await supertest(app).get(`/api/v1/product/${productId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toMatchObject(sampleProduct);
    });

    test('get product by id - error uuid', async () => {
      const uuidError = '111-222-3333'
      const res = await supertest(app).get(`/api/v1/product/${uuidError}`);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toHaveProperty('name');
      expect(res.body.error.name).toEqual('ProductIdShouldUUID');
    });

  });

  describe('post', () => {
    beforeAll(async () => {
      await Product.destroy({ where: {}, truncate: true });
    });

    test('post product', async () => {
      const res = await supertest(app)
        .post('/api/v1/product')
        .set('Accept', 'application/json')
        .send(sampleProduct);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toMatchObject(sampleProduct);
    });

    test('post product - validation empty', async () => {
      const res = await supertest(app)
        .post('/api/v1/product')
        .set('Accept', 'application/json')
        .send({ name: '', description: '',  price: 0 });

      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty('error');
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toHaveProperty('name');
      expect(res.body.error.name).toEqual('SequelizeValidationError');
      expect(res.body.error).toHaveProperty('validation');
      expect(res.body.error.validation).toHaveProperty('name');
      expect(res.body.error.validation).toHaveProperty('description');
      expect(res.body.error.validation).toHaveProperty('price');
    });

    test('post product - validation price isDecimal', async () => {
      const res = await supertest(app)
        .post('/api/v1/product')
        .set('Accept', 'application/json')
        .send({ name: '', description: '',  price: '' });

      expect(res.statusCode).toEqual(422);
      expect(res.body).toHaveProperty('error');
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toHaveProperty('name');
      expect(res.body.error.name).toEqual('SequelizeValidationError');
      expect(res.body.error).toHaveProperty('validation');
      expect(res.body.error.validation).toHaveProperty('price');
    });

  });

  describe('delete', () => {
    let productId = null;
    beforeAll(async () => {
      await Product.destroy({ where: {}, truncate: true });
       productId = (await Product.build(sampleProduct).save()).id;
    });

    test('delete product - soft delete', async () => {
      const res = await supertest(app).delete(`/api/v1/product/${productId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('deletedRows');
      expect(res.body.data.deletedRows).toEqual(1);
      expect(res.body.data).toHaveProperty('force');
      expect(res.body.data.force).toEqual(false);
    });

    test('delete product - hard delete', async () => {
      const res = await supertest(app).delete(`/api/v1/product/${productId}?force=true`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('deletedRows');
      expect(res.body.data.deletedRows).toEqual(1);
      expect(res.body.data).toHaveProperty('force');
      expect(res.body.data.force).toEqual(true);
    });
    
  });

  describe('patch restore soft delete', () => {
    let productId = null;
    beforeAll(async () => {
      await Product.destroy({ where: {}, truncate: true });
       productId = (await Product.build(sampleProduct).save()).id;
    });

    test('delete product - soft delete', async () => {
      const res = await supertest(app).delete(`/api/v1/product/${productId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('deletedRows');
      expect(res.body.data.deletedRows).toEqual(1);
      expect(res.body.data).toHaveProperty('force');
      expect(res.body.data.force).toEqual(false);
    });

    test('restore product', async () => {
      const res = await supertest(app).patch(`/api/v1/product/restore/${productId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('restoredRows');
      expect(res.body.data.restoredRows).toEqual(1);
    });
    
  });

})