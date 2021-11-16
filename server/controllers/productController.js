const productService = require('../services/productServices');

module.exports.read = async function (req, res) {
	const responseObj = {
			status: 500,
			message: 'Internal server error'
	}
	const { name, description, price, offset, limit, distinct } = req.query;
	try {
			const data = {
					name,
					description,
					price,
					offset,
					limit,
					distinct
			};
			const responseFromService = await productService.read(data);
			if (responseFromService.status) {
					if (responseFromService.result) {
							responseObj.status = 200;
							responseObj.data = responseFromService.result;
							responseObj.message = "Products fetched successfully";
					} else {
							responseObj.message = "No products found";
							responseObj.status = 404;
					}
			};
	} catch (error) {
			responseObj.error = error;
			console.log('ERROR-productsController-read: ', error);
	}
	return res.status(responseObj.status).send(responseObj);
}

module.exports.findById = async function (req, res) {
  const responseObj = {
		status: 500,
		message: 'Internal server error'
	};
	try {
		const productId = req.params.id;
		const responseFromService = await productService.findById(productId);
		if (responseFromService.status) {
			if (responseFromService.result) {
				responseObj.status = 200;
				responseObj.data = responseFromService.result;
				responseObj.message = 'Product fetched successfully';
			} else {
				responseObj.status = 404;
				responseObj.data = responseFromService.result;
				responseObj.message = 'Product not found';
			}   
		}
	} catch (error) {
		responseObj.error = error;
		console.log('ERROR-productController-findById');
	}
	return res.status(responseObj.status).send(responseObj);
 }


module.exports.create = async function (req, res) {
	const responseObj = {
		status: 500,
		message: 'Internal server error'
	}
	const data = req.body;
	try {
		const responseFromService = await productService.create(data);
		if (responseFromService.status) {
			if (responseFromService.result){
					responseObj.status = 201;
					responseObj.data = responseFromService.result;
					responseObj.message = "Product created successfully";
			}
		} else {
			responseObj.error = responseFromService.error;
		}
	} catch (error) {
		responseObj.error = error;
		console.log('ERROR-productController-create: ', error);
	}
	return res.status(responseObj.status).send(responseObj);
}
