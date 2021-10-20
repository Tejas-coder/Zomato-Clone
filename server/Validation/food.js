import joi from "joi";

export const ValidateRestaurantId = (resId) => {
    const Schema = joi.object({
        id: joi.string().required()
    });
    return Schema.validateAsync(resId);
};

export const ValidateCategory = (catagory) => {
    const Schema = joi.object({
        id: joi.string().required()
    });
    return Schema.validateAsync(catagory);
};