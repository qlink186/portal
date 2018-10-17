var express = require('express');
var helmet = require('helmet');
var router = express.Router();
var request = require('request');
var http = require('http');
var async = require('async');
var modul = require('../modul/modul');
var panggilApi = require('./panggilApi');
var authentication_mdl = require('../middlewares/authentication');
var accesslog = require('access-log');
var fs = require('fs');

var session_store;

function opd_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_opd',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.opd = rows;
				next();
		});
	});
}

function status_peg_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_status_peg',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.status_peg = rows;
				next();
		});
	});
}

function gol_ruang_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_gol',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.gol_ruang = rows;
				next();
		});
	});
}

function eselon_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_eselon',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.eselon = rows;
				next();
		});
	});
}

function jabatan_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_jabatan',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.jabatan = rows;
				next();
		});
	});
}

function agama_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_agama',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.agama = rows;
				next();
		});
	});
}

function pendidikan_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_pend',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.pendidikan = rows;
				next();
		});
	});
}

function pendidikan_umum_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_pend_umum',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.pendidikan_umum = rows;
				next();
		});
	});
}

function kel_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_kel',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.kel = rows;
				next();
		});
	});
}

function kec_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_kec',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.kec = rows;
				next();
		});
	});
}

function kotakab_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_kotakab',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.kotakab = rows;
				next();
		});
	});
}

function pranala_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_pranala_luar',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.pranala = rows;
				next();
		});
	});
}

function peg_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_peg',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.peg = rows;
				next();
		});
	});
}

function peg_jum(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_peg_jum',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.jumpeg = rows;
				next();
		});
	});
}

function data_download(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_download',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.datadownload = rows;
				next();
		});
	});
}

function data_aksi_daerah(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_download_aksi_daerah',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.dataaksidaerah = rows;
				next();
		});
	});
}

function data_download_home(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_download_home',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.datadownloadhome = rows;
				next();
		});
	});
}

function hakakses_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_hakakses',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.hakakses = rows;
				next();
		});
	 });
}

function jenis_file_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_dip_jenis_file',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.jenis_file = rows;
				next();
		});
	 });
}

function kategori_file_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_dip_kategori',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.kategori_file = rows;
				next();
		});
	 });
}

function siaranpers_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_siaranpers',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.siaranpers = rows;
				next();
		});
	 });
}

function kalenderevent_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_kalenderevent',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.kalenderevents = rows;
				next();
		});
	 });
}

function user_single_data(req, res, next)
{
	var session = req.session;
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_users WHERE id_user='+session.user.id_user,function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.user = rows[0];
				next();
		});
	 });
}

function berita_top_10(req, res, next)
{
	var session = req.session;
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_berita_home',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.berita_10 = rows;
				next();
		});
	});
}

function berita_populer_data(req, res, next)
{
	var session = req.session;
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_berita_populer',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.berita_populers = rows;
				next();
		});
	 });
}

function kategori_berita(req, res, next)
{
	var session = req.session;
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_berita_kategori',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.kategoriberita = rows;
				next();
		});
	 });
}

function data_unit_kerja(req, res, next)
{
	var session = req.session;
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_opd',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.data_unit_kerjas = rows;
				next();
		});
	 });
}

function data_subdomain(req, res, next)
{
	var session = req.session;
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_subdomain',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.data_subdomains = rows;
				next();
		});
	 });
}

function gallery_album_data(req, res, next)
{
	var session = req.session;
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_gallery_album ORDER BY tgl_post ASC',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else 
				console.log(rows);
				req.gallery_album = rows;
				next();
		});
	 });
}


function gallery_data(req, res, next)
{
	var session = req.session;
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_gallery ORDER BY tgl_post ASC',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.gallery = rows;
				next();
		});
	 });
}

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}


/* ---------------- GET HALAMAN ADMIN ----------------  */
router.get('/',
authentication_mdl.is_login,
function(req, res, next) {
	req.getConnection(function(err,connection){
		console.log(req.session);
		res.render('admin/adm-index', {
            title: 'Dashboard',
			menu: 'adm',
            session: req.session
        });
    });
});

/* ---------------- START LIST ARTIKEL ----------------  */
router.get('/artikel-list',
authentication_mdl.is_login,
function(req, res, next) {
	res.render('admin/adm-artikel-list',{
		title:'Data Artikel', 
		menu:'admin/artikel-list', 
		session: req.session
	});
});
/* ---------------- FINISH LIST ARTIKEL ----------------  */

/* ---------------- START DETAIL ARTIKEL ----------------  */
router.get('/artikel-detail/(:id)',
authentication_mdl.is_login,
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_berita where id_berita='+req.params.id,function(err,rows)
		{
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errors_detail);
				res.redirect('/admin/adm-artikel-list');
			}else
			{
				if(rows.length <=0)
				{
					req.flash('msg_error', "Berita Tidak Ditemukan");
					res.redirect('/admin/adm-artikel-list');
				}
				else
				{
					console.log(rows);
					res.render('admin/adm-artikel-detail',{
                        title:"Berita ",
                        artikel:rows[0],
                        menu:'admin/artikel-detail',
						session: req.session
                    });
				}
			}
		});
	});
});
/* ---------------- FINISH DETAIL ARTIKEL ----------------  */

/* ---------------- START TULIS ARTIKEL ----------------  */
router.get('/artikel-tulis',
authentication_mdl.is_login,
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_berita_kategori',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-artikel-tulis',{
                title:'Data Artikel',
                kategori:rows,
                menu:'admin/artikel-tulis',
				session: req.session
            });
		});
	});
});


router.post('/artikel-tulis', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var img = '';
		if (req.files) {
			var file = req.files.uploaded_image;
			var img_name=file.name;
			img = img_name;
			if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
				file.mv('public/images/berita/big/'+file.name, function(err) {
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
				file.mv('public/images/berita/small/'+file.name, function(err) {
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
				file.mv('public/images/berita/thumb/'+file.name, function(err) {
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
			} else {
				message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
				req.flash('msg_error', message);
			}
		}

		console.log(img);
		var data = {
            judul_berita   	: input.title,
            isi_berita 		: input.editorberita,
			tgl_post   		: new Date(Date.now()).toLocaleString(),
			id_opd			: session.id_opd,
			id_user			: session.id_user,
			id_kategori		: input.kategori,
			gambar			: img
		};
		var query = connection.query('INSERT INTO d_berita SET ?', data,
		function(err, result) {
			console.log(err);
			if (result)
				res.redirect('/admin/adm-artikel-detail/'+result.insertId);
		});
	});
});
/* ---------------- FINISH TULIS ARTIKEL ----------------  */

/* ---------------- START EDIT ARTIKEL ----------------  */
router.get('/artikel-edit/(:id)', 
authentication_mdl.is_login, 
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_berita where id_berita='+req.params.id,function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			var berita = rows[0];
			var query = connection.query('SELECT * FROM d_berita_kategori',function(err,rows)
			{
				if(err)
					var errornya  = ("Error Memilih : %s ",err );
				req.flash('msg_error', errornya);
				var kategori = rows;
				var query = connection.query('SELECT * FROM d_berita_kategori where id_kategori='+berita.id_kategori,function(err,rows)
				{
					if(err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
					var kategori_artikel = rows[0];
					res.render('admin/adm-artikel-edit-editor',{
                        title:'Data Artikel',
                        kategori:kategori,
                        kategori_artikel:kategori_artikel,
                        artikel:berita,
                        menu:'admin/artikel-edit-editor',
                        session: req.session
                    });
				});
			});
		});
	});
});

