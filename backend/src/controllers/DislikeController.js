const Dev = require('../models/Dev');

module.exports = {
   async store(req, res) {
        const { user } = req.headers; // pega o param do headers
        const { devId } = req.params; // pega o param da url

        const loggedDev = await Dev.findById(user);
        const TargetDev = await Dev.findById(devId);

        if (!TargetDev) {
            return res.status(400).json({error: "Dev not exists"}); //  Bad request, os 400 são que o usuário informou algo de errado
        }

        loggedDev.dislikes.push(TargetDev._id);

        await loggedDev.save();
        
        return res.json(loggedDev);
    }
};