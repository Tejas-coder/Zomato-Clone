import joi from "joi";

export const ValidateSignUp = (userData) => {
    const Schema = joi.object({
        fullname: joi.string().required().min(3),
        email: joi.string().email(),
        password: joi.string().min(5),
        address: joi.array().items(joi.object({detail: joi.string(), for: joi.string()})),
        phoneNumber: joi.number().min(10)
    });
    return Schema.validateAsync(userData);
};



export const ValidateSignIn = (userData) => {
    const Schema = joi.object({
        email: joi.string().email(),
        password: joi.string().min(5),
    });
    return Schema.validateAsync(userData);
};