router.post('/artikel-edit',
authentication_mdl.is_login,
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_berita = input.id_berita;
		var data = {
            judul_berita   	: input.title,
            isi_berita 		: input.editorberita,
			tgl_edit   		: new Date(Date.now()).toLocaleString(),
			tgl_terbit		: input.publish==1? new Date(Date.now()).toLocaleString():'',
			id_opd			: session.id_opd,
			id_user			: session.id_user,
			id_kategori		: input.kategori,
			tayang_umum		: input.publish
		};
		var query = connection.query('UPDATE d_berita SET ? WHERE id_berita = '+id_berita, data,
		function(err, result) {
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('admin/adm-artikel-detail/'+result.insertId);
		});
	});
});
/* ---------------- FINISH EDIT ARTIKEL ----------------  */

/* ---------------- START DELETE ARTIKEL ----------------  */
router.get('/artikel-delete/(:id)',
authentication_mdl.is_login,
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_berita = req.params.id;
		var query = connection.query('DELETE FROM d_berita WHERE id_berita = '+id_berita,
		function(err, result) {
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('admin/adm-artikel-list');
		});
	});
});
/* ---------------- FINISH DELETE ARTIKEL ----------------  */

/* ---------------- START TERBITKAN ARTIKEL ----------------  */
router.get('/artikel-terbitkan/(:id)',
authentication_mdl.is_login,
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_berita = req.params.id;
		var data = {
			tayang_umum		: '1',
			tgl_terbit		: new Date(Date.now()).toLocaleString()
		};
		var query = connection.query('UPDATE d_berita SET ? WHERE id_berita = '+id_berita, data,
		function(err, result) {
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('admin/adm-artikel-list');
		});
	});
});
/* ---------------- FINISH DELETE ARTIKEL ----------------  */

/* ---------------- START KATEGORI ARTIKEL ----------------  */
router.get('/artikel-kategori',
authentication_mdl.is_login,
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_berita_kategori',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			// console.log(rows);
			res.render('admin/adm-artikel-kategori',{
                title:'Data Kategori',
                kategori_list:rows,
                menu:'admin/artikel-kategori',
                session: req.session
            });
		});
	});
});
/* ---------------- FINISH KATEGORI ARTIKEL ----------------  */

/* ---------------- START TULIS KATEGORI ARTIKEL ----------------  */
router.post('/artikel-kategori-tulis',
authentication_mdl.is_login,
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var data = {
			kategori : input.kategori
		};
		var query = connection.query('INSERT INTO d_berita_kategori SET ?', data,
		function(err, result) {
			console.log(err);
			if (result)
				res.redirect('admin/artikel-kategori');
		});
	});
});
/* ---------------- FINISH TULIS KATEGORI ARTIKEL ----------------  */

router.get('/artikel-kategori-edit/(:id)', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_kategori = req.params.id;
		var data = {
			kategori		: input.kategori
		};
		var query = connection.query('UPDATE d_berita_kategori SET ? WHERE id_kategori = '+id_kategori, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-artikel-kategori/');
		});
	});
});

router.get('/adm-artikel-kategori-delete/(:id)', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_kategori = req.params.id;
		var query = connection.query('DELETE FROM d_berita_kategori WHERE id_kategori = '+id_kategori,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-artikel-kategori/');
		});
	});
});

router.get('/adm-artikel-editor', authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_users_active WHERE id_hakakses = 2',function(err,rows)
		{
		if(err)
				var errornya  = ("Error Memilih : %s ",err );
				req.flash('msg_error', errornya);
				res.render('admin/adm-artikel-editor',{title:"Data Editor",all_pegawai:rows, menu:'adm-artikel-editor', session: req.session});
		});
         //console.log(query.sql);
     });
});

/* ---------------- START LOG BERITA ----------------  */
router.get('/log-berita',
authentication_mdl.is_login,
function(req, res, next) {
	res.render('admin/adm-log-berita', {
		title: 'Log Berita',
		menu: 'admin/log-berita',
		session: req.session
	});
});
/* ---------------- FINISH LOG BERITA ----------------  */

//kepegawaian
router.get('/kepegawaian-list', 
authentication_mdl.is_login, 
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_peg',function(err,rows)
		{
		if(err)
			var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-kepegawaian-list',{
				title:"Data Pegawai",
				all_pegawai:rows, 
				menu:'admin/kepegawaian-list', 
				session: req.session
			});
		});
         //console.log(query.sql);
     });
});

router.get('/kepegawaian-detail/(:id)', 
authentication_mdl.is_login, 
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_peg where id_peg='+req.params.id,function(err,rows)
		{
		if(err)
			var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-kepegawaian-detail',{
				title:"Detail Pegawai",
				pegawai:rows, 
				menu:'admin/kepegawaian-detail', 
				session: req.session
			});
		});
         //console.log(query.sql);
     });
});

router.get('/kepegawaian-tambah', 
authentication_mdl.is_login, 
opd_data, 
status_peg_data, 
gol_ruang_data, 
eselon_data, 
jabatan_data, 
agama_data, 
pendidikan_data, 
pendidikan_umum_data, 
kel_data, 
kec_data, 
kotakab_data, 
function(req, res, next) {
	var opd_rows = req.opd;
	var status_peg_rows = req.status_peg;
	var gol_ruang_rows = req.gol_ruang;
	var eselon_rows = req.eselon;
	var jabatan_rows = req.jabatan;
	var agama_rows = req.agama;
	var pendidikan_rows = req.pendidikan;
	var pendidikan_umum_rows = req.pendidikan_umum;
	var kel_rows = req.kel;
	var kec_rows = req.kec;
	var kotakab_rows = req.kotakab;
	console.log(agama_rows);
	res.render('admin/adm-kepegawaian-tambah',{ 
		title: 'Tambah Pegawai', 
		menu: 'adm/kepegawaian-tambah', 
		session: req.session, 
		opd:opd_rows, 
		status_peg:status_peg_rows, 
		gol_ruang:gol_ruang_rows, 
		eselon:eselon_rows, 
		jabatan:jabatan_rows, 
		agama:agama_rows, 
		pendidikan:pendidikan_rows, 
		pendidikan_umum:pendidikan_umum_rows, 
		kel:kel_rows, 
		kec:kec_rows, 
		kotakab:kotakab_rows
	});
});

router.post('/kepegawaian-tambah', 
authentication_mdl.is_login, 
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;	
		var data = input;
		data.id_peg = input.nip;
		var query = connection.query('INSERT INTO m_peg SET ?', data,
		function(err, result) {		
			console.log(err);
			if (result)
				res.redirect('admin/kepegawaian-detail/'+result.insertId);
		});
	});
});

