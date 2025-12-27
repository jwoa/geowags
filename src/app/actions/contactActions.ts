"use server";

import { sendContactEmail } from "@/lib/email";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactFormResult = {
  success: boolean;
  error?: string;
};

export async function submitContactForm(data: ContactFormData): Promise<ContactFormResult> {
  try {
    const validatedFields = contactFormSchema.safeParse(data);

    if (!validatedFields.success) {
      return { success: false, error: "Invalid form data" };
    }

    const result = await sendContactEmail(validatedFields.data);

    if (!result.success) {
      return { success: false, error: result.error || "Failed to send message" };
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
