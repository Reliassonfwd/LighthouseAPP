import * as yup from "yup";

export const paymentDetailsSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .matches(
      /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
      "Card number is not valid"
    )
    .required("Card number is required"),
  expiryDate: yup
    .date()
    .min(new Date(), "Expiry date is not valid")
    .required("Expiry date is required"),
  cvv: yup
    .string()
    .matches(/^[0-9]{3}$/, "CVV is not valid")
    .required("CVV is required"),
  cardHolderName: yup.string().required("Card holder name is required"),
  fullName: yup.string().required("Full name is required"),
  contactNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Contact number is not valid")
    .required("Contact number is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  numberOfPeople: yup
    .number()
    .min(1, "Number of people must be at least 1")
    .required("Number of people is required"),
});