router.get('/kepegawaian-edit/(:id)', 
authentication_mdl.is_login, 
opd_data, 
status_peg_data, 
gol_ruang_data, 
eselon_data, 
jabatan_data, 
agama_data, 
pendidikan_data, 
pendidikan_umum_data, 
kel_data, 
kec_data, 
kotakab_data, 
function(req, res, next) {
	var opd_rows = req.opd;
	var status_peg_rows = req.status_peg;
	var gol_ruang_rows = req.gol_ruang;
	var eselon_rows = req.eselon;
	var jabatan_rows = req.jabatan;
	var agama_rows = req.agama;
	var pendidikan_rows = req.pendidikan;
	var pendidikan_umum_rows = req.pendidikan_umum;
	var kel_rows = req.kel;
	var kec_rows = req.kec;
	var kotakab_rows = req.kotakab;
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT m_peg.*, m_agama.agama as nama_agama, m_kel.kel as nama_kel, m_kec.kec as nama_kec, m_kotakab.kotakab as nama_kotakab, m_status_peg.ket_peg as nama_ket_peg, m_gol.gol as gol, m_gol.ruang as ruang, m_eselon.eselon as nama_eselon, m_jabatan.jabatan as nama_jabatan, m_pend.tk_pend as tk_pend, m_pend.ket_pend as ket_pend, m_pend_umum.pendidikan_umum as pendidikan_umum, m_opd.nama_opd as nama_opd FROM m_peg LEFT JOIN m_agama ON m_agama.id_agama = m_peg.agama LEFT JOIN m_kel ON m_kel.id_kel = m_peg.alamat_kel LEFT JOIN m_kec ON m_kec.id_kec = m_peg.alamat_kec LEFT JOIN m_kotakab ON m_kotakab.id_kotakab = m_peg.alamat_kota LEFT JOIN m_status_peg ON m_status_peg.id_status_peg = m_peg.status_peg LEFT JOIN m_gol ON m_gol.id_gol = m_peg.gol_ruang LEFT JOIN m_eselon ON m_eselon.id_eselon = m_peg.eselon LEFT JOIN m_jabatan ON m_jabatan.id_jabatan = m_peg.jabatan LEFT JOIN m_pend ON m_pend.id_pend = m_peg.pend_terakhir LEFT JOIN m_pend_umum ON m_pend_umum.id_pend_umum = m_peg.pend_umum LEFT JOIN m_opd ON m_opd.id_opd = m_peg.id_opd WHERE id_peg='+req.params.id,function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-kepegawaian-edit',{ 
				title: 'Edit Pegawai', 
				menu: 'adm/kepegawaian-edit', 
				peg:rows[0], 
				session: req.session, 
				opd:opd_rows, 
				status_peg:status_peg_rows, 
				gol_ruang:gol_ruang_rows, 
				eselon:eselon_rows, 
				jabatan:jabatan_rows, 
				agama:agama_rows, 
				pendidikan:pendidikan_rows, 
				pendidikan_umum:pendidikan_umum_rows, 
				kel:kel_rows, 
				kec:kec_rows, 
				kotakab:kotakab_rows
			});
		});
	});
});

router.post('/kepegawaian-edit', 
authentication_mdl.is_login, 
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_peg = input.id_peg;
		var data = input;
		var query = connection.query('UPDATE m_peg SET ? WHERE id_peg = '+id_peg, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('admin/kepegawaian-detail/'+result.insertId);
		});
	});
});

router.get('/kepegawaian-delete/(:id)', 
authentication_mdl.is_login, 
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_peg = req.params.id;
		var query = connection.query('DELETE FROM m_peg WHERE id_peg = '+id_peg,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('admin/kepegawaian-list/');
		});
	});
});

//siaran pers
router.get('/siaranpers-list',
authentication_mdl.is_login, 
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT d_siaranpers.*, m_peg.gelar_depan as gelar_depan, m_peg.gelar_belakang as gelar_belakang, m_peg.nama as penulis FROM d_siaranpers LEFT JOIN d_users ON d_siaranpers.id_user = d_users.id_user LEFT JOIN m_peg ON d_users.id_peg = m_peg.id_peg ORDER BY tgl_post DESC',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-siaranpers-list',{
				title:'Data Siaran Pers', 
				siaranpers:rows, 
				menu:'admin/siaranpers-list', 
				session: req.session
			});
		});
	});
});

router.get('/siaranpers-detail/(:id)',
authentication_mdl.is_login, 
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_siaranpers where id_siaranpers='+req.params.id,function(err,rows)
		{
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errors_detail);
				res.redirect('admin/siaranpers-list');
			}else
			{
				if(rows.length <=0)
				{
					req.flash('msg_error', "Siaran Pers Tidak Ditemukan"); 
					res.redirect('admin/siaranpers-list');
				}
				else
				{
					console.log(rows);
					res.render('admin/adm-siaranpers-detail',{
						title:"Siaran Pers ",
						siaranpers:rows[0], 
						menu:'admin/siaranpers-detail', 
						session: req.session
					});
				}
			}
		});
	});
});

router.get('/siaranpers-tambah', 
authentication_mdl.is_login, 
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_siaranpers',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-siaranpers-tambah',{
				title:'Data Siaran Pers', 
				menu:'admin/siaranpers-tambah', 
				session: req.session
			});
		});
	});
});

router.post('/siaranpers-tambah',
authentication_mdl.is_login,
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var img = '';
		if (req.files) {
			var file = req.files.uploaded_image;
			var img_name=file.name;
			img = img_name;
			if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
				file.mv('public/images/siaranpers/big/'+file.name, function(err) {
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
				file.mv('public/images/siaranpers/small/'+file.name, function(err) {
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
				file.mv('public/images/siaranpers/thumb/'+file.name, function(err) {
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
			} else {
				message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
				req.flash('msg_error', message);
			}
		}
		console.log(img);
		var data = {
            judul   	: input.judul,
            isi 		: input.editorsiaranpers,
			tgl_post   	: new Date(Date.now()).toLocaleString(),
			id_opd		: session.id_opd,
			id_user		: session.id_user,
			gambar		: img
		};
		var query = connection.query('INSERT INTO d_siaranpers SET ?', 
		data,
		function(err, result) {
			console.log(err);
			if (result)
				res.redirect('admin/adm-siaranpers-detail/'+result.insertId);
		});
	});
});

router.get('/siaranpers-edit/(:id)', 
authentication_mdl.is_login, 
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_siaranpers where id_siaranpers='+req.params.id,function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			var siaranpers = rows[0];
			res.render('admin/adm-siaranpers-edit',{
				title:'Data Siaran Pers', 
				siaranpers:siaranpers, 
				menu:'admin/siaranpers-edit', 
				session: req.session
			});
		});
	});
});

