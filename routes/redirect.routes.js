const {Router}=require('express')
const router=Router();
const Link=require('../models/Link');
router.get('/:code', async (req, res)=>{
    try {
        const link=await Link.findOne({code: req.params.code});
        if(link){
            link.clicks++;
            await link.save();
            return res.redirect(link.from)
        }
        res.status(404).json('link not found')
    } catch (e) {res.status(500).json({message: `error ${e}`})}
})
module.exports=router