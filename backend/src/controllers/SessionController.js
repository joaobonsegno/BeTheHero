const connection = require('../database/connection');

module.exports = {
    async create(req, res){

        const { id } = req.body;

        const ong = await connection('ongs').where('id', id).select('name').first();

        if (ong){
            res.send(ong);
        }else{
            res.status(400).send( { error: 'No ONG found with this ID.' })
        }

    }
}