router.post('/siaranpers-edit',
authentication_mdl.is_login,
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_siaranpers = input.id_siaranpers;
		var data = {
            judul   	: input.judul,
            isi 		: input.editorsiaranpers,
			tgl_edit   	: new Date(Date.now()).toLocaleString(),
			tgl_terbit	: input.publish==1? new Date(Date.now()).toLocaleString():'',
			id_opd		: session.id_opd,
			id_user		: session.id_user,
			tayang_umum	: input.publish
		};
		var query = connection.query('UPDATE d_siaranpers SET ? WHERE id_siaranpers = '+id_siaranpers, data,
		function(err, result) {
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('admin/adm-siaranpers-detail/'+result.insertId);
		});
	});
});

router.get('/siaranpers-delete/(:id)',
authentication_mdl.is_login,
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_siaranpers = req.params.id;
		var query = connection.query('DELETE FROM d_siaranpers WHERE id_siaranpers = '+id_siaranpers,
		function(err, result) {
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('admin/adm-siaranpers-list/');
		});
	});
});

router.get('/adm-siaranpers-terbitkan/(:id)',
authentication_mdl.is_login, 
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_beriid_siaranpersta = req.params.id;
		var data = {            
			tayang_umum		: '1',
			tgl_terbit		: new Date(Date.now()).toLocaleString()
		};
		var query = connection.query('UPDATE d_siaranpers SET ? WHERE id_siaranpers = '+id_siaranpers, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-siaranpers-list/');
		});
	});
});

//kalender event
router.get('/adm-kalenderevent-list',
authentication_mdl.is_login, 
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT d_kalenderevent.*, m_peg.gelar_depan as gelar_depan, m_peg.gelar_belakang as gelar_belakang, m_peg.nama as penulis FROM d_kalenderevent LEFT JOIN d_users ON d_kalenderevent.id_user = d_users.id_user LEFT JOIN m_peg ON d_users.id_peg = m_peg.id_peg ORDER BY tgl_post DESC',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-kalenderevent-list',{
				title:'Data Kalender Event', 
				kalenderevent:rows, 
				menu:'adm-kalenderevent-list', 
				session: req.session
			});
		});
	});
});

router.get('/adm-kalenderevent-detail/(:id)',
authentication_mdl.is_login, 
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_kalenderevent where id_kalenderevent='+req.params.id,function(err,rows)
		{
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errors_detail);
				res.redirect('/adm-kalenderevent-list');
			}else
			{
				if(rows.length <=0)
				{
					req.flash('msg_error', "Kalender Event Tidak Ditemukan"); 
					res.redirect('/adm-kalenderevent-list');
				}
				else
				{	
					console.log(rows);
					res.render('admin/adm-kalenderevent-detail',{
						title:"Kalender Event",kalenderevent:rows[0], 
						menu:'adm-kalenderevent-detail', 
						session: req.session
					});
				}
			}
		});
	});
});

router.get('/adm-kalenderevent-tambah', 
authentication_mdl.is_login, 
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_kalenderevent',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-kalenderevent-tambah',{
				title:'Data Kalender Event',
				menu:'adm-kalenderevent-tambah', 
				session: req.session
			});
		});
	});
});

router.post('/adm-kalenderevent-tambah',
authentication_mdl.is_login, 
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;	
		var img = '';
		if (req.files) {
			var file = req.files.uploaded_image;
			var img_name=file.name;			
			img = img_name;	
			if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){	
				file.mv('public/images/siaranpers/big/'+file.name, function(err) {								
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
				file.mv('public/images/siaranpers/small/'+file.name, function(err) {								
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
				file.mv('public/images/siaranpers/thumb/'+file.name, function(err) {								
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
			} else {
				message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
				req.flash('msg_error', message);
			}
		}
		var data = {            
			judul   	: input.judul,
			tgl_event	: new Date(input.tgl_event).toLocaleString(),
            keterangan	: input.editorkalenderevent,
			tgl_post   	: new Date(Date.now()).toLocaleString(),
			id_opd		: session.id_opd,
			id_user		: session.id_user,
			gambar		: img
		};
		var query = connection.query('INSERT INTO d_kalenderevent SET ?', data,
		function(err, result) {		
			console.log(err);
			if (result)
				res.redirect('/adm-kalenderevent-detail/'+result.insertId);
		});
	});
});

router.get('/adm-kalenderevent-edit/(:id)',
authentication_mdl.is_login,
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_kalenderevent where id_kalenderevent='+req.params.id,function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			var kalenderevent = rows[0];
			res.render('admin/adm-kalenderevent-edit',{
				title:'Data Kalender Event',
				kalenderevent:kalenderevent,
				menu:'adm-kalenderevent-edit',
				session: req.session
			});
		});
	});
});

router.post('/adm-kalenderevent-edit', 
authentication_mdl.is_login, 
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_kalenderevent = input.id_kalenderevent;
		var img = '';
		if (req.files) {
			var file = req.files.uploaded_image;
			var img_name=file.name;			
			img = img_name;	
			if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){	
				file.mv('public/images/siaranpers/big/'+file.name, function(err) {								
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
				file.mv('public/images/siaranpers/small/'+file.name, function(err) {								
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
				file.mv('public/images/siaranpers/thumb/'+file.name, function(err) {								
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
			} else {
				message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
				req.flash('msg_error', message);
			}
		}
		var data = {            
            judul   	: input.judul,
			tgl_event	: new Date(input.tgl_event).toLocaleString(),
            keterangan	: input.isi,
			tgl_edit   	: new Date(Date.now()).toLocaleString(),
			id_opd		: session.id_opd,
			id_user		: session.id_user,
			gambar		: img
		};
		var query = connection.query('UPDATE d_kalenderevent SET ? WHERE id_kalenderevent = '+id_kalenderevent, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-kalenderevent-detail/'+result.insertId);
		});
	});
});

router.get('/adm-kalenderevent-delete/(:id)', 
authentication_mdl.is_login,
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_kalenderevent = req.params.id;
		console.log(id_kalenderevent);
		var query = connection.query('DELETE FROM d_kalenderevent WHERE id_kalenderevent='+id_kalenderevent, function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-kalenderevent-list/');
		});
	});
});

//MODUL GALLERY ALBUM
router.get('/adm-gallery-album',
authentication_mdl.is_login,
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_gallery_album ORDER BY tgl_post DESC',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-gallery-album',{
				title:'Data Gallery',
				gallery_album:rows,
				menu:'adm-gallery-album',
				session: req.session
			});
		});
	});
});

router.get('/adm-gallery-list/(:id)',
authentication_mdl.is_login,
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT d_gallery.*, d_gallery_album.nama as nama_album FROM d_gallery LEFT JOIN d_gallery_album ON d_gallery_album.id_gallery_album = d_gallery.id_gallery_album WHERE d_gallery.id_gallery_album='+req.params.id+' ORDER BY d_gallery.tgl_post DESC',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			console.log(rows);
			res.render('admin/adm-gallery-list',{
				title:'Data Gallery',
				gallery:rows,
				menu:'adm-gallery-list',
				session: req.session
			});
		});
	});
});

