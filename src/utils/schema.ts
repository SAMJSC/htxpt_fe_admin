import { LANG_BLOG, LANG_FRUIT, LANG_GARDEN, LANG_MESS } from "src/constants/convertLang";
import * as yup from "yup"

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const schema = yup.object({
    firstName: yup.string().required("Full Name is required"),
    email: yup.string().required("Email is required").email("This is don't email"),
    phone: yup.string().required("phone is required"),

}).required();

export const schemaLogin = yup.object({
    user_name: yup.string().required("User Name is required"),
    password: yup.string().required("Password is required"),
}).required();

export const schemaFruit = yup.object({
    category_name: yup.string().required(` ${LANG_FRUIT.FRUIT_NAME} ${LANG_MESS.REQUIRED} `),
    range_price_min: yup.string().required(`${LANG_FRUIT.RANGE_PRICE_MIN} ${LANG_MESS.REQUIRED} `),
    range_price_max: yup.string().required(`${LANG_FRUIT.RANGE_PRICE_MAX} ${LANG_MESS.REQUIRED} `),
    diameter_min: yup.string().required(`${LANG_FRUIT.DIMETER_MIN} ${LANG_MESS.REQUIRED} `),
    diameter_max: yup.string().required(`${LANG_FRUIT.DIMETER_MAX} ${LANG_MESS.REQUIRED} `),
    weight_min: yup.string().required(`${LANG_FRUIT.WEIGHT_MIN} ${LANG_MESS.REQUIRED} `),
    weight_max: yup.string().required(`${LANG_FRUIT.WEIGHT_MAX} ${LANG_MESS.REQUIRED} `),
}).required();

export const schemaBlog = yup.object({
    title: yup.string().required(`${LANG_BLOG.TITLE} ${LANG_MESS.REQUIRED}`),
    content: yup.string().required(`${LANG_BLOG.CONTENT} ${LANG_MESS.REQUIRED}`),
    shortDescription: yup.string().required(`${LANG_BLOG.DESCRIPTION} ${LANG_MESS.REQUIRED}`),

}).required();

export const schemaGarden = yup.object({
    first_name: yup.string().required(`${LANG_GARDEN.FIRST_NAME} ${LANG_MESS.REQUIRED}`),
    last_name: yup.string().required(`${LANG_GARDEN.LAST_NAME} ${LANG_MESS.REQUIRED}`),
    phone: yup.string().required(`${LANG_GARDEN.PHONE} ${LANG_MESS.REQUIRED}`).length(10, LANG_MESS.PHONE_VALIDATE),
    password: yup.string().required(`${LANG_GARDEN.PASS_WORD} ${LANG_MESS.REQUIRED}`),
    confirm_password: yup.string().required(`${LANG_GARDEN.CF_PASS_WORD} ${LANG_MESS.REQUIRED}`).oneOf([yup.ref('password'), ''], LANG_MESS.MES_CFPASS_MATCH),

}).required();