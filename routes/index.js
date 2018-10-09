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
		var sess = req.session.user.id_opd;
		var query = connection.query('SELECT * FROM v_peg_jum WHERE id_opd='+sess,function(err,rows)
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

function siaranpers_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_siaranpers',function(err,rows)
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

function siaranperskhusus_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_siaranpers_khusus',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else
				req.siaranperskhusus = rows;
				next();
		});
	 });
}

function kalenderevent_data(req, res, next)
{
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_kalenderevent',function(err,rows)
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
		var query = connection.query('SELECT * FROM v_subdomain LIMIT 0, 10',function(err,rows)
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
		var query = connection.query('SELECT * FROM v_gallery_album ORDER BY tgl_terbit ASC',function(err,rows)
		{
			if(err){
				var errornya  = ("Error Memilih : %s ",err );
				console.log(errornya);
			} else 
				req.gallery_album = rows;
				next();
		});
	 });
}

function gallery_data(req, res, next)
{
	var session = req.session;
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_gallery ORDER BY tgl_terbit ASC',function(err,rows)
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

/* 	----------------FRONTEND---------------- */
/* 	-------INDEX------- */
router.get('/', 
siaranpers_data, 
siaranperskhusus_data,
berita_populer_data, 
kategori_berita,
kalenderevent_data, 
data_subdomain,
pranala_data,
data_download_home,
function(req, res, next) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_berita_home',function(err,rows)
		{
			accesslog(req, res);
			if(err)
				var errornya  = ("Error Memilih : %s ",err );
			req.flash('msg_error', errornya);
			res.render('portal/index', {
				title:"Pemerintah Kota Tanjungpinang",
				menu:'/', 
				beritahome:rows, 
				beritapopuler: req.berita_populers,
				beritakat:req.kategoriberita,
				datadownloadhome:req.datadownloadhome,
				siaranpers:req.siaranpers, 
				siaranperskhusus:req.siaranperskhusus, 
				datasubdomain:req.data_subdomains,
				kalenderevent:req.kalenderevents,
				pranala:req.pranala,
				session: req.session
			});
		});
         //console.log(query.sql);
	});
});
/* 	-------AKHIR INDEX------- */
/*
router.get('/tes2', 
berita_populer_data,
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/tes', { 
		title: 'Tes', 
		menu:'data/tes',
		desc: 'Halaman Tes ',
		desc2:'di Lingkungan Pemerintah Kota Tanjungpinang',
		icon: 'fa-users',
		beritapopuler: req.berita_populers,
		datadownloadhome:req.datadownloadhome,
		datasubdomain:req.data_subdomains,
		pranala:req.pranala,
		session: req.session
	});
});
*/
router.get('/tes2',
function(req, res){
	panggilApi.panggilBerita(function (data){
		res.render('portal/tes', {
			title: 'Tes',
			menu:'data/tes',
			desc: 'Halaman Tes ',
			desc2:'di Lingkungan Pemerintah Kota Tanjungpinang',
			icon: 'fa-users',
			berita:data.berita
		});
	});
});

router.get('/tes2/(:link)',
	siaranpers_data, 
	berita_populer_data, 
	kategori_berita,
	kalenderevent_data, 
	data_subdomain,
	data_download_home,
	pranala_data,
	function(req, res, next) {
  		//panggil fungsi panggilApi dengan methode apiGET dan create callback function
		panggilApi.panggilBerita(function (data) {
		    // render to the index.jade dan pass data dari panggilan api
		    let id = req.params.link;
			let dataKeluaran;
		    data.berita.forEach((keluaran)=>{
		    	if(keluaran.link_berita == id) {
		    		dataKeluaran = keluaran;
		    	}
		    });
		    res.render('portal/tes', {
		    	title:dataKeluaran.judul_berita,
				bread1:'Berita',
				bread1_url:'berita',
				beritapopuler: req.berita_populers,
				beritakat:req.kategoriberita,
				session_store:req.session, 
				siaranpers:req.siaranpers, 
				siaranperskhusus:siaranperskhusus_data, 
				datadownloadhome:req.datadownloadhome,
				datasubdomain:req.data_subdomains,
				kalenderevent:req.kalenderevents,
				pranala:req.pranala,
				session: req.session,
		    	berita :dataKeluaran
		    });
		});
	});

