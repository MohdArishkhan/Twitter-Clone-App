import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPost, getUserPosts, likeUnlikePost } from '../controllers/postcontrollers.js';
const router =express.Router();
router.get("/all",protectRoute,getAllPosts)
router.post("/create",protectRoute,createPost);
 router.post("/like/:id",protectRoute,likeUnlikePost);
 router.get("/likes/:id",protectRoute,getLikedPost);
 router.get("/following",protectRoute,getFollowingPosts);
 router.get("/user/:username",protectRoute,getUserPosts);
 router.post("/comment/:id",protectRoute,commentOnPost);
 router.delete("/:id",protectRoute,deletePost);

export default router;