const express=require("express")
const router=express.Router()
const userdb=require('../modals/user.js')
const bcrypt=require('bcrypt')
const jwt = require("jsonwebtoken");

router.get('/recoverlogindetail/:email',async(req,res)=>{
    try{
    const data=await userdb.find({"email": `${req.params.email}`})
    res.json(data)
    }
    catch(err)
    {
        res.json({
            "Error":err
        })
    }
})

router.post("/login", (req, res) => {
    userdb.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              SECRET,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });



router.post('/signup',(req,res)=>{

    bcrypt.hash(req.body.password,10,async(err,hash)=>{
        if(err){
            return req.status(500).json({
                error:err
            })
        }
        else{
            const member=new userdb(
                {
                    name:req.body.name,
                    email:req.body.email,
                    password:hash
                })
            try
            {
               await member.save()
                res.send("Signup Successful")
            }
            catch(err)
            {
                res.status(404).send("error occured")
            }
        }
    })
        
})

router.delete('/:name',async(req,res)=>{
    try{
        const data=await userdb.deleteOne({"name":`${req.params.name}`})
        res.json(data)
    }
    catch(err){
       res.end("error occured")
    }
})
module.exports=router