/* 	-------HALAMAN DIP------- */
router.get('/data/dip', 
berita_populer_data, 
data_download,
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	panggilApi.panggilOpd(function (data) {
		res.render('portal/data', { 
			title: 'Daftar Informasi Publik', 
			menu:'data/dip',
			bread1:'Data',
			bread1_url:'data',
			desc: 'Daftar Informasi Publik ',
			desc2:'di Lingkungan Pemerintah Kota Tanjungpinang',
			icon: 'fa-file-text-o',
			beritapopuler: req.berita_populers,
			datasubdomain:req.data_subdomains,
			datadownload:req.datadownload,
			datadownloadhome:req.datadownloadhome,
			pranala:req.pranala,
			opd :data.opd,
			session: req.session
		});
	});
});


/* 	-------HALAMAN BERITA------- */
router.get('/berita', 
siaranpers_data, 
siaranperskhusus_data, 
berita_populer_data, 
kategori_berita,
kalenderevent_data, 
data_subdomain,
data_download_home,
pranala_data,
function(req, res) {
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM v_berita',function(err,rows)
		{
			accesslog(req, res);
			if(err)
				var errornya  = ("Error Selecting : %s ",err );
			req.flash('msg_error', errornya);
			res.render('portal/berita',{
				title:'Berita',
				menu: 'berita',
				desc: 'Berita / Artikel ',
				desc2:'di Lingkungan Pemerintah Kota Tanjungpinang',
				icon: 'linecons-note',
				beritaall:rows, 
				beritapopuler: req.berita_populers,
				beritakat:req.kategoriberita,
				datadownloadhome:req.datadownloadhome,
				session_store:req.session, 
				siaranpers:req.siaranpers, 
				siaranperskhusus:req.siaranperskhusus, 
				datasubdomain:req.data_subdomains,
				kalenderevent:req.kalenderevents,
				pranala:req.pranala,
				session: req.session
			});
		});
	});
});
router.get('/berita/(:link)',
	siaranpers_data, 
	berita_populer_data, 
	kategori_berita,
	kalenderevent_data, 
	data_subdomain,
	data_download_home,
	pranala_data,
	function(req, res, next) {
  		//panggil fungsi panggilApi dengan methode apiGET dan create callback function
		panggilApi.panggilBerita(function (data) {
		    // render to the index.jade dan pass data dari panggilan api
		    let id = req.params.link;
			let dataKeluaran;
		    data.berita.forEach((keluaran)=>{
		    	if(keluaran.link_berita == id) {
		    		dataKeluaran = keluaran;
		    	}
		    });
		    res.render('portal/berita-single', {
		    	title:dataKeluaran.judul_berita,
				bread1:'Berita',
				bread1_url:'berita',
				beritapopuler: req.berita_populers,
				beritakat:req.kategoriberita,
				session_store:req.session, 
				siaranpers:req.siaranpers, 
				siaranperskhusus:siaranperskhusus_data, 
				datadownloadhome:req.datadownloadhome,
				datasubdomain:req.data_subdomains,
				kalenderevent:req.kalenderevents,
				pranala:req.pranala,
				session: req.session,
		    	berita :dataKeluaran
		    });
		});
	});

router.get('/berita/view/(:link)', 
siaranpers_data, 
siaranperskhusus_data,
berita_populer_data, 
kategori_berita,
kalenderevent_data, 
data_subdomain,
data_download_home,
pranala_data,
function(req,res,next){
	req.getConnection(function(err,connection){
		var id_berita =req.params.link;
		var query = connection.query('SELECT * FROM v_berita where id_berita='+id_berita,function(err,rows)
		{
			accesslog(req, res);
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errors_detail);
				res.redirect('/berita');
			}else
			{
				if(rows.length <=0)
				{
					req.flash('msg_error', "Berita Tidak Ditemukan"); 
					res.redirect('/berita');
				}
				else
				{	
					res.render('portal/berita-single',{
						title:"Berita ", 
						beritaview:rows[0], 
						beritapopuler: req.berita_populers,
						beritakat:req.kategoriberita,
						session_store:req.session, 
						siaranpers:req.siaranpers, 
						siaranperskhusus:req.siaranperskhusus, 
						datadownloadhome:req.datadownloadhome,
						datasubdomain:req.data_subdomains,
						kalenderevent:req.kalenderevents,
						pranala:req.pranala,
						session: req.session
					});
				}
			}
		});
	});
});
/* 	-------AKHIR HALAMAN BERITA------- */

/* 	-------DATA------- */
router.get('/data', 
berita_populer_data,
data_download_home,
data_subdomain,
peg_jum,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/data', { 
		title: 'Data', 
		menu:'data',
		desc: 'Data ',
		desc2:'di Lingkungan Pemerintah Kota Tanjungpinang',
		icon: 'fa-users',
		beritapopuler: req.berita_populers,
		datadownloadhome:req.datadownloadhome,
		datasubdomain:req.data_subdomains,
		jumpeg:req.jumpeg,
		pranala:req.pranala,
		session: req.session
	});
});

