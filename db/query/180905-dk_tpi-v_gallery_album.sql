SELECT
	d_gallery_album.id_gallery_album AS id_album,
	d_gallery_album.id_user AS id_user,
	d_users.id_peg AS id_peg,
	concat(
		if(
			isnull(m_peg.`gelar_depan`),
			'',
			concat(m_peg.`gelar_depan`,' ')
			),
		m_peg.`nama`,
		if(
			isnull(m_peg.`gelar_belakang`),
			'',
			concat(', ',m_peg.`gelar_belakang`)
			)
	) AS `nama_gelar`,
	m_opd.nama_opd AS opd,
	d_gallery_album.nama AS nama_album,
	d_gallery_album.ket_album AS ket_album,
	d_gallery_album.tahun_album AS th_album,
	date_format(d_gallery_album.tgl_terbit,'%d %M %Y') AS tgl_terbit,
	date_format(d_gallery_album.tgl_edit,'%d %M %Y') AS tgl_edit,
	d_users2.id_peg AS id_peg_yg_ngubah,
	concat(
		if(
			isnull(m_peg2.`gelar_depan`),
			'',
			concat(m_peg2.`gelar_depan`,' ')
			),
		m_peg2.`nama`,
		if(
			isnull(m_peg2.`gelar_belakang`),
			'',
			concat(', ',m_peg2.`gelar_belakang`)
			)
	) AS `nama_gelar_yg_ngubah`,
	COUNT(d_gallery.id_gallery_album) AS jum_gallery
FROM d_gallery_album
LEFT JOIN d_users ON (d_gallery_album.id_user = d_users.id_user)
LEFT JOIN m_peg ON (d_users.id_peg = m_peg.id_peg)
LEFT JOIN m_opd ON (d_gallery_album.id_opd = m_opd.id_opd)
LEFT JOIN d_users d_users2 ON (d_gallery_album.yg_ngubah = d_users.id_user)
LEFT JOIN m_peg m_peg2 ON (d_users2.id_peg = m_peg.id_peg)
LEFT JOIN d_gallery ON (d_gallery_album.id_gallery_album = d_gallery.id_gallery_album)
GROUP BY d_gallery_album.id_gallery_album
ORDER BY d_gallery_album.tahun_album DESC