SELECT 
	`d_log_berita`.`id_log`,
	date_format(`d_log_berita`.`waktu_proses`,'%d %M %Y - %T') AS waktu_proses,
	`d_log_berita`.`proses`,
	`d_log_berita`.`ip`,
	`d_log_berita`.`id_berita`,
	`d_log_berita`.`id_opd`,
	`m_opd`.`nama_opd`,
	`m_opd`.`akronim_opd`,
	`d_log_berita`.`yg_bikin`,
	`d_users`.`id_peg` AS `id_peg`,
	concat(
		if(
			isnull(`m_peg`.`gelar_depan`),
			'',
			concat(`m_peg`.`gelar_depan`,' ')
			),
		`m_peg`.`nama`,
		if(
			isnull(`m_peg`.`gelar_belakang`),
			'',
			concat(', ',`m_peg`.`gelar_belakang`)
			)
	) AS `nama_gelar`,
	`d_users`.`id_hakakses` AS `id_user_hak_akses`,
	`m_hakakses`.`hakakses` AS `user_hak_akses`,
	`d_log_berita`.`perubahan_id_kategori`,
	`d_log_berita`.`id_kategori_lama`,
	`d_log_berita`.`id_kategori_baru`,
	`d_log_berita`.`perubahan_judul`,
	`d_log_berita`.`judul_lama`,
	`d_log_berita`.`judul_baru`,
	`d_log_berita`.`perubahan_isi_berita`,
	`d_log_berita`.`isi_berita_lama`,
	`d_log_berita`.`isi_berita_baru`,
	`d_log_berita`.`jml_komentar`,
	`d_log_berita`.`tgl_post`,
	`d_log_berita`.`tgl_terbit`,
	`d_log_berita`.`perubahan_tayang_umum`,
	`d_log_berita`.`tayang_umum_lama`,
	`d_log_berita`.`tayang_umum_baru`,
	`d_log_berita`.`perubahan_tayang_opd`,
	`d_log_berita`.`tayang_opd_lama`,
	`d_log_berita`.`tayang_opd_baru`,
	`d_log_berita`.`perubahan_tayang_pribadi`,
	`d_log_berita`.`tayang_pribadi_lama`,
	`d_log_berita`.`tayang_pribadi_baru`,
	`d_log_berita`.`perubahan_status`,
	`d_log_berita`.`status_lama`,
	`d_log_berita`.`status_baru`,
	`d_log_berita`.`perubahan_gambar`,
	`d_log_berita`.`gambar_lama`,
	`d_log_berita`.`gambar_baru`,
	`d_log_berita`.`jml_klik`,
	`d_log_berita`.`yg_ngubah`,
	`d_users2`.`id_peg` AS `id_peg_yg_ngubah`,
	concat(
		if(
			isnull(`m_peg2`.`gelar_depan`),
			'',
			concat(`m_peg2`.`gelar_depan`,' ')
			),
		`m_peg2`.`nama`,
		if(
			isnull(`m_peg2`.`gelar_belakang`),
			'',
			concat(', ',`m_peg2`.`gelar_belakang`)
			)
	) AS `nama_gelar_yg_ngubah`,
	`d_users2`.`id_hakakses` AS `id_hak_akses_yg_ngubah`,
	`m_hakakses2`.`hakakses` AS `hak_akses_yg_ngubah`
FROM `d_log_berita`
LEFT JOIN `m_opd` ON `d_log_berita`.`id_opd` = `m_opd`.`id_opd`
LEFT JOIN `d_users` ON `d_log_berita`.`yg_bikin` = `d_users`.`id_user`
LEFT JOIN `m_hakakses` ON `d_users`.`id_hakakses` = `m_hakakses`.`id_hakaskses`
LEFT JOIN `m_peg` ON `d_users`.`id_peg` = `m_peg`.`id_peg`
LEFT JOIN `d_users` `d_users2` ON `d_log_berita`.`yg_ngubah` = `d_users2`.`id_user`
LEFT JOIN `m_peg` `m_peg2` ON `d_users2`.`id_peg` = `m_peg2`.`id_peg`
LEFT JOIN `m_hakakses` `m_hakakses2` ON `d_users2`.`id_hakakses` = `m_hakakses2`.`id_hakaskses`
ORDER BY `d_log_berita`.`waktu_proses` DESC