/* 	-------DATA------- */


/* 	------- DATA KEPEGAWAIAN SEMUA ------- */
router.get('/data/peg', 
	berita_populer_data,
	peg_data, 
	data_download_home,
	data_subdomain,
	pranala_data,
	function(req, res, next) {
		accesslog(req, res);
		res.render('portal/data', { 
			title: 'Data Pegawai', 
			menu:'data/peg',
			bread1:'Data',
			bread1_url:'data',
			desc: 'Data Kepegawaian ',
			desc2:'di Lingkungan Pemerintah Kota Tanjungpinang',
			icon: 'fa-users',
			beritapopuler: req.berita_populers,
			datadownloadhome:req.datadownloadhome,
			datasubdomain:req.data_subdomains,
			peg:req.peg,
			pranala:req.pranala,
			session: req.session
		});
	});
/* 	------- AKHIR DATA KEPEGAWAIAN SEMUA ------- */

/* 	------- DATA KEPEGAWAIAN SINGLE ------- */
router.get('/data/peg/(:id)',
	berita_populer_data,
	peg_data,
	data_download_home,
	data_subdomain,
	pranala_data,
	function(req, res, next) {
  		//panggil fungsi panggilApi dengan methode apiGET dan create callback function
		panggilApi.panggilPeg(function (data) {
		    // render to the index.jade dan pass data dari panggilan api
		    let id = req.params.id;
		    let dataKeluaran;
		    data.pegawai.forEach((keluaran)=>{
		    	if(keluaran.id_peg == id) {
		    		dataKeluaran = keluaran;
		    	}
		    });
		    res.render('portal/data', { 
				title: 'Data Pegawai', 
				menu:'data/peg',
				bread1:'Data',
				bread1_url:'data',
				desc: 'Data Kepegawaian ',
				desc2:'di Lingkungan Pemerintah Kota Tanjungpinang',
				icon: 'fa-users',
				beritapopuler: req.berita_populers,
				datadownloadhome:req.datadownloadhome,
				datasubdomain:req.data_subdomains,
				peg:req.peg,
				pranala:req.pranala,
				session: req.session,
		    	peg :dataKeluaran
		    });
		});
	});
/* 	------- AKHIR DATA KEPEGAWAIAN SINGLE ------- */

/* 	------- START DATA PROFIL INSTANSI DAN UNIT KERJA SEMUA ------- */
router.get('/data/unitkerja',
berita_populer_data,
data_unit_kerja,
data_subdomain,
data_download_home,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/data', { 
		title: 'Data Unit Kerja', 
		menu:'data/unitkerja',
		bread1:'Data',
		bread1_url:'data',
		desc: 'Data Unit Kerja ',
		desc2:'di Lingkungan Pemerintah Kota Tanjungpinang',
		icon: 'fa-institution',
		beritapopuler: req.berita_populers,
		datadownloadhome:req.datadownloadhome,
		datasubdomain:req.data_subdomains,
		dataunitkerja: req.data_unit_kerjas,
		pranala:req.pranala,
		session: req.session
	});
});
/* 	------- AKHIR DATA PROFIL INSTANSI DAN UNIT KERJA SEMUA ------- */

/* 	------- START DATA PROFIL INSTANSI DAN UNIT KERJA SINGLE ------- */
router.get('/data/unitkerja/(:link)',
	berita_populer_data,
	data_unit_kerja,
	data_subdomain,
	data_download_home,
	pranala_data,
	function(req, res, next) {
		accesslog(req, res);
		panggilApi.panggilOpd(function (data) {
		    // render to the index.jade dan pass data dari panggilan api
		    let id = req.params.link;
		    let dataKeluaran;
		    data.opd.forEach((keluaran)=>{
		    	if(keluaran.link_opd == id) {
		    		dataKeluaran = keluaran;
		    	}
		    });
		res.render('portal/data-unit-kerja-single',{
			title:dataKeluaran.nama_opd,
			menu:'data/unitkerja/'+dataKeluaran.link_opd,
			bread1:'Data',
			bread1_url:'data',
			bread2:'Data Instansi',
			bread2_url:'data/unitkerja',
			desc: dataKeluaran.nama_opd,
			desc2:null,
			icon: 'fa-bank',
			beritapopuler: req.berita_populers,
			datadownloadhome:req.datadownloadhome,
			datasubdomain:req.data_subdomains,
			dataunitkerja: req.data_unit_kerjas,
			pranala:req.pranala,
			session: req.session,
			opd :dataKeluaran
		});
	});
});
/* 	------- AKHIR DATA PROFIL INSTANSI DAN UNIT KERJA SINGLE ------- */

