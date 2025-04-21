import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createBlogInput = z.object({
  title: z.string().min(3),
  content:z.string().min(3),
});

export const updateBlogInput = z.object({
  title: z.string().min(3),
  content:z.string().min(3),
  id:z.number().gt(0)
});


export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogType = z.infer<typeof createBlogInput>;
export type UpdateBlogType = z.infer<typeof updateBlogInput>;