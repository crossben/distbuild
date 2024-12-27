"use strict";
// import mongoose from "mongoose";
// import { Cart } from "../schemas/cart.schema";
// import { Post } from "../schemas/post.schema";
// export const getCart = async (owner: mongoose.Schema.Types.ObjectId) => {
//     try {
//         const cart = await Cart.findOne({ owner });
//         if (cart) {
//             return cart;
//         } else {
//             throw console.error('error walahi');
//         }
//     } catch (error) {
//         console.error('Error fetching cart:', error);
//     }
// };
// export const createCart = async (owner: mongoose.Schema.Types.ObjectId, postId: mongoose.ObjectId, quantity: number) => {
//     try {
//         const cart = await Cart.findOne({ owner });
//         const post = await Post.findOne({ _id: postId });
//         if (!post) {
//             return "post not found";
//         }
//         const price = post.price;
//         const name = post.title;
//         //If cart already exists for user,
//         if (cart) {
//             const postIndex = cart.Posts.findIndex((post) => post._id == postId);
//             //check if product exists or not
//             if (postIndex > -1) {
//                 const product = cart.Posts[postIndex];
//                 product.quantity += quantity;
//                 cart.bill = cart.Posts.reduce((acc, curr) => {
//                     return acc + curr.quantity * curr.price;
//                 }, 0)
//                 cart.Posts[postIndex] = product;
//                 await cart.save();
//                 return cart;
//             } else {
//                 cart.Posts.push({ postId, name, quantity, price });
//                 cart.bill = cart.Posts.reduce((acc, curr) => {
//                     return acc + curr.quantity * curr.price;
//                 }, 0)
//                 await cart.save();
//                 return cart;
//             }
//         } else {
//             //no cart exists, create one
//             const newCart = await Cart.create({
//                 owner,
//                 posts: [{ postId, name, quantity, price }],
//                 bill: quantity * price,
//             });
//             return newCart;
//         }
//     } catch (error) {
//         console.log(error);
//         return "something went wrong";
//     }
// };
// export const deleteCartPost = async (PostId: mongoose.Schema.Types.ObjectId, owner: mongoose.Schema.Types.ObjectId) => {
//     try {
//         let cart = await Cart.findOne({ owner });
//         if (!cart) {
//             return "Cart not found";
//         }
//         const PostIndex = cart.Posts.findIndex((Post) => Post.PostId == PostId);
//         if (PostIndex > -1) {
//             const Post = cart.Posts[PostIndex];
//             cart.bill -= Post.quantity * Post.price;
//             if (cart.bill < 0) {
//                 cart.bill = 0
//             }
//             cart.Posts.splice(PostIndex, 1);
//             cart.bill = cart.Posts.reduce((acc, curr) => {
//                 return acc + curr.quantity * curr.price;
//             }, 0)
//             cart = await cart.save();
//             return cart;
//         } else {
//             return "Post not found";
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };
//# sourceMappingURL=cart.service.js.map