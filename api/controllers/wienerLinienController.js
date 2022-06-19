const model = require("../models/wienerLinienModel");

class WienerLinienController {
    async getTime(req, res) {
        res.send(await model.getTime(req.params.id));
    }
}

module.exports = new WienerLinienController();