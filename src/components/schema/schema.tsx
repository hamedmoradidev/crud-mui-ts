import * as yup from "yup";
const schema: any = yup.object().shape({
    userId: yup
        .number()
        .typeError("Must enter a valid number")
        .required("This field is required"),
    id: yup
        .number()
        .typeError("Must enter a valid number")
        .required("This field is required"),
    title: yup
        .string()
        .min(3, "minimum 3 characters")
        .required("This field is required"),
    body: yup
        .string()
        .min(10, "minimum 10 characters")
        .required("This field is required"),
});
export default schema