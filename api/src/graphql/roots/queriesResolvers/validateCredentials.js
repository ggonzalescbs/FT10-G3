const jwt = require('jsonwebtoken');

module.exports = {
    validateCredentials: async (_, args) =>{
        try{
            
            const authToken = args.headers.authtoken;
            const decoded = jwt.verify(authToken, "secret");
            let {authrole} = args.headers
            if(authrole){
                
                return true;
            }
            else return false;
        }catch{
            return false;
        }
    }
}