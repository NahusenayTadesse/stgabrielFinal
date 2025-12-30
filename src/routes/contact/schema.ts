import z from "zod/v4";

export const schema = z.object({

    name: z.string('Name is Required'),
    phone: z.coerce.string('Phone is required'),
    email: z.email('Email is required'),
    subject: z.string().optional(),
    message: z.string().optional(),
})