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