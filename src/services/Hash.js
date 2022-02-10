import bcrypt from 'bcryptjs';

class Hash{
    hashPassword = async (password) => {
        try{      
            return await bcrypt.hash(password, 10);
        }catch(error){
            console.log(error);
            return {error: 'Error on user creation'};
        }
    }

    comparePassword = async (password, hashedPassword, callback) => {
        try{
            return await bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                if(err) return callback(err);
                callback(null, isMatch);
            });
        }catch(error){
            console.log(error);
            return {error: 'Error on password validation'};
        } 
    }
}

export default new Hash();