const { z } = require("zod");

const phoneRegex = /^[+0-9\s()-]{7,30}$/;
const cnicRegex = /^(\d{5}-?\d{7}-?\d{1})$/;
const ntnRegex = /^[A-Za-z0-9-]{5,30}$/;

const membershipSchema = z.object({
  firstName: z.string().trim().min(2).max(100),
  lastName: z.string().trim().min(2).max(100),
  cnic: z.string().trim().regex(cnicRegex, "Invalid CNIC format"),
  ntn: z.string().trim().regex(ntnRegex, "Invalid NTN format"),
  organizationName: z.string().trim().min(2).max(180),
  phone: z.string().trim().regex(phoneRegex, "Invalid phone number"),
  email: z.string().trim().email().max(180),
  officeAddress: z.string().trim().min(10).max(2000)
});

const complaintSchema = z.object({
  fullName: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().regex(phoneRegex, "Invalid phone number"),
  subject: z.string().trim().min(3).max(220),
  message: z.string().trim().min(10).max(5000)
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().regex(phoneRegex, "Invalid phone number"),
  message: z.string().trim().min(10).max(3000)
});

module.exports = {
  contactSchema,
  complaintSchema,
  membershipSchema
};
