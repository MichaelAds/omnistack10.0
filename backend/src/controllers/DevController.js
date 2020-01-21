const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {

    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        // pegar apenas dados que irei usar 
        const { github_userName, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_userName });

        if (!dev) {
            const apiResp = await axios.get(`https://api.github.com/users/${github_userName}`);
    
            const { name = login, avatar_url, bio } = apiResp.data;
        
            const techsArray = parseStringAsArray(techs);
        
        
            const location = {type: 'Point', coordinates: [ latitude, longitude ]}
        
            const dev = await Dev.create({
                name,
                github_userName,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
            
        }
        
        return res.json(dev)
        
    },

    async update(req, res) {

        const { name, techs } = req.body;
        const id = req.params.id;

        const dev = await Dev.findOneAndUpdate(id, {
            name,
            techs,
        })

        return res.json(dev)
    },

    async delete(req, res) {
        const id = req.params.id;
        const dev = await Dev.findOneAndDelete(id)

        return res.json(dev)
    }
}