router.get('/adm-gallery-detail/(:id)',
authentication_mdl.is_login,
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM gallery where id_gallery='+req.params.id,function(err,rows)
		{
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errors_detail);
				res.redirect('/adm-gallery-list');
			}else
			{
				if(rows.length <=0)
				{
					req.flash('msg_error', "Gallery Tidak Ditemukan"); 
					res.redirect('/adm-gallery-list');
				}
				else
				{	
					console.log(rows);
					res.render('admin/adm-gallery-detail',{
						title:"Gallery",gallery:rows[0],
						menu:'adm-gallery-detail',
						session: req.session
					});
				}
			}
		});
	});
});

router.get('/adm-gallery-tambah',
authentication_mdl.is_login,
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_gallery',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-gallery-tambah',{
				title:'Data Gallery',
				menu:'adm-gallery-tambah',
				session: req.session
			});
		});
	});
});

router.post('/adm-gallery-tambah',
authentication_mdl.is_login,
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var data = {            
			nama   		: input.nama,
			tgl_post   	: new Date(Date.now()).toLocaleString(),
			id_user		: session.id_user
		};
		var query = connection.query('INSERT INTO d_gallery_album SET ?', data,
		function(err, result) {		
			console.log(err);
			if (result)
				var id_gallery_album = result.insertId;
				var img = '';
				if (req.files) {
					console.log(req.files);
					var files = req.files.uploaded_image;
					if (files.length >= 1){
						files.forEach(function(file, index, arr) {
							var img_name=file.name;			
							img = img_name;	
							if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){	
								file.mv('public/images/gallery/big/'+file.name, function(err) {								
									if (err)
										var errornya  = ("Error Memilih : %s ",err );
									req.flash('msg_error', errornya);
								});
								file.mv('public/images/gallery/small/'+file.name, function(err) {								
									if (err)
										var errornya  = ("Error Memilih : %s ",err );
									req.flash('msg_error', errornya);
								});
								file.mv('public/images/gallery/thumb/'+file.name, function(err) {								
									if (err)
										var errornya  = ("Error Memilih : %s ",err );
									req.flash('msg_error', errornya);
								});
							} else {
								message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
								req.flash('msg_error', message);
							}
							var data = {            
								gambar   		: img,
								tgl_post   		: new Date(Date.now()).toLocaleString(),
								id_gallery_album:id_gallery_album,
								id_user			: session.id_user
							};
							var query = connection.query('INSERT INTO d_gallery SET ?', data,
							function(err, result) {		
								console.log(err);
								if (result)	
									console.log(result);			
							});
						})		
					}
					else {
						var file = files;
						var img_name=file.name;			
						img = img_name;	
						if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){	
							file.mv('public/images/gallery/big/'+file.name, function(err) {								
								if (err)
									var errornya  = ("Error Memilih : %s ",err );
								req.flash('msg_error', errornya);
							});
							file.mv('public/images/gallery/small/'+file.name, function(err) {								
								if (err)
									var errornya  = ("Error Memilih : %s ",err );
								req.flash('msg_error', errornya);
							});
							file.mv('public/images/gallery/thumb/'+file.name, function(err) {								
								if (err)
									var errornya  = ("Error Memilih : %s ",err );
								req.flash('msg_error', errornya);
							});
						} else {
							message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
							req.flash('msg_error', message);
						}
						var data = {            
							gambar   		: img,
							tgl_post   		: new Date(Date.now()).toLocaleString(),
							id_gallery_album:id_gallery_album,
							id_user			: session.id_user
						};
						var query = connection.query('INSERT INTO d_gallery SET ?', data,
						function(err, result) {		
							console.log(err);
							if (result)	
								console.log(result);			
						});
					}			
				}
				res.redirect('/adm-gallery-list/'+id_gallery_album);
		});		
	});
});

router.get('/adm-gallery-delete/(:id)/(:id2)',
authentication_mdl.is_login,
function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_gallery = req.params.id;
		console.log(id_gallery);
		var query = connection.query('DELETE FROM d_gallery WHERE id_gallery='+id_gallery, function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-gallery-list/'+req.params.id2);
		});
	});
});

router.get('/adm-email-baca', 
function(req, res, next) {
	res.render('admin/adm-email-baca', { 
		title: 'E-Mail Masuk', 
		menu: 'adm-email-baca'
	});
});

router.get('/adm-email-draft', function(req, res, next) {
  res.render('admin/adm-email-draft', { title: 'Draft', menu: 'adm-email-draft' });
});

router.get('/adm-email-inbox', function(req, res, next) {
  res.render('admin/adm-email-inbox', { title: 'Inbox', menu: 'adm-email-inbox' });
});

router.get('/adm-email-junk', function(req, res, next) {
  res.render('admin/adm-email-junk', { title: 'Junk', menu: 'adm-email-junk' });
});

router.get('/adm-email-kotakkeluar', function(req, res, next) {
  res.render('admin/adm-email-kotakkeluar', { title: 'Kotak Keluar', menu: 'adm-email-kotakkeluar' });
});

router.get('/adm-email-tulis', function(req, res, next) {
  res.render('admin/adm-email-tulis', { title: 'Tulis E-Mail', menu: 'adm-email-tulis' });
});

router.get('/adm-email-terhapus', function(req, res, next) {
  res.render('admin/adm-email-terhapus', { title: 'Item Terhapus', menu: 'adm-email-terhapus' });
});

router.get('/adm-email-terkirim', function(req, res, next) {
  res.render('admin/adm-email-terkirim', { title: 'Item Terkirim', menu: 'adm-email-terkirim' });
});

router.get('/adm-profil-setting', 
authentication_mdl.is_login, 
user_single_data, 
opd_data, 
status_peg_data, 
gol_ruang_data, 
eselon_data, 
jabatan_data, 
agama_data, 
pendidikan_data, 
pendidikan_umum_data, 
kel_data, 
kec_data, 
kotakab_data, 
function(req, res, next) {
	var opd_rows = req.opd;
	var status_peg_rows = req.status_peg;
	var gol_ruang_rows = req.gol_ruang;
	var eselon_rows = req.eselon;
	var jabatan_rows = req.jabatan;
	var agama_rows = req.agama;
	var pendidikan_rows = req.pendidikan;
	var pendidikan_umum_rows = req.pendidikan_umum;
	var kel_rows = req.kel;
	var kec_rows = req.kec;
	var kotakab_rows = req.kotakab;	
	var session = req.session;
	var user_row = req.user;
	console.log(user_row);
	req.getConnection(function(err,connection){		
		var query = connection.query('SELECT m_peg.*, m_agama.agama as nama_agama, m_kel.kel as nama_kel, m_kec.kec as nama_kec, m_kotakab.kotakab as nama_kotakab, m_status_peg.ket_peg as nama_ket_peg, m_gol.gol as gol, m_gol.ruang as ruang, m_eselon.eselon as nama_eselon, m_jabatan.jabatan as nama_jabatan, m_pend.tk_pend as tk_pend, m_pend.ket_pend as ket_pend, m_pend_umum.pendidikan_umum as pendidikan_umum, m_opd.nama_opd as nama_opd FROM m_peg LEFT JOIN m_agama ON m_agama.id_agama = m_peg.agama LEFT JOIN m_kel ON m_kel.id_kel = m_peg.alamat_kel LEFT JOIN m_kec ON m_kec.id_kec = m_peg.alamat_kec LEFT JOIN m_kotakab ON m_kotakab.id_kotakab = m_peg.alamat_kota LEFT JOIN m_status_peg ON m_status_peg.id_status_peg = m_peg.status_peg LEFT JOIN m_gol ON m_gol.id_gol = m_peg.gol_ruang LEFT JOIN m_eselon ON m_eselon.id_eselon = m_peg.eselon LEFT JOIN m_jabatan ON m_jabatan.id_jabatan = m_peg.jabatan LEFT JOIN m_pend ON m_pend.id_pend = m_peg.pend_terakhir LEFT JOIN m_pend_umum ON m_pend_umum.id_pend_umum = m_peg.pend_umum LEFT JOIN m_opd ON m_opd.id_opd = m_peg.id_opd WHERE m_peg.id_peg='+user_row.id_peg,function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-profil-setting',{ 
				title: 'Pengaturan Profil', 
				menu: 'adm-profil-setting', 
				member:rows[0], 
				session: req.session, 
				opd:opd_rows, 
				status_peg:status_peg_rows, 
				gol_ruang:gol_ruang_rows, 
				eselon:eselon_rows, 
				jabatan:jabatan_rows, 
				agama:agama_rows, 
				pendidikan:pendidikan_rows, 
				pendidikan_umum:pendidikan_umum_rows, 
				kel:kel_rows, 
				kec:kec_rows, 
				kotakab:kotakab_rows
			});
		});
	});
  	// res.render('admin/adm-profil-setting', { title: 'Pengaturan Profil', menu: 'adm-profil-setting', session: req.session });
});

