SELECT
	`d_gallery`.`id_gallery` AS `id_gallery`,
	`d_gallery`.`id_gallery_album` AS `id_gallery_album`,
	`d_gallery_album`.`nama` AS `nama_album`,
	`d_gallery_album`.`tahun_album` AS `th_album`,
	`d_gallery`.`id_user` AS `id_user`,
	`d_users`.`id_hakakses` AS `id_user_hak_akses`,
	`m_hakakses`.`hakakses` AS `user_hak_akses`,
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
	`d_gallery`.`vid_pic` AS `vid_pic`,
	`d_gallery`.`judul_gambar` AS `judul_gambar`,
	`d_gallery`.`keterangan_gambar` AS `ket_gambar`,
	`d_gallery`.`link_gambar` AS `link_gambar`,
	concat ('http://tanjungpinangkota.go.id/images/gallery/thumb/',`link_gambar`) AS `alamat_file_thumb`,
	concat ('http://tanjungpinangkota.go.id/images/gallery/small/',`link_gambar`) AS `alamat_file_small`,
	concat ('http://tanjungpinangkota.go.id/images/gallery/big/',`link_gambar`) AS `alamat_file_big`,
	date_format(`d_gallery`.`tgl_gambar`,'%d %M %Y') AS `tgl_gambar`,
	date_format(`d_gallery`.`tgl_terbit`,'%d %M %Y') AS `tgl_terbit`,
	date_format(`d_gallery`.`tgl_edit`,'%d %M %Y') AS `tgl_edit`,
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
FROM `d_gallery`
LEFT JOIN `d_gallery_album` ON `d_gallery`.`id_gallery_album` = `d_gallery_album`.`id_gallery_album`
LEFT JOIN `d_users` ON `d_gallery`.`id_user` = `d_users`.`id_user`
LEFT JOIN `m_peg` ON `d_users`.`id_peg` = `m_peg`.`id_peg`
LEFT JOIN `m_hakakses` ON `d_users`.`id_hakakses` = `m_hakakses`.`id_hakaskses`
LEFT JOIN `d_users` `d_users2` ON `d_gallery`.`yg_ngubah` = `d_users`.`id_user`
LEFT JOIN `m_peg` `m_peg2` ON `d_users2`.`id_peg` = `m_peg`.`id_peg`
LEFT JOIN `m_hakakses` `m_hakakses2` ON `d_users2`.`id_hakakses` = `m_hakakses2`.`id_hakaskses`
ORDER BY `d_gallery_album`.`id_gallery_album` DESC 