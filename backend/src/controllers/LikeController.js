const Dev = require('../models/Dev');

module.exports = {
   async store(req, res) {

        const { user } = req.headers; // pega o param do headers
        const { devId } = req.params; // pega o param da url

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({error: "Dev not exists"}); //  Bad request, os 400 são que o usuário informou algo de errado
        }

        if (targetDev.likes.includes(loggedDev._id)){
            console.log(" --------user----- ",user);
            console.log(" --------devId----- ",devId);
            
            
             const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];
            
            if ( loggedSocket ) {
                req.io.to(loggedSocket).emit('match', targetDev);
            }

            if ( targetSocket ) {
                req.io.to(targetSocket).emit('match', loggedDev);
            }

        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();
        
        return res.json(loggedDev);
    }
};