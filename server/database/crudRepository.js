
module.exports.findAndCountAll= async (data) => {
    const responseObj = { status: false };
    try {
        const object = await data.model.findAndCountAll(data.query)
        responseObj.result = object;
        responseObj.status = true;
    } catch(error) {
        responseObj.error = error;
        console.log('ERROR-crudRepository-findAndCountAll: ', error);
    }
    return responseObj;
};

module.exports.findById = async (data) => {
    const responseObj = { status: false };
    try {
        const object = await data.model.findOne({ where: { id: data.id }})
        responseObj.result = object;
        responseObj.status = true;
    } catch(error) {
        responseObj.error = error;
        console.log('ERROR-crudRepository-findById: ', error);
    }
    return responseObj;
};

module.exports.create = async (data) => {
    const responseObj = { status: false };
    try {
        const object = data.model.build(data.data, { raw: true });
        await object.validate();
        await object.save();
        responseObj.result = object;
        responseObj.status = true;
    } catch(error) {
        responseObj.error = error.errors;
        console.error(error.errors)
        console.log('ERROR-crudRepository-save: ', error);
        throw new Error(error.errors)
    }
    return responseObj;
};