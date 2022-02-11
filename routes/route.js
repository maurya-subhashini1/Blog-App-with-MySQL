const express = require("express")
const {authentication}=require('../Middlewere/auth')
const router = express.Router()

const {Ragistation,get_Registretion,Login,} = require("../controller/app")
const { create_Posts, see_All_Posts }=require("../controller/create_post")
const {Like, See_All_likeDislike}=require("../controller/like_dislike")



router.post("/api/ragistation",Ragistation)
router.get("/api/",get_Registretion)
router.post("/api/login",Login)
router.get("/api/logout",logOut)


//create Post
router.post("/api/post_blog",authentication,create_Posts)
router.get("/api/get_posts",see_All_Posts)



//like dislike

router.post("/api/like",authentication,Like)
router.get("/api/likedislike/:Post_id",See_All_likeDislike)

module.exports = router;