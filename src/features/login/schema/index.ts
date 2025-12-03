import z from "zod";

const LOGIN_CONSTANTS = {
  PASSWORD_MIN_LENGTH: 6,
};

export const loginCredentialsSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(
      LOGIN_CONSTANTS.PASSWORD_MIN_LENGTH,
      "Password must be at least 6 characters long"
    ),
});

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
