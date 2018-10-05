const express = require('express');
const router = express.Router();
const User = require('../model/user');

const myModule = 'users';

router.get('/', isAuthenticated, (req, res, next) => {
    let data = {title: 'List '+myModule};
    data = Object.assign(data, res.locals);
    data = Object.assign(data, {'module':myModule,'adm_url':res.locals.adm_url+myModule+'/'});
    res.render('adm_'+myModule+'/v_list', data);
});

router.get('/get', isAuthenticated, (req, res, next) => {
    User.findAll().then((rows) => {
        res.json( rows );
    });
});

router.get('/rows', isAuthenticated, (req, res, next) => {
    User.count().then((count) => {
        res.json( count );
    });
});

router.post('/', isAuthenticated, (req, res, next) => {
    let data = req.body;
    User.createUser({
        full_name   : data.full_name,
        phone       : data.phone,
        email       : data.email,
        username    : data.username,
        password    : data.password,
        active      : data.active
    }, function () {
        res.json("Berhasil");
    });
});

router.put('/', isAuthenticated, (req, res, next) => {
    let data = req.body;
    let id = data.id;
    delete data.id;
    User.update(data, {
        where:{ id:id }
    }).then(() => {
        res.json('Berhasil');
    });
});

router.get('/add', isAuthenticated, (req, res, next) => {
    let data = {title:'Add New '+myModule};
    data = Object.assign(data, res.locals);
    data = Object.assign(data, {'module':myModule,'adm_url':res.locals.adm_url+myModule+'/'});
    res.render('adm_'+myModule+'/v_add', data);
});

router.get('/edit/:id', isAuthenticated, (req, res, next) => {
    User.findById(req.params.id).then((result) => {
        if(!result) res.status(404).end('404 Page not found');
        let row = result.get();
        let userData = {
            id          : row.id,
            full_name   : row.full_name,
            active      : row.active,
            phone       : row.phone,
        };
        let data = {title:'Edit '+myModule};
        data = Object.assign(data, res.locals);
        data = Object.assign(data, {'module':myModule,'adm_url':res.locals.adm_url+myModule+'/'});
        data = Object.assign(data, { 'row': userData });
        res.render('adm_'+myModule+'/v_edit', data);
    });
});

router.delete('/', isAuthenticated, (req, res, next) => {
    let data = req.body;
    let promises = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            let id = data[key];
            let promise = new Promise(function(resolve, reject) {
                User.destroy({
                    where: {
                        id: id
                    }
                }).then(function(rowDeleted){
                    if(rowDeleted === 1){
                        resolve(rowDeleted);
                    }
                }, function(err){
                    reject(err);
                });
            });
            promises.push(promise);
        }
    }
    Promise.all(promises).then(values => {
        res.json( 'Data Removed!' );
    });
});

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/adm/auth');
    }
}

module.exports = router;