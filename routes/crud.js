const express=require("express")
const router=express.Router()
const Dbcrud=require('../modals/notes')
router.get('/:name',async(req,res)=>{
    try{
    const data=await Dbcrud.find({"name": `${req.params.name}`})
    res.json(data)
    }
    catch(err)
    {
        res.json({
            "error":err
        })
    }
})

router.post('/:name',async(req,res)=>{
        const member=new Dbcrud(
            {
                name:req.params.name,
                title:req.body.title,
                discription:req.body.discription
            }
        )
        try
        {
         const a=await member.save()
        res.json(a)
        }
        catch(err)
        {
            res.status(404).send(err)
        }
})



router.patch('/:name/:id',async(req,res)=>{
    try
    {
        const data=await Dbcrud.findOne({"_id":`${req.params.id}`,"name":`${req.params.name}`})
        data.discription=req.body.discription||data.discription;
        data.title=req.body.title||data.title;
        const a=await data.save()
        res.json(a)
    }
    catch(err)
    {
       res.end(err)
    }
})
router.delete('/:name/:id',async(req,res)=>{
    try
    {
        const data=await Dbcrud.deleteOne({"_id":`${req.params.id}`,"name":`${req.params.name}`})
        res.json(data)
    }
    catch(err)
    {
       res.end("error occured")
    }
})
module.exports=router