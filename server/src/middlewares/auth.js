//Handle auth middleware for all types of Https requests

//MIDDLEWARE {diff between app.use and app.all}
 const adminAuth=(req,res,next)=>{
    const token ='xyz1';
    const isAdminAuthorized =token==='xyz';
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request")
    }else{
        next();
    }
}

//User Auth

const userAuth =(req,res,next)=>{
    const token ="!23";
    const isuserAuthorized =token ==='!23';
    if(!isuserAuthorized){
        res.status(401).message("Unauthorized user...")
    }
    else{
        next();
    }
}

module.exports ={
    adminAuth,
    userAuth
}