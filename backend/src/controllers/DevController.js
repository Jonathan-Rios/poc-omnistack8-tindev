const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res){
        
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [   // Como queremos os 3 filtros funcionando como AND e não OR, usamos o $and
                { _id: {$ne: user } }, // traga todos os usuários que o ID seja diferente de "user" ( ne = NotEqual )
                { _id: {$nin: loggedDev.likes } },// traga todos os usuários que o ID não esteja dentro de uma lista  ( nin = NotIN )
                { _id: {$nin: loggedDev.dislikes } },// traga todos os usuários que o ID não esteja dentro de uma lista  ( nin = NotIN )
            ],
        })

        return res.json(users);
    },

    async store(req, res){
        
        const { username } = req.body;

        const userExist = await Dev.findOne({ user: username });

        if ( userExist ) {
            return res.json(userExist);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name, 
            user: username, 
            bio, 
            avatar
        });

        return res.json( dev );
    }
};