router.post('/adm-profile-edit', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_peg = input.id_peg;
		var data = input;
		console.log(data);
		var query = connection.query('UPDATE m_peg SET ? WHERE id_peg = '+id_peg, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-profil-setting/');
		});
	});
});

router.get('/adm-profile-picture/(:id)', authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){		
		var query = connection.query('SELECT * FROM m_peg WHERE id_peg='+req.params.id,function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-profile-picture',{ title: 'Pengaturan Profil', menu: 'adm-profile-picture', member:rows[0], session: req.session});
		});
	});
  	// res.render('admin/adm-profil-setting', { title: 'Pengaturan Profil', menu: 'adm-profil-setting', session: req.session });
});

router.post('/adm-profile-picture', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_peg = input.id_peg;
		var img = '';
		if (req.files) {
			var file = req.files.uploaded_image;
			var img_name=file.name;			
			img = img_name;	
			if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){	
				file.mv('public/images/pegawai/big/'+file.name, function(err) {								
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
				file.mv('public/images/pegawai/small/'+file.name, function(err) {								
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
			} else {
				message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
				req.flash('msg_error', message);
			}
		}
		var data = {            
			foto_peg		: img
		};
		var query = connection.query('UPDATE m_peg SET ? WHERE id_peg = '+id_peg, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-profil-setting');
		});
	});
});

router.get('/adm-profile-akun/(:id)', authentication_mdl.is_login, user_single_data, function(req, res, next) {
	req.getConnection(function(err,connection){		
		var query = connection.query('SELECT * FROM m_peg WHERE id_peg='+req.params.id,function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-profile-akun',{ title: 'Pengaturan Profil', menu: 'adm-profile-picture', member:rows[0], session: req.session, user:req.user});
		});
	});
  	// res.render('admin/adm-profil-setting', { title: 'Pengaturan Profil', menu: 'adm-profil-setting', session: req.session });
});

router.post('/adm-profile-akun', authentication_mdl.is_login, user_single_data, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_peg = input.id_peg;		
		var user=req.user;
		var data = {
			username:input.username,
			paswd:input.password?input.password:user.paswd
		};
		console.log(data);
		var query = connection.query('UPDATE d_users SET ? WHERE id_peg = '+id_peg, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-profil-setting');
		});
	});
});

router.get('/adm-download-list', authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_download',function(err,rows)
		{
		if(err)
				var errornya  = ("Error Memilih : %s ",err );
				req.flash('msg_error', errornya);
				res.render('admin/adm-download-list',{title:"Data Download",all_download:rows, menu:'adm-download-list', session: req.session});
		});
         //console.log(query.sql);
     });
});

router.get('/adm-download-detail/(:id)', authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_download WHERE id_download='+req.params.id,function(err,rows)
		{
		if(err)
				var errornya  = ("Error Memilih : %s ",err );
				req.flash('msg_error', errornya);
				res.render('admin/adm-download-detail',{title:"Data Download",download:rows, menu:'adm-download-detail', session: req.session});
		});
         //console.log(query.sql);
     });
});

router.get('/adm-download-tambah', authentication_mdl.is_login, opd_data, jenis_file_data, kategori_file_data, function(req, res, next) {
	var opd_rows = req.opd;
	var jenis_file_rows = req.jenis_file;
	var kategori_file_rows = req.kategori_file;
	res.render('admin/adm-download-tambah',{ title: 'Tambah Download', menu: 'adm-download-tambah', session: req.session, opd:opd_rows, jenis_file:jenis_file_rows, kategori_file:kategori_file_rows});	
});

router.post('/adm-download-tambah', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;	
		var link_file = '';
		if (req.files) {
			var file = req.files.uploaded_file;
			var link_file_name=file.name;			
			link_file = link_file_name;	
			file.mv('download/'+file.name, function(err) {								
				if (err)
					var errornya  = ("Error Memilih : %s ",err );
				req.flash('msg_error', errornya);
			});
		}
		var data = {
			id_opd:input.id_opd,
			nama_file:input.nama_file,
			deskripsi_file:input.deskripsi_file,
			jenis_file:input.jenis_file,
			kategori_file:input.kategori_file,
			tgl_file:input.tgl_file,
			status_file:input.status_file,
			link_file:link_file
		};
		var query = connection.query('INSERT INTO d_download SET ?', data,
		function(err, result) {		
			console.log(err);
			if (result)
				res.redirect('/adm-download-list/');
		});
	});
});

router.get('/adm-download-edit/(:id)', authentication_mdl.is_login, opd_data, jenis_file_data, kategori_file_data, function(req, res, next) {
	var opd_rows = req.opd;
	var jenis_file_rows = req.jenis_file;
	var kategori_file_rows = req.kategori_file;
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT d_download.*, m_opd.nama_opd as nama_opd, m_dip_jenis_file.jenis_file as nama_jenis_file, m_dip_kategori.kategori_dip as kategori_dip FROM d_download LEFT JOIN m_opd ON d_download.id_opd = m_opd.id_opd LEFT JOIN m_dip_jenis_file ON d_download.jenis_file = m_dip_jenis_file.id_jenis_file LEFT JOIN m_dip_kategori ON d_download.kategori_file = m_dip_kategori.id_kategori_dip where d_download.id_download='+req.params.id,function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-download-edit',{ title: 'Edit Download', menu: 'adm-download-edit', download:rows[0], session: req.session, opd:opd_rows, jenis_file:jenis_file_rows, kategori_file:kategori_file_rows});
		});
	});
});

