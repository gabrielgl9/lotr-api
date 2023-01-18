import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().min(3).max(20).required(),
  race: yup.string().min(3).max(20).required(),
});
