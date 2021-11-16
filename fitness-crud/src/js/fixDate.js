import moment from "moment-timezone";

function fixDate(data) {
    // console.log('DUOMENYS ', data)
    return data.map((e, i) =>  {
        return({
            id: e.id,
            vardas: e.vardas,
            pavarde: e.pavarde,
            sportoklubas: e.sportoklubas,
            kaina: e.kaina,
            data: moment.tz(e.data, "Europe/Vilnius").format('YYYY-MM-DD'),
            abonentas: e.abonentas,
            visiklubai: e.visiklubai,
            baseinas: e.baseinas,
            gerimai: e.gerimai,
        })
    })
}

export default fixDate;