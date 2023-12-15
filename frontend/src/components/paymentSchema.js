import * as yup from "yup";

// Define the Yup schema for payment details validation
export const paymentDetailsSchema = yup.object().shape({
  // Card Number
  cardNumber: yup
    .string()
    .matches(
      /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
      "Card number is not valid"
    )
    .required("Card number is required"),

  // Expiry Date
  expiryDate: yup
    .date()
    .min(new Date(), "Expiry date is not valid")
    .required("Expiry date is required"),

  // CVV
  cvv: yup
    .string()
    .matches(/^[0-9]{3}$/, "CVV is not valid")
    .required("CVV is required"),

  // Card Holder Name
  cardHolderName: yup.string().required("Card holder name is required"),

  // Full Name
  fullName: yup.string().required("Full name is required"),

  // Contact Number
  contactNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Contact number is not valid")
    .required("Contact number is required"),

  // Email
  email: yup.string().email("Email is not valid").required("Email is required"),

  // Number Of People
  numberOfPeople: yup
    .number()
    .min(1, "Number of people must be at least 1")
    .required("Number of people is required"),
});

// Export:
// - Exports the paymentDetailsSchema for usage in form validation.
export default paymentDetailsSchema;
