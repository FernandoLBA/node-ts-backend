import { Blog } from "../interfaces";
import { BlogModel } from "../models";

export const createBlogService = async (blog: Blog) => {
  const response = await BlogModel.create(blog);

  return response;
};

export const getBlogsService = async () => {
  const response = await BlogModel.find({});

  return response;
};

export const getBlogService = async (_id: string) => {
  const response = await BlogModel.findById({ _id });

  return response;
};

export const updateBlogService = async (_id: string, body: Blog) => {
  const response = await BlogModel.findOneAndUpdate({ _id }, body, {
    // makes it return the already updated object
    new: true,
  });

  return response;
};

export const deleteBlogService = async (_id: string) => {
  const response = await BlogModel.findOneAndDelete({ _id });

  return response;
};
