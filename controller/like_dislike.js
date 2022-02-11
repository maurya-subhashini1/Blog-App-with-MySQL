const knex=require("../module/db")
const jwt=require("jsonwebtoken")
const { see_All_Posts } = require("./create_post")

Like=(req,res)=>{
    knex.select("*").from("Posts").where("Post_id","=",req.body.Post_id)
    .then((Postdata)=>{
        console.log(Postdata)
        if(Postdata.length===0){
            res.send({message:"post does'nt exgit"})
        }else{
            knex.select("*").from("like_dislike").where({User_id:res.tokendata.id,Post_id:req.body.Post_id})
            .then((likepostdata)=>{
                if(likepostdata.length>0){
                    res.send({message:"You already like/ dislike post"})

                }else{
                    const likeDislike={
                        User_id:res.tokendata.id,
                        Post_id:req.body.Post_id,
                        Like:req.body.Like,
                        Dislike:req.body.Dislike
                    }
                    knex("like_dislike").insert(likeDislike)
                    .then((data)=>{
                        res.json({succes:true,
                        status:200,
                        message:'liked added',
                        data:data})
                    })

                }
            })
}


    })
}



See_All_likeDislike=(req,res)=>{
    knex("like_dislike")
    .innerJoin("Posts","Posts.Post_id","like_dislike.Post_id")
    .innerJoin("Users","Users.id","like_dislike.User_id")
    .select('*').where("like_dislike.Post_id","=",req.params.Post_id)
    .then((getdata)=>{
        console.log(getdata)
        res.send({message:"See All like /Dislike",
    data:getdata})
    }).catch((err)=>{
        console.log(err)
        res.send({message:"there is error"})
    })
}
module.exports={Like,See_All_likeDislike}





































// Like=(req,res)=>{
//         knex.select("*").from("Posts").where("Post_id","=",req.body.Post_id)
//         .then((postdata)=>{
//             console.log(postdata)
//             if(data.length===0){
//                 res.json({message:"Post Don't Exits"})
//             }else{
//                 knex.select("*").from("like_dislike").where({User_id:req.tokendata.id,Post_id:req.body.Post_id})
//                 .then((likeposdata)=>{
//                     if(likeposdata.length<0){
//                         res.json({message:'You are already like/ dislike post'})
//                     }else{
                        // const likeDislike={
                        //             User_id:req.tokendata.id,
                        //             Post_id:req.body.Post_id,
                        //             Like:req.body.Like,
                        //             Dislike:req.body.Dislike
                        //         }
//                                 knex("like_dislike").insert(likeDislike)
//                                 .then((data)=>{
//                                     res.json({succes:true,
//                                         status:200,
//                                         message:'liked added',
//                                         data:data})
                                    
//                                 })

//                     }
//                 // }

//         }).catch((err)=>{
//             console.log(err)
//             res.json({message:"error"})


// module.exports={Like}






