router.get('/data/internal-opd',
authentication_mdl.is_login,
berita_populer_data,
data_unit_kerja,
data_subdomain,
data_download_home,
pranala_data,
authentication_mdl.is_login,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/data', { 
		title: 'Data Internal OPD', 
		menu:'data/internal-opd',
		bread1:'Data',
		bread1_url:'data',
		desc: 'Data Internal OPD ',
		desc2:'di Lingkungan Pemerintah Kota Tanjungpinang',
		icon: 'fa-institution',
		beritapopuler: req.berita_populers,
		datadownloadhome:req.datadownloadhome,
		datasubdomain:req.data_subdomains,
		dataunitkerja: req.data_unit_kerjas,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/data/internal/kepegawaian',
authentication_mdl.is_login,
berita_populer_data,
data_unit_kerja,
data_subdomain,
data_download_home,
pranala_data,
peg_jum,
authentication_mdl.is_login,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/data-internal-instansi', { 
		title: 'Data Kepegawaian '+req.session.user.nama_opd, 
		menu:'data/internal/kepegawaian',
		bread1:'Data Internal '+req.session.user.akronim_opd,
		bread1_url:'data',
		desc: 'Data Kepegawaian ',
		desc2:req.session.user.nama_opd,
		icon: 'fa-users',
		jumpeg: req.jumpeg,
		beritapopuler: req.berita_populers,
		datadownloadhome:req.datadownloadhome,
		datasubdomain:req.data_subdomains,
		dataunitkerja: req.data_unit_kerjas,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/data/internal/reg-email',
authentication_mdl.is_login,
berita_populer_data,
data_unit_kerja,
data_subdomain,
data_download_home,
pranala_data,
authentication_mdl.is_login,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/data-internal-instansi', { 
		title: 'Data Kepegawaian '+req.session.user.nama_opd, 
		menu:'data/internal/kepegawaian',
		bread1:'Data Internal '+req.session.user.akronim_opd,
		bread1_url:'data',
		desc: 'Data Kepegawaian ',
		desc2:req.session.user.nama_opd,
		icon: 'fa-users',
		beritapopuler: req.berita_populers,
		datadownloadhome:req.datadownloadhome,
		datasubdomain:req.data_subdomains,
		dataunitkerja: req.data_unit_kerjas,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/data/internal/reg-subdomain',
authentication_mdl.is_login,
berita_populer_data,
data_unit_kerja,
data_subdomain,
data_download_home,
pranala_data,
authentication_mdl.is_login,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/data-internal-instansi', { 
		title: 'Data Kepegawaian '+req.session.user.nama_opd, 
		menu:'data/internal/kepegawaian',
		bread1:'Data Internal '+req.session.user.akronim_opd,
		bread1_url:'data',
		desc: 'Data Kepegawaian ',
		desc2:req.session.user.nama_opd,
		icon: 'fa-users',
		beritapopuler: req.berita_populers,
		datadownloadhome:req.datadownloadhome,
		datasubdomain:req.data_subdomains,
		dataunitkerja: req.data_unit_kerjas,
		pranala:req.pranala,
		session: req.session
	});
});


router.get('/data/download-area', 
berita_populer_data, 
data_download,
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/data', { 
		title: 'Download Area', 
		menu:'data/download-area',
		bread1:'Data',
		bread1_url:'data',
		desc: 'Download Area ',
		desc2:'di Lingkungan Pemerintah Kota Tanjungpinang',
		icon: 'fa-file-text-o',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownload:req.datadownload,
		datadownloadhome:req.datadownloadhome,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/data/download-area/(:link)',
berita_populer_data,
data_download,
data_download_home,
data_subdomain,
pranala_data,
function(req,res,next){
	req.getConnection(function(err,connection){
		var id_download =req.params.link;
		var query = connection.query('SELECT * FROM v_download where id_download='+id_download,function(err,rows)
		{
			accesslog(req, res);
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errors_detail);
				res.redirect('/data/download-area');
			}else
			{
				if(rows.length <=0)
				{
					req.flash('msg_error', "Berita Tidak Ditemukan");
					res.redirect('/data/download-area');
				}
				else
				{
					res.render('portal/data-single', {
						title: 'Download Area - '+rows[0].nama_file,
						menu:'data/download-area',
						bread1:'Data',
						bread1_url:'data',
						desc: 'Download Area ',
						desc2:'',
						icon: 'fa-file-text-o',
						dw:rows[0],
						beritapopuler: req.berita_populers,
						datasubdomain:req.data_subdomains,
						datadownload:req.datadownload,
						datadownloadhome:req.datadownloadhome,
						pranala:req.pranala,
						session: req.session
					});
				}
			}
		});
	});
});
/* 	-------AKHIR DATA------- */