router.post('/adm-download-edit', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var link_file = input.link_file;
		if (req.files) {
			var file = req.files.uploaded_image;
			var link_file_name=file.name;			
			link_file = link_file_name;	
			file.mv('download/'+file.name, function(err) {								
				if (err)
					var errornya  = ("Error Memilih : %s ",err );
				req.flash('msg_error', errornya);
			});
		}
		var data = {
			id_opd:input.id_opd,
			nama_file:input.nama_file,
			deskripsi_file:input.deskripsi_file,
			jenis_file:input.jenis_file,
			kategori_file:input.kategori_file,
			status_file:input.status_file,
			tgl_file:input.tgl_file,
			link_file:link_file
		};
		console.log(data);
		var query = connection.query('UPDATE d_download SET ? WHERE id_download = '+input.id_download, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-download-list/');
		});
	});
});

router.get('/adm-download-delete/(:id)', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_download = req.params.id;
		var query = connection.query('DELETE FROM d_download WHERE id_download = '+id_download,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-download-list/');
		});
	});
});

//MODUL DOWNLOAD AREA
router.get('/adm-download-kategori',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_dip_jenis_file',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			// console.log(rows);
			res.render('admin/adm-download-kategori',{title:'Data Download Kategori', kategori_download_list:rows, menu:'adm-download-kategori', session: req.session });
		});
	});
});

router.post('/adm-download-kategori-tulis', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var data = {            
			kategori		: input.kategori
		};
		var query = connection.query('INSERT INTO m_dip_jenis_file SET ?', data,
		function(err, result) {		
			console.log(err);
			if (result)
				res.redirect('/adm-download-kategori/');
		});
	});
});

router.get('/adm-download-kategori-edit/(:id)', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_kategori = req.params.id;
		var data = {            
			kategori		: input.kategori
		};
		var query = connection.query('UPDATE m_dip_jenis_file SET ? WHERE id_kategori = '+id_kategori, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-download-kategori/');
		});
	});
});

router.get('/adm-download-kategori-delete/(:id)', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_kategori = req.params.id;
		var query = connection.query('DELETE FROM m_dip_jenis_file WHERE id_kategori = '+id_kategori,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-download-kategori/');
		});
	});
});

//MODUL MEMBER
router.get('/adm-member-list', authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_users_active',function(err,rows)
		{
		if(err)
				var errornya  = ("Error Memilih : %s ",err );
				req.flash('msg_error', errornya);
				res.render('admin/adm-member-list',{title:"Data Member",all_member:rows, menu:'adm-member-list', session: req.session});
		});
         //console.log(query.sql);
     });
});

router.get('/adm-member-detail/(:id)', authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_users_active where id_user='+req.params.id,function(err,rows)
		{
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errors_detail);
				res.redirect('/adm-member-list');
			}else
			{
				if(rows.length <=0)
				{
					req.flash('msg_error', "Member Tidak Ditemukan"); 
					res.redirect('/adm-member-list');
				}
				else
				{	
					console.log(rows);
					res.render('admin/adm-member-detail',{title:"Member",member:rows[0], menu:'adm-member-detail', session: req.session});
				}
			}
		});
	});
});

router.get('/adm-member-tambah', 
authentication_mdl.is_login, 
peg_data, 
hakakses_data, 
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_users',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-member-tambah',{
				title:'Data Member', 
				menu:'adm-member-tambah', 
				session: req.session, 
				peg:req.peg, 
				hakakses:req.hakakses
			});
		});
	});
});

router.post('/adm-member-tambah', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;		
		var data = input;
		data.status_user = '1';
		var query = connection.query('INSERT INTO d_users SET ?', data,
		function(err, result) {		
			console.log(err);
			if (result)
				res.redirect('/adm-member-detail/'+result.insertId);
		});
	});
});

router.get('/adm-member-edit/(:id)', authentication_mdl.is_login, peg_data, hakakses_data, function(req, res, next) {
	req.getConnection(function(err,connection){
		console.log(req.params.id);
		var query = connection.query('SELECT d_users.*, m_hakakses.hakakses as hakakses, m_peg.nama as nama FROM d_users LEFT JOIN m_hakakses ON d_users.id_hakakses = m_hakakses.id_hakaskses LEFT JOIN m_peg ON d_users.id_peg = m_peg.id_peg where d_users.username='+req.params.id, function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);	
			console.log(rows);
			var member = rows[0];
			res.render('admin/adm-member-edit',{title:'Member Event', member:member, menu:'adm-member-edit', session: req.session, peg:req.peg, hakakses:req.hakakses});
		});
	});
});

router.post('/adm-member-edit', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_user = input.id_user;		
		var data = input;
		var query = connection.query('UPDATE d_users SET ? WHERE id_user = '+id_user, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-member-detail/'+result.insertId);
		});
	});
});

router.get('/adm-member-delete/(:id)', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var username = req.params.id;
		var query = connection.query('DELETE FROM d_users WHERE username='+username, function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-member-list/');
		});
	});
});

//MODUL HALAMAN MENU PROFILE
router.get('/adm-halaman-list', authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_halaman',function(err,rows)
		{
		if(err)
				var errornya  = ("Error Memilih : %s ",err );
				req.flash('msg_error', errornya);
				res.render('admin/adm-halaman-list',{title:"Halaman",halaman_profil:rows, menu:'adm-halaman-list', session: req.session});
		});
         //console.log(query.sql);
     });
});

router.get('/adm-halaman-detail/(:id)',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_halaman where id_halaman='+req.params.id,function(err,rows)
		{
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errors_detail);
				res.redirect('/adm-halaman-list');
			}else
			{
				if(rows.length <=0)
				{
					req.flash('msg_error', "Halaman Tidak Ditemukan"); 
					res.redirect('/adm-halaman-list');
				}
				else
				{	
					console.log(rows);
					res.render('admin/adm-halaman-detail',{title:"Halaman ",halaman_profil:rows[0], menu:'adm-halaman-detail', session: req.session});

				}
			}
		});
	});
});

router.get('/adm-halaman-tambah', authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_halaman',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-halaman-tambah',{title:'Data Halaman', menu:'adm-halaman-tambah', session: req.session });
		});
	});
});

router.post('/adm-halaman-tambah', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		console.log(img);
		var data = {            
            judulhalaman   : input.judulhalaman,
            isihalaman 	   : input.editorhalaman,
		};
		var query = connection.query('INSERT INTO m_halaman SET ?', data,
		function(err, result) {		
			console.log(err);
			if (result)
				res.redirect('/adm-halaman-detail/'+result.insertId);
		});
	});
});

router.get('/adm-halaman-edit/(:id)', authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM m_halaman where id_halaman='+req.params.id,function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			var halaman_profil = rows[0];
			console.log(halaman_profil);
			res.render('admin/adm-halaman-edit',{title:'Data Halaman', halaman_profil:halaman_profil, menu:'adm-halaman-edit', session: req.session });
		});
	});
});

