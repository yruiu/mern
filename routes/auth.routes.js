const {Router} =require('express')
const jwt=require('jsonwebtoken')
const config=require('config')
const bcrypt=require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User=require('../models/User');
const router=Router();
router.use(check('email', 'error of email').isEmail(), check('password', 'error of password').exists());
// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'error of email').isEmail(),
        check('password', 'error of passw').isLength({min:6})
    ],
    async (req, res)=>{
    try{
        console.log('BODY',req.body)
        const errors=validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({
                errors: errors.array(),
                message: "Error of data on registartion"
            })
        const {email, password}=req.body;
        const candidate=await User.findOne({email});
        if(candidate){
            return res.status(400).json({message:"All ready user"})
        }
        const hashedPassword= await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});
        await user.save();
        res.status(201).json({message: "all good"})
    }catch (e){res.status(500).json({message: `error ${e}`})}
})

// /api/auth/login
router.post('/login',[
    check('email', 'error of email').isEmail(),
        check('password', 'error of password').exists()
    ],async (req, res)=>{
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: 'Error of data on login'});
        }
        const {email, password}=req.body;
        const user=await User.findOne({ email });
        if(!user){
            return res.status(400).json({errors: errors.array(), message:"Error of data on login"})
        }
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Error of password"})
        }
        const token=jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )
        res.json({token, userId: user.id})
    } catch (e) {res.status(500).json({message: `error ${e}`})}
})
module.exports=router;