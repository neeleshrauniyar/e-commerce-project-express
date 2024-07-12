const jwt= require('jsonwebtoken')
const auth= (req, res, next) =>{
    const token= req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken)=>{
            if(err){
                res.send("Please login first")
            }else{
                next()
            }
        })
    }else{
        res.send("Please login first")
    }
}