import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().min(3).max(50).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(18).required(),
});
