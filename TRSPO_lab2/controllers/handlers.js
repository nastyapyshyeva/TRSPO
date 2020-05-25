var fs = require('fs');
var path = require('path');
var jsonPath = path.join(__dirname, '..', 'data', 'storage.json');

exports.getAll = (req, res) => {
    fs.readFile(jsonPath, function(error, data) {
        if (error) return res.sendStatus(500)
        try {
          var rockstars = JSON.parse(data)
        } catch (error) {
          return res.sendStatus(500)
        }
        res.json(rockstars);
    });
}

exports.getOne = (req, res) => {
    fs.readFile(jsonPath, function(error, data) {
        if (error) return res.sendStatus(500)
        try {
          var rockstars = JSON.parse(data)
        } catch (error) {
          return res.sendStatus(500)
        }
        const rockstar = rockstars.find(el => el.id === parseInt(req.params.id));
        if(!rockstar) {
            return res.sendStatus(404);
        }
        res.send(rockstar);
    });
}

exports.post = (req, res) => {
    fs.readFile(jsonPath, function(error, data) {
        if (error) return res.sendStatus(500)
        try {
          var rockstars = JSON.parse(data)
        } catch (error) {
          return res.sendStatus(500)
        }
        //check if exist
        const rockstar = rockstars.find((el) => {
            return el.name === req.body.name && el.band === req.body.band && el.instrument === req.body.instrument
        });
        if(rockstar) {
            return res.status(409).send({ "message": "Musician already exist."});
        }

        //validate response
        if(!req.body.name || !req.body.band || !req.body.instrument) {
            return res.sendStatus(400);
        }

        const newRockstar ={
            id: rockstars.length + 1,
            name: req.body.name,
            band: req.body.band,
            instrument: req.body.instrument
    
        }
        rockstars.push(newRockstar);
        fs.writeFile(jsonPath, JSON.stringify(rockstars), (err) => {
            if (err) {
                return res.sendStatus(500);
            }
            res.sendStatus(201);
        });
    });
}

exports.put = (req, res) => {
    fs.readFile(jsonPath, function(error, data) {
        if (error) return res.sendStatus(500)
        try {
          var rockstars = JSON.parse(data)
        } catch (error) {
          return res.sendStatus(500)
        }
        const rockstar = rockstars.find(el => el.id === parseInt(req.params.id));
        if(!rockstar) {
            return res.sendStatus(404);
        }
        //validate response
        if(!req.body.name || !req.body.band || !req.body.instrument) {
            return res.sendStatus(400);
        }

        rockstar.name = req.body.name;
        rockstar.band = req.body.band;
        rockstar.instrument = req.body.instrument;

        fs.writeFile(jsonPath, JSON.stringify(rockstars), (err) => {
            if (err) {
                return res.sendStatus(500);
            }
            res.send(rockstar);
        });
    });
}

exports.delete = (req, res) => {
    fs.readFile(jsonPath, function(error, data) {
        if (error) return res.sendStatus(500)
        try {
          var rockstars = JSON.parse(data)
        } catch (error) {
          return res.sendStatus(500)
        }
        const rockstar = rockstars.find(el => el.id === parseInt(req.params.id));
        if(!rockstar) {
            return res.sendStatus(404);
        }
        const index = rockstars.indexOf(rockstar);
        rockstars.splice(index,1);

        fs.writeFile(jsonPath, JSON.stringify(rockstars), (err) => {
            if (err) {
                return res.sendStatus(500);
            }
            res.send({ "message": "Musician has been successfully removed."});
        });
    });
}