/* 	-------HALAMAN GALLERY------- */
router.get('/gallery', 
gallery_album_data, 
gallery_data, 
berita_populer_data, 
data_subdomain,
data_download_home,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/gallery', { 
		title: 'Gallery', 
		menu:'gallery', 
		desc: 'Gallery Gambar / Video ',
		desc2:'di Lingkungan Pemerintah Kota Tanjungpinang',
		icon: 'linecons-photo',
		gallery_album:req.gallery_album, 
		gallery:req.gallery,
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/gallery-single', 
berita_populer_data, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/gallery-single', { 
		title: 'Gallery', 
		menu:'gallery-single', 
		desc: 'Gallery Gambar / Video ',
		desc2:'di Lingkungan Pemerintah Kota Tanjungpinang',
		icon: 'linecons-photo',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		pranala:req.pranala,
		session: req.session
	});
});
/* 	-------AKHIR HALAMAN GALLERY------- */

/* 	-------HALAMAN HUBUNGI KAMI------- */
router.get('/pages/hubungi-kami', 
berita_populer_data, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'Hubungi Kami', 
		menu:'pages/hubungi-kami',
		desc: 'Hubungi Kami ',
		desc2:'',
		icon: 'el-comment',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		pranala:req.pranala,
		session: req.session
	});
});
/* 	-------AKHIR HALAMAN HUBUNGI KAMI------- */

/* 	-------HALAMAN PAGES------- */
router.get('/pages', 
berita_populer_data, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'Halaman Profil', 
		menu:'pages',
		desc: 'Halaman Profil ',
		desc2:'',
		icon: 'fa-bullhorn',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		pranala:req.pranala,
		session: req.session
	});
});

/* 	-------HALAMAN PAGES PROFIL------- */
router.get('/pages/profil', 
berita_populer_data, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'Selayang pandang', 
		menu: 'pages/profil',
		bread1:'Profil',
		bread1_url:'pages',
		desc: 'Selayang Pandang ',
		desc2:'Pemerintah Kota Tanjungpinang',
		icon: 'fa-bullhorn',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		pranala:req.pranala,
		session: req.session
	});
});
/* 	-------AKHIR HALAMAN PAGES PROFIL------- */

/* 	-------HALAMAN AKSI DAERAH------- */
router.get('/pages/aksidaerah', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'Rencana Aksi Daerah PPK', 
		menu: 'pages/aksidaerah',
		bread1:'Profil',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK ',
		desc2:'Pemerintah Kota Tanjungpinang',
		icon: 'linecons-eye',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/pages/aksidaerah/rencanaanggaran', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'DATA TIDAK TERSEDIA', 
		menu: 'pages/aksidaerah/rencanaanggaran',
		bread1:'RAD-PPK',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK ',
		desc2:'Perencanaan dan Penganggaran',
		icon: 'fa-error',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});





router.get('/pages/aksidaerah/pengadaan', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'DATA TIDAK TERSEDIA', 
		menu: 'pages/aksidaerah/pengadaan',
		bread1:'RAD-PPK',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK ',
		desc2:'Pengadaan Baran dan Jasa',
		icon: 'fa-error',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/pages/aksidaerah/perizinan', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'DATA TIDAK TERSEDIA', 
		menu: 'pages/aksidaerah/perizinan',
		bread1:'RAD-PPK',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK ',
		desc2:'Perizinan Terpadu Satu Pintu',
		icon: 'fa-error',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/pages/aksidaerah/sdm', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'DATA TIDAK TERSEDIA', 
		menu: 'pages/aksidaerah/sdm',
		bread1:'RAD-PPK',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK ',
		desc2:'Manajemen SDM',
		icon: 'fa-error',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/pages/aksidaerah/apip', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'DATA TIDAK TERSEDIA', 
		menu: 'pages/aksidaerah/apip',
		bread1:'RAD-PPK',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK ',
		desc2:'Penguatan Peran APIP',
		icon: 'fa-error',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/pages/aksidaerah/spip', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'DATA TIDAK TERSEDIA', 
		menu: 'pages/aksidaerah/spip',
		bread1:'RAD-PPK',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK ',
		desc2:'Kematangan SPIP',
		icon: 'fa-error',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/pages/aksidaerah/aset', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'DATA TIDAK TERSEDIA', 
		menu: 'pages/aksidaerah/aset',
		bread1:'RAD-PPK',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK ',
		desc2:'Pembenahan Aset',
		icon: 'fa-error',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/pages/aksidaerah/partisipasipublik', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'DATA TIDAK TERSEDIA', 
		menu: 'pages/aksidaerah/partisipasipublik',
		bread1:'RAD-PPK',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK ',
		desc2:'Partisipasi Publik',
		icon: 'fa-error',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/pages/aksidaerah/pendidikan', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'DATA TIDAK TERSEDIA', 
		menu: 'pages/aksidaerah/pendidikan',
		bread1:'RAD-PPK',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK ',
		desc2:'Pendidikan',
		icon: 'fa-error',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/pages/aksidaerah/kesehatan', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'KESEHATAN', 
		menu: 'pages/aksidaerah/kesehatan',
		bread1:'RAD-PPK',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK Kesehatan ',
		desc2:'Pemerintah Kota Tanjungpinang',
		icon: 'fa-ambulance',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/pages/aksidaerah/infra', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'DATA TIDAK TERSEDIA', 
		menu: 'pages/aksidaerah/infra',
		bread1:'RAD-PPK',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK ',
		desc2:'Infrastruktur',
		icon: 'fa-error',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});

