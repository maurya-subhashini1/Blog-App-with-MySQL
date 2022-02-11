const knex=require("../module/db")
const {sign} = require("jsonwebtoken")
const cookie=require("cookie-parser")

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")




Ragistation=(req,res)=>{
    if (!req.body.FirstName || !req.body.lastName || !req.body.Password || !req.body.Email) {
        res.status(500)
        return res.json({
            message: "failed all required"
        })
    }else{
        {const user={ 
                FirstName:req.body.FirstName,
                lastName :req.body.lastName,
                Password:req.body.Password,
                Email:req.body.Email
            }
            knex("Users").insert(user)
            
            .then((data)=>{
                knex.select('*').from('Users').where('id',data)
                .then((post)=>{
            
                    res.send({ message:"User Registered succesfully",data:post})
                    console.log(data);
        
        
                }).catch((err)=>{
                    res.send({
                        message:'Email already exits'
                    })
                })
                
            }).catch((err)=>{
                console.log(err);
                res.send({error: 'this data already inserted',error:err})
        
                
            });}
    
}
}

Login=(req,res)=>{
    knex.select('*').from('Users').where('Password','=',req.body.Password,'Email','=',req.body.Email)
    .then((data)=>{
        var token = jwt.sign({id:data[0].id},'subhashini',{expiresIn:'1h'})
        res.cookie("user",token)


        res.send({message:"Login successfully",data:data,token:token})
        }).catch((err)=>{
                console.log(err);
                res.send({message:"Infromition some worng",error:err})   
        });

    }

get_Registretion=(req,res)=>{
    knex.select("*").from("Users")
    .then((data)=>{
            res.send({message:"Get data successfully",data:data})
            console.log(data);
        
    }).catch((err)=>{
            console.log(err);
            res.send({error:"Not Get data"})   
    });
    }

logOut=(req,res)=>{
    res.clearCookie('user');
    res.json({message:"LogOut successfully"})
}


module.exports={Ragistation,get_Registretion,Login,logOut}