const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {

});

router.post('/vacation/:id', (req, res) => {
    
    if (req.isAuthenticated() && req.user.role_id == 1) {
        const queryText = `
            INSERT INTO "accrued_time" 
                ("sick_hours", "vacation_hours", "employee_id")
            VALUES (0, 8, $1)`
            
        pool.query(queryText, [req.params.id])
        .then(response =>{res.sendStatus(200)})
        .catch(error => {
            console.log('error in POST', error);
            res.sendStatus(500);
        })
    }else {
        res.sendStatus(403);
    }
}); // end of post

router.put('/vacation/:id', (req, res) => {    
    if(req.isAuthenticated()) {
        const queryText = `UPDATE "employee" SET "vacation_hours" = "vacation_hours" + 8 WHERE "id" = $1;`;
        pool.query(queryText, [req.params.id]).then(response => res.sendStatus(200))
        .catch(error => {
            console.log('error in making UPDATE', error);
            res.sendStatus(500);
        });
    };
}); // end of put

router.post('/sick/:id', (req, res) => {
    
    if (req.isAuthenticated() && req.user.role_id == 1) {
        const queryText = `
            INSERT INTO "accrued_time" 
                ("sick_hours", "vacation_hours", "employee_id")
            VALUES (8, 0, $1)`
            
        pool.query(queryText, [req.params.id])
        .then(response =>{res.sendStatus(200)})
        .catch(error => {
            console.log('error in POST', error);
            res.sendStatus(500);
        })
    }else {
        res.sendStatus(403);
    }
}); // end of post

router.put('/sick/:id', (req, res) => {    
    if (req.isAuthenticated() && req.user.role_id == 1) {
        const queryText = `UPDATE "employee" SET "sick_hours" = "sick_hours" + 8 WHERE "id" = $1;`;
        pool.query(queryText, [req.params.id]).then(response => res.sendStatus(200))
        .catch(error => {
            console.log('error in making UPDATE', error);
            res.sendStatus(500);
        });
    };
}); // end of put



module.exports = router;