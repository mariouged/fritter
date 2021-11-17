import { ValidationError } from 'sequelize'
import { crudRepositoryException } from '../exceptions/crudRepositoryException';
import { validationErrorException } from '../exceptions/validationErrorException';

module.exports.findAndCountAll= async (data) => {
    const response = { data: null };
    try {
        const object = await data.model.findAndCountAll(data.query)
        response.data = object;
        return response;
    } catch(error) {
        error.name = 'crudRepository-findAndCountAll';
        throw new crudRepositoryException (error);
    }
};

module.exports.findById = async (data) => {
    const response = { data: null };
    try {
        const object = await data.model.findOne({ where: { id: data.id }})
        response.data = object;
        return response;
    } catch(error) {
        error.name = 'crudRepository-findById';
        throw new crudRepositoryException (error);
    }
};

module.exports.create = async (data) => {
    const response = { data: null };
    try {
        const object = data.model.build(data.data, { raw: true });
        await object.validate(); 
        await object.save();
        response.data = object;
        return response;
    } catch(error) {
        if (error instanceof ValidationError) {
            throw new validationErrorException(error);
        }
        error.name = 'crudRepository-save';
        throw new crudRepositoryException (error);
    }
};

module.exports.destroy = async (data) => {
    const response = { data: null };
    console.log(data)
    try {
        const deletedRows = await data.model.destroy({
            where: { id: data.id },
            force: data.force 
        });
        response.data = { deletedRows, force: data.force };
        return response;
    } catch(error) {
        error.name = 'crudRepository-delete';
        throw new crudRepositoryException (error);
    }
};

module.exports.restore = async (data) => {
    const response = { data: null };
    console.log(data)
    try {
        const restoredRows = await data.model.restore({
            where: { id: data.id },
        });
        response.data = { restoredRows };
        return response;
    } catch(error) {
        error.name = 'crudRepository-restore';
        throw new crudRepositoryException (error);
    }
};