const { string } = require('@hapi/joi')
const Joi = require('@hapi/joi')


//set validator body
const ValidateBody = (schema) => {
    return (req, res, next) => {
        const ValidatorResult = schema.validate(req.body)
        if (ValidatorResult.error) {
            return res.status(404).json(ValidatorResult.error)

        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}
            req.value.body = ValidatorResult.value
            next()

        }
    }
}

//set validator for params
const ValidateParams = (schema, name) => {
    return (req, res, next) => {
        console.log('params ', req.params[name])
        const ValidatorResult = schema.validate({ param: req.params[name] })
        console.log('Result', ValidatorResult)

        if (ValidatorResult.error) {
            return res.status(404).json(
                ValidatorResult.error
            )
        } else {
            console.log('1', req.value)
            if (!req.value) req.value = {}
            console.log('2', req.value.params)
            if (!req.value['params']) req.value.params = {}
            console.log('3', req.value)

            req.value.params[name] = req.params[name]
            console.log('req value', req.value);

            next()
        }
    }
}
const schema = {
    //validator params
    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    // User Validator
    userSchema: Joi.object().keys({
        firstName: Joi.string().min(2).max(255).required(),
        lastName: Joi.string().min(2).max(255).required(),
        userDateOfBirth: Joi.number().integer().min(1960).max(2021),
        accommodation: Joi.string().max(255),
        userEmail: Joi.string().email().required(),
        userPassword: Joi.string().min(6).max(24).regex(/^[0-9a-zA-Z]+$/).required()
    }),
    userReplaceSchema: Joi.object().keys({
        firstName: Joi.string().min(2).max(255).required(),
        lastName: Joi.string().min(2).max(255).required(),
        userDateOfBirth: Joi.number().integer().min(1960).max(2021).required(),
        accommodation: Joi.string().max(255).required()
    }),
    userUpdateSchema: Joi.object().keys({
        firstName: Joi.string().min(2).max(255),
        lastName: Joi.string().min(2).max(255),
        userDateOfBirth: Joi.number().integer().min(1960).max(2021),
        accommodation: Joi.string().max(255)
    }),
    userLogin: Joi.object().keys({
        userEmail: Joi.string().email().required(),
        userPassword: Joi.string().min(6).max(24).regex(/^[0-9a-zA-Z]+$/).required()
    }),
    userChangePassword: Joi.object().keys({
        userPassword: Joi.string().min(6).max(24).regex(/^[0-9a-zA-Z]+$/).required()
    }),
    deckSchema: Joi.object().keys({
        name: Joi.string().max(255).required(),
        description: Joi.string().max(255),
        position: Joi.string().max(255).required()

    }),
    newdeckSchema: Joi.object().keys({
        name: Joi.string().max(255).required(),
        description: Joi.string().max(255),
        position: Joi.string().max(255).required(),
        owner: Joi.string().regex(/^[0-9a-zA-Z]{24}$/).required()

    }),
    optiondeckSchema: Joi.object().keys({
        name: Joi.string().max(255),
        description: Joi.string().max(255),
        position: Joi.string().max(255),
        owner: Joi.string().regex(/^[0-9a-zA-Z]{24}$/)

    })

}

module.exports = {
    ValidateBody,
    ValidateParams,
    schema
}