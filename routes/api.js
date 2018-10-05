var express = require('express');
var router = express.Router();
var https = require('https');
var async = require('async');
var modul = require('../modul/modul');
var authentication_mdl = require('../middlewares/authentication');
var ip = require('ip');
var accesslog = require('access-log');
var session_store;

router.get('/users',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT id_user, username, nama_gelar, nama_opd FROM v_users_active WHERE status_user = "1"',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null}));
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"users": results
				}));
			}
		});
	});
});

router.get('/users/(:id)',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var id_user = req.params.id;
		var query = connection.query('SELECT id_user, id_peg, username, nama_gelar, nama_opd, foto_peg, tentang_peg, id_hakakses, status_user FROM v_users_active WHERE id_user='+id_user,function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"user": results
				}));
            }
		});
	});
});

router.get('/peg',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_peg',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"pegawai": results
				}));
            }
		});
	});
});

router.get('/peg/(:id)',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var id_peg = req.params.id;
		var query = connection.query('SELECT * FROM v_peg WHERE id_peg='+id_peg,function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"pegawai": results
				}));
            }
		});
	});
});

router.get('/peg_instansi',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var id_opd = req.session.user.id_opd;
		var query = connection.query('SELECT * FROM v_peg WHERE id_opd='+id_opd,function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"pegawai": results
				}));
            }
		});
	});
});

router.get('/data/jum_peg',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_peg_jum',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"jum_pegawai": results
				}));
            }
		});
	});
});

router.get('/berita',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_berita',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"berita": results
				}));
            }
		});
	});
});

router.get('/berita_populer',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_berita_populer',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"berita": results
				}));
            }
		});
	});
});

/*
router.get('/berita/(:id)',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var id_berita =req.params.id;
		var query = connection.query('SELECT * FROM v_berita where id_berita='+id_berita,function(err, results, fields)
		{
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"berita": results
				}));
            }
		});
	});
});
*/

router.get('/berita/(:link)',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var link_berita =req.params.link;
		var query = connection.query('SELECT * FROM v_berita where status = 1 AND link_berita="'+link_berita+'"',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"berita": results
				}));
            }
		});
	});
});


router.get('/berita_jumlah',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_adm_berita_hitung',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"jum_berita": results
				}));
            }
		});
	});
});

router.get('/adm_berita_all',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_adm_berita_all',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"berita": results
				}));
            }
		});
	});
});

router.get('/adm_berita_draft',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_adm_berita_all WHERE status=0',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"berita": results
				}));
            }
		});
	});
});

router.get('/adm_berita_terbit',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_adm_berita_all WHERE status=1',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"berita": results
				}));
            }
		});
	});
});

router.get('/adm_berita_hapus',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_adm_berita_all WHERE status=99',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"berita": results
				}));
            }
		});
	});
});

router.get('/adm_log_berita',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_adm_log_berita',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"log_berita": results
				}));
            }
		});
	});
});

router.get('/download-area',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_download',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"download": results
				}));
            }
		});
	});
});

router.get('/dip',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_download',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"dip": results
				}));
            }
		});
	});
});

router.get('/dip/(:link)/',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var link_opd = req.params.link;
		var query = connection.query('SELECT * FROM v_download where link_opd="'+link_opd+'"',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"dip": results
				}));
            }
		});
	});
});

router.get('/dip/kategori/(:link)/',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var kat_dip = req.params.link;
		var query = connection.query('SELECT * FROM v_download where kat_dip="'+kat_dip+'"',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"dip": results
				}));
            }
		});
	});
});

router.get('/dataopd',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_download_opd',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"download": results
				}));
            }
		});
	});
});



router.get('/gallery_album',
function(req, res) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_gallery_album',function(err, results)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"gallery_album": results
				}));
            }
		});
	});
});

router.get('/gallery_album/(:link)',
function(req, res) {
	req.getConnection(function(err,connection){
		var id_album =req.params.link;
		var query = connection.query('SELECT * FROM v_gallery_album where id_album='+id_album,function(err, results)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"gallery_album": results
				}));
            }
		});
	});
});

router.get('/gallery_album_th',
function(req, res) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT DISTINCT th_album, COUNT(id_album) AS jum_gallery FROM v_gallery_album GROUP BY th_album',function(err, results)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"gallery_album_th": results
				}));
            }
		});
	});
});

router.get('/gallery',
function(req, res) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_gallery',function(err, results)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"gallery": results
				}));
            }
		});
	});
});

router.get('/gallery/(:link)',
function(req, res) {
	req.getConnection(function(err,connection){
		var id_gallery =req.params.link;
		var query = connection.query('SELECT * FROM v_gallery where id_gallery='+id_gallery,function(err, results)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"gallery": results
				}));
            }
		});
	});
});

router.get('/unitkerja',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_opd',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"opd": results
				}));
            }
		});
	});
});

router.get('/unitkerja/(:link)',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var link_opd =req.params.link;
		var query = connection.query('SELECT * FROM v_opd WHERE link_opd="'+link_opd+'"',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"opd": results
				}));
            }
		});
	});
});

router.get('/subdomain',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT id_subdomain, id_opd, nama_opd, akronim_opd, nama_subdomain, subdomain, prefix, ip_pointing, fungsi, status_subdomain, logo, alamat_logo_big, alamat_logo_small, alamat_logo_tiny FROM v_subdomain',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"subdomain": results
				}));
            }
		});
	});
});

router.get('/data/subdomain',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_subdomain',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"subdomain": results
				}));
            }
		});
	});
});

router.get('/pranala-luar',
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_pranala_luar',function(err, results, fields)
		{
			accesslog(req, res);
			if(err) {
				res.send(JSON.stringify({"status": 500, "error": err, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
			} else {
                res.send(JSON.stringify({
					"status":200,
					"error":null,
					"pranala_luar": results
				}));
            }
		});
	});
});

module.exports = router;