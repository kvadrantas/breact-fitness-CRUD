import isValid from "./js/isValid.js";

// import moment from "moment-timezone";

// ----------------- EXPRESS SERVER -----------------
// const express = require('express')
import express, { json } from "express";
const app = express()
const port = 3003
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})

// const cors = require('cors')
import cors from "cors";
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());


// ----------------- MY SQL CONNECT -----------------
// const mysql = require('mysql')
import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "fitness",
    password: "Laikinas1",
    database: "fitness",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
// -------------------------------------------------




// GET ALL RECORDS FROM TABLE
app.get('/fitness/', (req, res) => {
    const sql = `
        select * from fitness
    `
    con.query(sql, (err, results) => {
        if (err) throw err;
        // console.log(results);
        // console.log(moment.tz('2021-11-03T22:00:00.000Z', "Europe/Vilnius").format('YYYY-MM-DD'))
        // console.log('AAA ', results);
        // console.log('BBB ', fixDate(results));
        res.send(results);
    });
})


// INSERT NEW RECORD IN TABLE
app.post('/fitness', (req, res) => {
    const sql = `
        insert into fitness
        (vardas, pavarde, sportoklubas, kaina, data, abonentas, visiklubai, baseinas, gerimai)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    if(
        isValid('txt', 'required', req.body.vardas) &&
        isValid('txt', 'required', req.body.pavarde) &&
        isValid('txt', 'required', req.body.sportoklubas) &&
        isValid('num', 'required', req.body.kaina) &&
        isValid('txt', 'optional', req.body.data.slice(0, 10)) &&
        isValid('txt', 'optional', req.body.abonentas) &&
        isValid('boolean', 'optional', req.body.visiklubai) &&
        isValid('boolean', 'optional', req.body.baseinas) &&
        isValid('boolean', 'optional', req.body.gerimai)
    ) {
        con.query(sql, [
            req.body.vardas, 
            req.body.pavarde, 
            req.body.sportoklubas, 
            req.body.kaina, 
            req.body.data.slice(0, 10)||'0001-01-01', 
            req.body.abonentas, 
            req.body.visiklubai, 
            req.body.baseinas, 
            req.body.gerimai, 
        ], (err, results) => {
            try {
                if (err) throw err;
                // console.log(results);
                res.send(results)
            } catch(err) {
                console.log('THIS IS HANDLED ERROR: ', err)
            }
        });
    } else console.log('BAD DATA');
})


// EDIT RECORD 
app.put('/fitness/:id', (req, res) => {
    // console.log(req.body.data);
    const sql = `
        UPDATE fitness
        SET vardas = ?, pavarde = ?, sportoklubas = ?, kaina = ?, data = ?, abonentas = ?, visiklubai = ?, baseinas = ?, gerimai = ?
        WHERE id = ?
    `;
    if(
        isValid('txt', 'required', req.body.vardas) &&
        isValid('txt', 'required', req.body.pavarde) &&
        isValid('txt', 'required', req.body.sportoklubas) &&
        isValid('num', 'required', req.body.kaina) &&
        isValid('txt', 'optional', req.body.data.slice(0, 10)) &&
        isValid('txt', 'optional', req.body.abonentas) &&
        isValid('boolean', 'optional', req.body.visiklubai) &&
        isValid('boolean', 'optional', req.body.baseinas) &&
        isValid('boolean', 'optional', req.body.gerimai) &&
        isValid('num', 'required', req.params.id)
    ) {
        con.query(sql, [
            req.body.vardas,
            req.body.pavarde,
            req.body.sportoklubas,
            req.body.kaina,
            req.body.data.slice(0, 10),
            req.body.abonentas,
            req.body.visiklubai,
            req.body.baseinas,
            req.body.gerimai,
            req.params.id
        ], (err, results) => {
            try {
                if (err) {
                    throw err;
                }
                res.send(results);
            } catch(err) {
                console.log('THIS IS HANDLED ERROR: ', err);
            }
        }) 
    } else console.log('BAD DATA');
})


// DELETE RECORD 
app.delete('/fitness/:id', (req, res) => {
    const sql = `
        DELETE FROM fitness
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        try {
            if (err) {
                throw err;
            }
            res.send(result);
        } catch(err) {
            console.log('THIS IS HANDLED ERROR: ', err);
        }
    })
})
// -------------------------------------------------




