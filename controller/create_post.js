const knex=require("../module/db")
const jwt=require("jsonwebtoken")
// const { verifyToken } = require("../Middlewere/auth")

create_Posts=(req,res)=>{
    const user={
        user_id:res.tokendata.id,
        Tittle:req.body.Tittle,
        description:req.body.description
    }
    // console.log(user)
    knex("Posts").insert(user)
    .then((data)=>{
        knex.select("*").from('Posts').where("Post_id",data)
        .then((postData)=>{
            res.json({
                message:'Create New Post',
                Post:postData
            })
        }).catch((err)=>{
            res.json({message:'falield post',error:err})
        })
    }).catch((err)=>{
        res.send({Error:"something is wrong in post",error:err})
    })
}

see_All_Posts=(req,res)=>{
    knex.select("*").from("Posts")
    .then((data)=>{
            res.send({message:"Get data successfully",data:data})
            console.log(data);
        
    }).catch((err)=>{
            console.log(err);
            res.send({error:"Not Get data"})   
    });
    }





module.exports={create_Posts,see_All_Posts}