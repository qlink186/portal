SELECT 
	`d_siaranpers`.`id_pengumuman` AS `id_pengumuman`,
	`d_siaranpers`.`id_opd` AS `id_opd`,
	`m_opd`.`nama_opd` AS `opd`,
	`m_opd`.`akronim_opd` AS `akronim_opd`,
	`d_siaranpers`.`id_user` AS `id_user`,
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
	`d_siaranpers`.`no_pengumuman` AS `no_pengumuman`,
	`d_siaranpers`.`judul`, 
	`d_siaranpers`.`desk_singkat`, 
	`d_siaranpers`.`isi`, 
	`d_siaranpers`.`gambar`,
	concat ('http://tanjungpinangkota.go.id/images/pengumuman/small/',`d_siaranpers`.`gambar`) AS `alamat_file_small`,
	concat ('http://tanjungpinangkota.go.id/images/pengumuman/big/',`d_siaranpers`.`gambar`) AS `alamat_file_big`,
	concat ('http://tanjungpinangkota.go.id/images/pengumuman/khusus/',`d_siaranpers`.`gambar_khusus`) AS `alamat_file_khusus`,
	`d_siaranpers`.`jml_komentar`,
	DATE_FORMAT(`d_siaranpers`.`tgl_tulis`, '%d %M %Y') AS `tgl_tulis`,
	DATE_FORMAT(`d_siaranpers`.`tgl_terbit`, '%d %M %Y') AS `tgl_terbit`,
	DATE_FORMAT(`d_siaranpers`.`tgl_akhir`, '%d %M %Y') AS `tgl_akhir`, 
	DATE_FORMAT(`d_siaranpers`.`tgl_edit`, '%d %M %Y') AS `tgl_edit`,
	DATEDIFF(`d_siaranpers`.`tgl_akhir`, CURDATE()) + 1 AS `umur_pengumuman`,
	`d_siaranpers`.`tayang_umum`,
	`d_siaranpers`.`tayang_opd`,
	`d_siaranpers`.`tayang_khusus`,
	`d_siaranpers`.`jml_klik`,
	`d_siaranpers`.`yg_ngubah` AS `yg_ngubah`,
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
FROM `d_siaranpers`
LEFT JOIN `m_opd` ON `d_siaranpers`.`id_opd` = `m_opd`.`id_opd`
LEFT JOIN `d_users` ON `d_siaranpers`.`id_user` = `d_users`.`id_user`
LEFT JOIN `m_hakakses` ON `d_users`.`id_hakakses` = `m_hakakses`.`id_hakaskses`
LEFT JOIN `m_peg` ON `d_users`.`id_peg` = `m_peg`.`id_peg`
LEFT JOIN `d_users` `d_users2` ON `d_siaranpers`.`yg_ngubah` = `d_users`.`id_user`
LEFT JOIN `m_peg` `m_peg2` ON `d_users2`.`id_peg` = `m_peg`.`id_peg`
LEFT JOIN `m_hakakses` `m_hakakses2` ON `d_users2`.`id_hakakses` = `m_hakakses2`.`id_hakaskses`
WHERE `d_siaranpers`.`tgl_akhir` >= CURDATE() && `d_siaranpers`.`tgl_terbit` < CURDATE() + 1
ORDER BY `d_siaranpers`.`tgl_tulis` DESC