// FILTER CHECKBOX CONTENT - GET DISTINCT sportoklubasS
app.get('/fitness-sportoklubas', (req, res) => {
    const sql = `
        SELECT DISTINCT sportoklubas
        FROM fitness
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

app.get('/fitness-abonentas', (req, res) => {
    const sql = `
        SELECT DISTINCT abonentas
        FROM fitness
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

// FILTER - GET DATA BY sportoklubas
app.get('/fitness-filter/:t', (req, res) => {
    const sql = `
        SELECT *
        FROM fitness
        WHERE sportoklubas = ?
    `;
    con.query(sql, [req.params.t], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

app.get('/abonentas-filter/:t', (req, res) => {
    const sql = `
        SELECT *
        FROM fitness
        WHERE abonentas = ?
    `;
    con.query(sql, [req.params.t], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

// SORT1 & FILTER MIX (SORT1)  
// app.get('/fitness-filter/:t', (req, res) => {
//     // console.log(sportoklubasof req.params.t, req.params.t);
//     // console.log(req.params.t === '3');
//     let sql;
//     if(req.params.t === 'ASC') {
//         sql = `
//         SELECT * FROM fitness
//         order by kaina ASC
//     `} else if(req.params.t === 'DESC') {
//         sql = `
//         SELECT * FROM fitness
//         order by kaina DESC
//     `} else if(req.params.t === '1' || req.params.t === '0') {
//         sql = `
//         SELECT *
//         FROM fitness
//         WHERE infitness = ?
//     `;
//     }
    
//     con.query(sql, [req.params.t], (err, results) => {
//         if (err) {
//             throw err;
//         }
//         res.send(results);
//         // console.log(results)
//     })
// })

// SEARCH DATA
app.get('/fitness-search', (req, res) => {
    const searchText = (`%${req.query.s}%`).toLowerCase();
    const sql = `
        SELECT *
        FROM fitness
        where LOWER(vardas) like ? OR LOWER(pavarde) like ? OR LOWER(sportoklubas) like ? OR LOWER(kaina) like ? OR LOWER(data) like ? OR LOWER(abonentas) like ? OR LOWER(visiklubai) like ? OR LOWER(baseinas) like ? OR LOWER(gerimai) like ?
    `;
    con.query(sql, [searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

// STATISTICS
app.get('/statistics', (req, res) => {
    
    let visoKlientu;
    let visoPinigu;
    let groupStats1;
    let groupStats2;
    
    let sql = `
    SELECT 
     count(id) as visoKlientu,
     sum(kaina) as visoPinigu
    FROM fitness
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        // res.send(results);
         
            visoKlientu = results[0].visoKlientu;
            visoPinigu = results[0].visoPinigu;
    });

    // sql = `
    // select 
    // SUM(quantity) as itmInfitness
    // from fitness
    // where infitness = '1';
    // `;
    // con.query(sql, (err, results) => {
    //     if (err) {
    //         throw err;
    //     }
    //     // res.send(results);
    //     itmInfitness = results[0].itmInfitness;
    // });

    // sql = `
    // select 
    // SUM(quantity) as itmOutfitness
    // from fitness
    // where infitness = '0';
    // `;
    // con.query(sql, (err, results) => {
    //     if (err) {
    //         throw err;
    //     }
    //     // res.send(results);
    //      itmOutfitness = results[0].itmOutfitness;
    // });

    sql = `
    select abonentas, count(id) as quantity
    from fitness
    group by abonentas
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        // res.send(results);
        groupStats1 = results;
    });

    sql = `
    select sportoklubas, count(id) as quantity
    from fitness
    group by sportoklubas
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        // res.send(results);
        groupStats2 = results;
        res.send({
            visoKlientu,
            visoPinigu,
            groupStats1,
            groupStats2
        });
    });
})

// app.get('/group-statistics', (req, res) => {
//     const sql = `
//         SELECT COUNT(id) as count, sportoklubas
//         FROM animals
//         GROUP BY sportoklubas
//         ORDER BY COUNT(id) DESC, sportoklubas
//     `;
//     con.query(sql, (err, results) => {
//         if (err) {
//             throw err;
//         }
//         res.send(results);
//     })
// })




// function fixDate(data) {
//     return data.map((e, i) =>  {
//         return({
//             id: i+1,
//             vardas: e.vardas,
//             quantity: e.quantity,
//             kaina: e.kaina,
//             infitness: e.infitness,
//             data: moment.tz(e.data, "Europe/Vilnius").format('YYYY-MM-DD')
//         })
//     })
// }