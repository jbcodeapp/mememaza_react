import { schema } from "normalizr";

export const user = new schema.Entity("users");

export const banner = new schema.Entity("banners");

export const category = new schema.Entity("categories");

export const like = new schema.Entity("likes", {
  liker: user,
});

export const share = new schema.Entity("shares", {
  sharer: user,
});

export const viewer = new schema.Entity("shares", {
  sharer: user,
});

export const comment = new schema.Entity("comments", {
  commenter: user,
});

export const post = new schema.Entity("posts", {
  comments: [comment],
  likes: [like],
  shares: [share],
  category,
});

export const reel = new schema.Entity("reels", {
  comments: [comment],
  likes: [like],
  shares: [share],
  category,
});

export const story = new schema.Entity("stories", {
  comments: [comment],
  likes: [like],
  shares: [share],
});

export const homePageResponseSchema = new schema.Object({
  categories: [category],
  post: [post],
  reels: [reel],
  stories: [story],
  banner: [banner],
});
