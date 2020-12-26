const connection = require('../database/connection');
const connect = connection('ongs');
const crypro = require('crypto');

module.exports = {
    async create(req, res){
        const { name, email, whatsapp, city, uf } = req.body;

        const id = crypro.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return res.json({ id });
    },

    async list(req, res){
        const ongs = await connection('ongs').select('*');

        return res.json(ongs);
    },

    async delete(req, res){
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        if (id === ong_id){
            const ong = await connection('ongs')
            .where('id', ong_id)
            .select('id')
            .first();

            if (ong){
                await connection('ongs').where('id', ong_id).delete();
            }

            res.status(204).send();
        }else{
            res.status(401).send({ error: 'Operation not permitted.' })
        }
        
    }
}