router.get('/pages/aksidaerah/pendapatan', 
berita_populer_data,
data_aksi_daerah, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'DATA TIDAK TERSEDIA', 
		menu: 'pages/aksidaerah/pendapatan',
		bread1:'RAD-PPK',
		bread1_url:'pages/aksidaerah',
		desc: 'RAD-PPK ',
		desc2:'Pendapatan Daerah',
		icon: 'fa-error',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		datadownload:req.dataaksidaerah,
		pranala:req.pranala,
		session: req.session
	});
});
/* 	-------AKHIR HALAMAN AKSI DAERAH------- */

/* 	-------HALAMAN PENGUMUMAN------- */
router.get('/pengumumansssssss/(:link)', 
siaranpers_data, 
berita_populer_data, 
kategori_berita,
kalenderevent_data, 
data_subdomain,
data_download_home,
pranala_data,
function(req,res,next){
	req.getConnection(function(err,connection){
		var id_pengumuman =req.params.link;
		var query = connection.query('SELECT * FROM v_siaranpers where id_pengumuman='+id_pengumuman,function(err,rows)
		{
			accesslog(req, res);
			if(err)
			{
				var errornya  = ("Error Selecting : %s ",err );
				req.flash('msg_error', errors_detail);
				res.redirect('/');
			}else
			{
				if(rows.length <=0)
				{
					req.flash('msg_error', "Pengumuman Tidak Ditemukan"); 
					res.redirect('/');
				}
				else
				{
					res.render('portal/siaran-pers-single',{
						title:rows[0].judul,
						bread1:'Pengumuman',
						bread1_url:'pengumuman',
						desc: 'PENGUMAMAN KHUSUS ',
						desc2:'Pemerintah Kota Tanjungpinang',
						icon: 'fa-bullhorn',
						siaranpersview:rows[0], 
						beritapopuler: req.berita_populers,
						beritakat:req.kategoriberita,
						session_store:req.session, 
						siaranpers:req.siaranpers,
						datadownloadhome:req.datadownloadhome,
						datasubdomain:req.data_subdomains,
						kalenderevent:req.kalenderevents,
						pranala:req.pranala,
						session: req.session
					});
				}
			}
		});
	});
});
/* 	-------AKHIR PENGUMUMAN------- */

/* 	-------HALAMAN PENGUMUMAN------- */
router.get('/pengumuman/(:link)', 
siaranpers_data, 
berita_populer_data, 
kategori_berita,
kalenderevent_data, 
data_subdomain,
data_download_home,
pranala_data,
function(req,res,next){
	accesslog(req, res);
	panggilApi.panggilPengumuman(function (data) {
	    // render to the index.jade dan pass data dari panggilan api
	    var id = req.params.link;
	    var dataKeluaran;
	    data.pengumuman.forEach((keluaran)=>{
	    	if(keluaran.id_pengumuman == id) {
	    		dataKeluaran = keluaran;
	    	}
		});
		res.render('portal/siaran-pers-single',{
			title:dataKeluaran.judul,
			bread1:'Pengumuman',
			bread1_url:'pengumuman',
			desc: 'PENGUMAMAN KHUSUS ',
			desc2:'Pemerintah Kota Tanjungpinang',
			icon: 'fa-bullhorn',
			siaranpersview:dataKeluaran, 
			beritapopuler: req.berita_populers,
			beritakat:req.kategoriberita,
			session_store:req.session, 
			siaranpers:req.siaranpers,
			datadownloadhome:req.datadownloadhome,
			datasubdomain:req.data_subdomains,
			kalenderevent:req.kalenderevents,
			pranala:req.pranala,
			session: req.session
		});
	});
});
/* 	-------AKHIR PENGUMUMAN------- */

