import { Op } from "sequelize";
import Product from '../models/database/product';
import crudRepository from '../database/crudRepository';
import { ProductIdShouldProvided } from '../exceptions/productIdShouldProvided';
import { validate as uuidValidate } from 'uuid';
import { ProductIdShouldUUID } from "../exceptions/productIdShouldUUID";
import { crudRepositoryException } from "../exceptions/crudRepositoryException";
import { validationErrorException } from "../exceptions/validationErrorException";

const OFFSET = 0;
const LIMIT = 10;
const DISTINCT = false;
const PARANOID = true; // Not retrieve soft-deleted records

module.exports.read = async function (input) {
	const response = { data: null };
	const { name, description, price, offset, limit, distinct, deleted} = input;
	try {
		const data = {
			model: Product,
			query : {
					where : {},
					offset: !isNaN(offset) ? +offset : OFFSET,
					limit: !isNaN(limit) ? +limit : LIMIT,
					distinct: distinct ?? DISTINCT,
					paranoid: PARANOID, 
			},
		};

		if (name) data.query.where['name'] = {[Op.like]: `%${name}%`}
		if (description) data.query.where['description'] = {[Op.like]: `%${description}%`}
		if (price) data.query.where['price'] = {[Op.like]: `%${price}%`}
		// Retrieve soft-deleted records if param deleted is true
		if (!!deleted && deleted === 'true') data.query.paranoid = false;

		const responseFromDatabase = await crudRepository.findAndCountAll(data);
		response.data = responseFromDatabase.data;
		return response;
	} catch (error) {
		if(error instanceof crudRepositoryException){
			throw error;
		}
		throw new Error (error);
	}
};

module.exports.findById = async function (input) {
	const response = { data: null };
	const { id } = input;
	if (!id) {
		throw new ProductIdShouldProvided();
	}
	if(!uuidValidate(id)) {
		throw new ProductIdShouldUUID();
	}
	try {
		const data = {
				model: Product,
				id: id
		};
		const responseFromDataBase = await crudRepository.findById(data);
		response.data = responseFromDataBase.data;
		return response;
	} catch (error) {
		if(error instanceof crudRepositoryException){
			throw error;
		}
		throw new Error (error);
	}
};

module.exports.create = async function (input) {
	const response = { data: null };
	const data = {
		model: Product,
		data: input
	};
	try {
		const responseFromDatabase = await crudRepository.create(data);
		response.data = responseFromDatabase.data;
		return response;
	} catch (error) {
		if(error instanceof crudRepositoryException){
			throw error;
		}
		if(error instanceof validationErrorException){
			throw error;
		}
		throw new Error (error);
	}
};

module.exports.destroy = async function (input) {
  const response = { data: null };
	const { id } = input;
	if (!id) {
		throw new ProductIdShouldProvided();
	}
	if(!uuidValidate(id)) {
		throw new ProductIdShouldUUID();
	}
	const data = {
		model: Product,
		id: input.id,
		force: false,
	};

	if (!!input.force && input.force === 'true') data.force = true;

	try {
		const responseFromDatabase = await crudRepository.destroy(data);
		response.data = responseFromDatabase.data;
		return response;
	} catch (error) {
		if(error instanceof crudRepositoryException){
			throw error;
		}
		throw new Error (error);
	}
}

module.exports.restore = async function (input) {
  const response = { data: null };
	const { id } = input;
	if (!id) {
		throw new ProductIdShouldProvided();
	}
	if(!uuidValidate(id)) {
		throw new ProductIdShouldUUID();
	}
	const data = {
		model: Product,
		id: input.id,
	};

	try {
		const responseFromDatabase = await crudRepository.restore(data);
		response.data = responseFromDatabase.data;
		return response;
	} catch (error) {
		if(error instanceof crudRepositoryException){
			throw error;
		}
		throw new Error (error);
	}
}
