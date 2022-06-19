const fetch = require("node-fetch");
const {response} = require("express");

class WienerLinien{
    //Constructor
}

class WienerLinienModel {

    async getTime(id) {
        return fetch('https://www.wienerlinien.at/ogd_realtime/monitor?rbl='+id)
            .then((responseWRL) => responseWRL.json())
            .then((resp) => {return resp});
    }
}
let model = new WienerLinienModel();
module.exports = model;
