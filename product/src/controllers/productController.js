
import { ProductService } from '../services';

module.exports.read = async (req, res, next) => {
	const response = { status: 500, data: null}
	const { name, description, price, offset, limit, distinct, deleted } = req.query;
	try {
		const data = {
			name,
			description,
			price,
			offset,
			limit,
			distinct,
			deleted
		};
		const responseFromService = await ProductService.read(data);
		response.data = responseFromService.data;
		response.status = response.data ? 200 : 404; 
		res.locals.response = response;
		next();
	} catch (error) {
		next(error);
		console.log('ERROR-productsController-read: ', error);
	}
}

module.exports.findById = async (req, res, next) => {
  const response = { status: 500, data: null };
	try {
		const data = req.params;
		const responseFromService = await ProductService.findById(data);
		response.data = responseFromService.data;
		response.status = response.data ? 200 : 404;  
		res.locals.response = response;
		next();
	} catch (error) {
		console.log('ERROR-productController-findById');
		next(error);
	}
}

module.exports.create = async (req, res, next) => {
	const response = { status: 500, data: null };
	const data = req.body;
	try {
		const responseFromService = await ProductService.create(data);
		response.data = responseFromService.data;
		response.status = 201;
		res.locals.response = response;
		next();
	} catch (error) {
		console.log('ERROR-productController-create: ', error);
		next(error);
	}
}

module.exports.destroy = async (req, res, next) => {
	const response = { status: 500, data: null };
	try {
		const dataParams = req.params;
		const dataQuery = req.query;
		const data = { ...dataQuery, ...dataParams};
		const responseFromService = await ProductService.destroy(data);
		response.data = responseFromService.data;
		response.status = 200;
		res.locals.response = response;
		next();
	} catch (error) {
		console.log('ERROR-productController-delete: ', error);
		next(error);
	}
}

module.exports.restore = async (req, res, next) => {
	const response = { status: 500, data: null };
	try {
		const data = req.params;
		const responseFromService = await ProductService.restore(data);
		response.data = responseFromService.data;
		response.status = 200;
		res.locals.response = response;
		next();
	} catch (error) {
		console.log('ERROR-productController-restore: ', error);
		next(error);
	}
}