/* 	-------HALAMAN VISI DAN MISI------- */
router.get('/pages/visimisi', 
berita_populer_data, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'Visi dan Misi', 
		menu: 'pages/visimisi',
		bread1:'Profil',
		bread1_url:'pages',
		desc: 'Visi dan Misi ',
		desc2:'Pemerintah Kota Tanjungpinang',
		icon: 'fa-tasks',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		pranala:req.pranala,
		session: req.session
	});
});
/* 	-------AKHIR HALAMAN VISI DAN MISI------- */

/* 	-------HALAMAN LAMBANG DAN MOTTO------- */
router.get('/pages/lambangmoto', 
berita_populer_data, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'Lambang dan Moto',
		menu: 'pages/lambangmoto',
		bread1:'Profil',
		bread1_url:'pages',
		desc: 'Lambang dan Motto ',
		desc2:'Pemerintah Kota Tanjungpinang',
		icon: 'fa-shield',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		pranala:req.pranala,
		session: req.session
	});
});
/* 	-------AKHIR HALAMAN LAMBANG DAN MOTTO------- */

/* 	-------HALAMAN KEPALA DAERAH------- */
router.get('/pages/kepaladaerah', 
berita_populer_data, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'Kepala Daerah', 
		menu: 'pages/kepaladaerah',
		bread1:'Profil',
		bread1_url:'pages',
		desc: 'Sambutan Kepala Daerah ',
		desc2:'Pemerintah Kota Tanjungpinang',
		icon: 'el-torso',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		pranala:req.pranala,
		session: req.session
	});
});
/* 	-------AKHIR HALAMAN KEPALA DAERAH------- */

/* 	-------HALAMAN STRUKTUR ORGANISASI------- */
router.get('/pages/strukturorg', 
berita_populer_data, 
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', {
		title: 'Struktur Organisasi',
		menu: 'pages/strukturorg',
		bread1:'Profil',
		bread1_url:'pages',
		desc: 'Struktur Organisasi ',
		desc2:'Pemerintah Kota Tanjungpinang',
		icon: 'fa-group',
		beritapopuler: req.berita_populers,
		datasubdomain:req.data_subdomains,
		datadownloadhome:req.datadownloadhome,
		pranala:req.pranala,
		session: req.session
	});
});
/* 	-------AKHIR HALAMAN STRUKTUR ORGANISASI------- */

/* 	-------HALAMAN PROFIL INSTANSI SEMUA ------- */
router.get('/pages/profilinstansi', 
berita_populer_data,
data_unit_kerja,
data_subdomain,
data_download_home,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pages', { 
		title: 'Profil Instansi', 
		menu: 'pages/profilinstansi',
		bread1:'Profil',
		bread1_url:'pages',
		desc: 'Profil Instansi ',
		desc2:'Pemerintah Kota Tanjungpinang',
		icon: 'fa-bank',
		beritapopuler: req.berita_populers,
		datadownloadhome:req.datadownloadhome,
		datasubdomain:req.data_subdomains,
		dataunitkerja: req.data_unit_kerjas,
		pranala:req.pranala,
		session: req.session
	});
});
/* 	-------AKHIR HALAMAN PROFIL INSTANSI SEMUA ------- */

/* 	------- START DATA PROFIL INSTANSI DAN UNIT KERJA SINGLE ------- */
router.get('/pages/profilinstansi/(:link)',
	berita_populer_data,
	data_unit_kerja,
	data_subdomain,
	data_download_home,
	pranala_data,
	function(req, res, next) {
		accesslog(req, res);
		panggilApi.panggilOpd(function (data) {
		    // render to the index.jade dan pass data dari panggilan api
		    var id = req.params.link;
		    var dataKeluaran;
		    data.opd.forEach((keluaran)=>{
		    	if(keluaran.link_opd == id) {
		    		dataKeluaran = keluaran;
		    	}
			});
		res.render('portal/data-unit-kerja-single',{
			title:dataKeluaran.nama_opd,
			menu:'data/unitkerja/'+dataKeluaran.link_opd,
			bread1:'Profil',
			bread1_url:'pages',
			bread2:'Profil Instansi',
			bread2_url:'pages/profilinstansi',
			desc: 'Profil Instansi '+dataKeluaran.link_opd+' ',
			desc2:'Pemerintah Kota Tanjungpinang',
			icon: 'fa-bank',
			beritapopuler: req.berita_populers,
			datadownloadhome:req.datadownloadhome,
			datasubdomain:req.data_subdomains,
			dataunitkerja: req.data_unit_kerjas,
			pranala:req.pranala,
			session: req.session,
			opd :dataKeluaran,
		});
	});
});
/* 	------- AKHIR DATA PROFIL INSTANSI DAN UNIT KERJA SINGLE ------- */


