const csv = require('csv-parser')
const path = require('path');
const fs = require('fs')
const ApiError = require('../error/ApiError');
const { Apartment } = require('../models/models');

class ApartmentController {
    async create(req, res, next) {
        try {
            if (!req.files) {
                return next(ApiError.badRequest('Данные не загружены!'))
            }
            const { data } = req.files;

            const filePath = path.resolve(__dirname, '..', 'static', data.name);

            await data.mv(filePath);

            const apartments = [];

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => {
                    const apartment = {
                        id: data.id,
                        floor: data.floor,
                        pos_on_floor: data.pos_on_floor,
                        price: data.price,
                        rooms: data.rooms,
                        area_total: data.area_total,
                        area_kitchen: data.area_kitchen,
                        area_live: data.area_live,
                        layout_image: data.layout_image
                    };
                    apartments.push(apartment);
                })
                .on('end', () => {
                    Apartment.bulkCreate(apartments)
                    res.status(201).json({apartments})
                });
        } catch (err) {
            console.error(err);
            return next(ApiError.internal(err.message));
        }
    };

    async getAll(req, res) {
        try {
            let {page, limit} = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;
            const apartments = await Apartment.findAndCountAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });
            res.status(200).json(apartments);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const apartment = await Apartment.findOne({ where: {id}});
            if (apartment) {
                res.status(200).json(apartment);
            } else {
                res.status(404).json({message: 'Квартира не найдена'})
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new ApartmentController();