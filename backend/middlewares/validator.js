import {createHmac} from "crypto";
import { compare } from "bcryptjs";
import Joi from "joi";

export function hmacProcess(value, key) {
    const result = createHmac('sha256', key).update(value).digest('hex');
    return result;
}

export function doHashValidation(value, hashedValue){
    const result = compare(value, hashedValue);
    return result;
}


export const changePasswordSchema = Joi.object({
    newPassword: Joi.string().required(),
    oldPassword: Joi.string().required(),
});

export const acceptFPCodeSchema = Joi.object({
	email: Joi.string()
		.min(6)
		.max(60)
		.required()
		.email({
			tlds: { allow: ['com', 'net'] },
		}),
	providedCode: Joi.number().required(),
	newPassword: Joi.string()
		.required(),
});