router.post('/adm-halaman-edit', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_halaman = input.id_halaman;
		var data = {            
            judul_halaman   	: input.judulhalaman,
            isi_halaman 		: input.editorhalamanprofil,
		};
		var query = connection.query('UPDATE m_halaman SET ? WHERE id_halaman = '+id_halaman, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-halaman-detail/'+result.insertId);
		});
	});
});

router.get('/adm-halaman-delete/(:id)', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_halaman = req.params.id;
		var query = connection.query('DELETE FROM m_halaman WHERE id_halaman = '+id_halaman,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-halaman-list/');
		});
	});
});

//MODUL SLIDESHOW
router.get('/adm-slideshow-list',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT d_berita.*, d_berita_kategori.kategori as kategori, m_peg.gelar_depan as gelar_depan, m_peg.gelar_belakang as gelar_belakang, m_peg.nama as penulis FROM d_berita LEFT JOIN d_berita_kategori ON d_berita.id_kategori = d_berita_kategori.id_kategori LEFT JOIN d_users ON d_berita.id_user = d_users.id_user LEFT JOIN m_peg ON d_users.id_peg = m_peg.id_peg ORDER BY tgl_post DESC',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			// console.log(rows);
			res.render('admin/adm-slideshow-list',{title:'Data Artikel', artikel_list:rows, menu:'adm-slideshow-list', session: req.session });
		});
	});
});

router.get('/adm-slideshow-detail/(:id)',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_berita where id_berita='+req.params.id,function(err,rows)
		{
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errors_detail);
				res.redirect('/adm-slideshow-list');
			}else
			{
				if(rows.length <=0)
				{
					req.flash('msg_error', "Berita Tidak Ditemukan"); 
					res.redirect('/adm-slideshow-list');
				}
				else
				{	
					console.log(rows);
					res.render('admin/adm-slideshow-detail',{title:"Berita ",artikel:rows[0], menu:'adm-slideshow-detail', session: req.session});

				}
			}
		});
	});
});

router.get('/adm-slideshow-tulis', authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_berita_kategori',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('admin/adm-slideshow-tulis',{title:'Data Artikel', kategori:rows, menu:'adm-slideshow-tulis', session: req.session });
		});
	});
});

router.post('/adm-slideshow-tulis', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var img = '';
		if (req.files) {
			var file = req.files.uploaded_image;
			var img_name=file.name;			
			img = img_name;	
			if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){	
				file.mv('public/images/berita/big/'+file.name, function(err) {								
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
				file.mv('public/images/berita/small/'+file.name, function(err) {								
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
				file.mv('public/images/berita/thumb/'+file.name, function(err) {								
					if (err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
				});
			} else {
				message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
				req.flash('msg_error', message);
			}
		}
				
		console.log(img);
		var data = {            
            judul_berita   	: input.title,
            isi_berita 		: input.editorberita,
			tgl_post   		: new Date(Date.now()).toLocaleString(),
			id_opd			: session.id_opd,
			id_user			: session.id_user,
			id_kategori		: input.kategori,
			gambar			: img
		};
		var query = connection.query('INSERT INTO d_berita SET ?', data,
		function(err, result) {		
			console.log(err);
			if (result)
				res.redirect('/adm-slideshow-detail/'+result.insertId);
		});
	});
});

 router.get('/adm-slideshow-edit/(:id)', authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_berita where id_berita='+req.params.id,function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			var berita = rows[0];
			var query = connection.query('SELECT * FROM d_berita_kategori',function(err,rows)
			{
				if(err)
					var errornya  = ("Error Memilih : %s ",err );
				req.flash('msg_error', errornya);
				var kategori = rows;
				var query = connection.query('SELECT * FROM d_berita_kategori where id_kategori='+berita.id_kategori,function(err,rows)
				{
					if(err)
						var errornya  = ("Error Memilih : %s ",err );
					req.flash('msg_error', errornya);
					var kategori_artikel = rows[0];
					res.render('admin/adm-slideshow-edit',{title:'Data Artikel', kategori:kategori, kategori_artikel:kategori_artikel, artikel:berita, menu:'adm-slideshow-edit', session: req.session });
				});
			});
		});
	});
});

router.post('/adm-slideshow-edit', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_berita = input.id_berita;
		var data = {            
            judul_berita   	: input.title,
            isi_berita 		: input.editorberita,
			tgl_edit   		: new Date(Date.now()).toLocaleString(),
			tgl_terbit		: input.publish==1? new Date(Date.now()).toLocaleString():'',
			id_opd			: session.id_opd,
			id_user			: session.id_user,
			id_kategori		: input.kategori,
			tayang_umum		: input.publish
		};
		var query = connection.query('UPDATE d_berita SET ? WHERE id_berita = '+id_berita, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-slideshow-detail/'+result.insertId);
		});
	});
});

router.get('/adm-slideshow-delete/(:id)', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_berita = req.params.id;
		var query = connection.query('DELETE FROM d_berita WHERE id_berita = '+id_berita,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-slideshow-list/');
		});
	});
});

router.get('/adm-slideshow-terbitkan/(:id)', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_berita = req.params.id;
		var data = {            
			tayang_umum		: '1',
			tgl_terbit		: new Date(Date.now()).toLocaleString()
		};
		var query = connection.query('UPDATE d_berita SET ? WHERE id_berita = '+id_berita, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-slideshow-list/');
		});
	});
});

router.get('/adm-slideshow-kategori',authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM d_berita_kategori',function(err,rows)
		{
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			// console.log(rows);
			res.render('admin/adm-slideshow-kategori',{title:'Data Kategori', kategori_list:rows, menu:'adm-artikel-kategori', session: req.session });
		});
	});
});

router.post('/adm-slideshow-kategori-tulis', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var data = {            
			kategori		: input.kategori
		};
		var query = connection.query('INSERT INTO d_berita_kategori SET ?', data,
		function(err, result) {		
			console.log(err);
			if (result)
				res.redirect('/adm-slideshow-kategori/');
		});
	});
});

router.get('/adm-slideshow-kategori-edit/(:id)', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_kategori = req.params.id;
		var data = {            
			kategori		: input.kategori
		};
		var query = connection.query('UPDATE d_berita_kategori SET ? WHERE id_kategori = '+id_kategori, data,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-slideshow-kategori/');
		});
	});
});

router.get('/adm-slideshow-kategori-delete/(:id)', authentication_mdl.is_login, function(req,res,next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connection){
		var session = req.session.user;
		var id_kategori = req.params.id;
		var query = connection.query('DELETE FROM d_berita_kategori WHERE id_kategori = '+id_kategori,
		function(err, result) {			
			console.log(result);
			console.log(err);
			if (result)
				res.redirect('/adm-slideshow-kategori/');
		});
	});
});

router.get('/adm-slideshow-editor', authentication_mdl.is_login, function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_users_active WHERE id_hakakses = 2',function(err,rows)
		{
		if(err)
				var errornya  = ("Error Memilih : %s ",err );
				req.flash('msg_error', errornya);
				res.render('admin/adm-slideshow-editor',{title:"Data Editor",all_pegawai:rows, menu:'adm-slideshow-editor', session: req.session});
		});
         //console.log(query.sql);
     });
});

module.exports = router;