/* 	------- START PRANALA LUAR ------- */
router.get('/pranala-luar', 
berita_populer_data,
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pranala-luar', { 
		title: 'Pranala Luar', 
		menu:'pranala-luar',
		desc: 'Pranala Luar ',
		desc2:null,
		icon: 'fa-link',
		beritapopuler: req.berita_populers,
		datadownloadhome:req.datadownloadhome,
		datasubdomain:req.data_subdomains,
		pranala:req.pranala,
		session: req.session
	});
});
/* 	------- AKHIR PRANALA LUAR ------- */

/* 	------- START PRANALA LUAR ------- */
router.get('/data/subdomain', 
berita_populer_data,
data_download_home,
data_subdomain,
pranala_data,
function(req, res, next) {
	accesslog(req, res);
	res.render('portal/pranala-luar', { 
		title: 'Sub Domain', 
		menu:'data/subdomain',
		bread1:'Data',
		bread1_url:'data',
		desc: 'Sub Domain ',
		desc2:'tanjungpinangkota.go.id',
		icon: 'fa-link',
		beritapopuler: req.berita_populers,
		datadownloadhome:req.datadownloadhome,
		datasubdomain:req.data_subdomains,
		pranala:req.pranala,
		session: req.session
	});
});
/* 	------- AKHIR PRANALA LUAR ------- */


/* GET login page. */
router.get('/login',function(req,res,next){
	accesslog(req, res);
	res.render('main/login',
	{
		title:"Login"
	});
});
router.post('/login',function(req,res,next){
	accesslog(req, res);
	session_store=req.session;
	req.assert('txtUsername', 'Username belum diisi').notEmpty();
	req.assert('txtPassword', 'Password belum diisi').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {
		req.getConnection(function(err,connection){
			v_pass = req.sanitize( 'txtPassword' ).escape().trim();
			v_username = req.sanitize( 'txtUsername' ).escape().trim();

			var query = connection.query('SELECT * FROM v_users_active WHERE username="'+v_username+'" AND paswd=md5("'+v_pass+'")',function(err,rows)
			{
				if(err)
				{
					var errornya  = ("Error Memilih : %s ",err.code );
					console.log(err.code);
					req.flash('msg_error', errornya);
					res.redirect('/login');
				}else
				{
					if(rows.length <=0)
					{
						req.flash('msg_error', "Username dan/atau Password Anda Salah. Silakan Coba Lagi.");
						res.redirect('/login');
					}
					else
					{
						session_store.is_login = true;
						session_store.user = rows[0];
						res.redirect('/adm');
					}
				}

			});
		});
	}
	else
	{
		errors_detail = "<strong>Maaf terjadi kesalahan</strong><ul>";
		for (i in errors)
		{
			error = errors[i];
			errors_detail += '<li>'+error.msg+'</li>';
		}
		errors_detail += "</ul>";
		console.log(errors_detail);
		req.flash('msg_error', errors_detail);
		res.redirect('/login');
	}
});
router.get('/logout', 
function(req, res)
{
	accesslog(req, res);
	req.session.destroy(function(err)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.redirect('/login');
		}
	});
});

router.post('/',
function(req,res,next){
	accesslog(req, res);
	session_store=req.session;
	var errors = req.validationErrors();
	if (!errors) {
		req.getConnection(function(err,connection){
			v_pass = req.sanitize( 'txtPassword' ).escape().trim();
			v_username = req.sanitize( 'txtUsername' ).escape().trim();

			var query = connection.query('SELECT * FROM v_users_active WHERE username="'+v_username+'" AND paswd=md5("'+v_pass+'")',function(err,rows)
			{
				if(err)
				{
					var errornya  = ("Error Memilih : %s ",err.code );
					console.log(err.code);
					req.flash('msg_error', errornya);
					res.redirect('./');
				}else
				{
					if(rows.length <=0)
					{
						req.flash('msg_error', "Username dan/atau Password Anda Salah. Silakan Coba Lagi.");
						res.redirect('./');
					}
					else
					{
						session_store.is_login = true;
						session_store.user = rows[0];
						res.redirect('./');
					}
				}
			});
		});
	}
	else
	{
		for (i in errors)
		{
			error = errors[i];
			errors_detail += '<span>'+error.msg+'</span>';
		}
		console.log(errors_detail);
		req.flash('msg_error', errors_detail);
	}
});
router.get('/logouthome', 
function(req, res)
{
	accesslog(req, res);
	req.session.destroy(function(err)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
	});
});

module.exports = router;