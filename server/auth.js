import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const isCustomAuth = token.length < 500;

    if(token){
      jwt.verify(token, secret, (err, valid)=>{
        if(err){
          res.status(401).send(err)
        }
        else{
          next();
        }
      })
    }

    // let decodedData;

    // if (token && isCustomAuth) {      
    //   decodedData = jwt.verify(token, secret);

    //   req.userId = decodedData?.id;
    // } else {
    //   decodedData = jwt.decode(token);

    //   req.userId = decodedData?.sub;
    // }    

    // next();
  } catch (error) {
    res.send(error)
  }
};

export default auth;