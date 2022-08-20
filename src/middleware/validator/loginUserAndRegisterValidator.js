import yup from 'yup'
export const loginUserValidator = async (request, response, next) => {
    try {
        const schema = yup.object().shape({email: yup.string().email().required(), password: yup.string().required().min(8)})
        await schema.validate(request.body, {abortEarly: false})
        next()
    } catch (error) {
        return response.status(400).json({
                error: `empty values ${
                error.message
            }`
        })
    }
}

export const UservalidatorParams = async (request, response, next) => {
    try {
        if (!request.page && !request.id) {
            await yup.object().shape({userid: yup.number().required(`invalid params`)}).validate(request.params, {abortEarly: false})
            next()
        }

        if (!request.page) {
            await yup.object().shape({userid: yup.number().required(`invalid params`), id: yup.number().required(`invalid params`)}).validate(request.params, {abortEarly: false})
            next()
        }
        if (!request.id) {
            await yup.object().shape({userid: yup.number().required(`invalid params`), page: yup.number().required()}).validate(request.params, {abortEarly: false})
            next()
        }

    } catch (error) {
        return response.status(400).json({error: `empty values ${
                error.message
            }`})
    }
}

export const registerUserValidator = async (request, response, next) => {
    try {
        const schema = yup.object().shape({name: yup.string().required().min(8), email: yup.string().email().required(), password: yup.string().required().min(8)})
        await schema.validate(request.body, {abortEarly: false})
        next()
    } catch (error) {
        return response.status(400).json({
                error: `empty values ${
                error.message
            }`
        })
    }
}
