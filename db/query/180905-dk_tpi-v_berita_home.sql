select 
`d_berita`.`id_berita` AS `id_berita`,
`d_berita`.`judul_berita` AS `judul_berita`,
substr(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
	`d_berita`.`isi_berita`, 
		'"', ''),
		'  ', ' '),
		'   ', ' '),
		'    ', ' '),
		'<p>', ''),
		'</p>', '<br />'),
		'{', ''),
		'}', ''),
		'[', ''),
		']', ''),
		'|', ''),
		'\'', ''),
		'^', ''),
		'*', ''),
		'<', ''),
		'>', ''),
		'--', ' '),1,200) AS `isi_berita_ringkas`,
date_format(`d_berita`.`tgl_terbit`,'%a, %d %b %Y') AS `tgl_terbit`,
`d_berita`.`tayang_umum` AS `tayang_umum`,
`d_berita`.`tayang_opd` AS `tayang_opd`,
`d_berita`.`tayang_pribadi` AS `tayang_pribadi`,
`d_berita`.`gambar` AS `gambar`,
`d_berita`.`id_opd` AS `id_opd`,
LOWER(REPLACE(
        REPLACE(
            REPLACE(
                REPLACE(
                    REPLACE(
                        REPLACE(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            REPLACE(
                                                REPLACE(
                                                    REPLACE(
                                                        REPLACE(
                                                            REPLACE(
                                                                REPLACE(
                                                                    REPLACE(
                                                                        REPLACE(
                                                                            REPLACE(
                                                                                REPLACE(
                                                                                    REPLACE(
                                                                                        REPLACE(
                                                                                            REPLACE(
                                                                                                REPLACE(
                                                                                                    REPLACE(
                                                                                                        REPLACE(
                                                                                                            REPLACE(
                                                                                                                REPLACE(
                                                                                                                    REPLACE(
                                                                                                                        REPLACE(
                                                                                                                            REPLACE(
                                                                                                                                REPLACE(
                                                                                                                                    REPLACE(`d_berita`.`judul_berita`, '"', ''),
                                                                                                                                '.', ''),
                                                                                                                            '?', ''),
                                                                                                                        '`', ''),
                                                                                                                    '<', ''),
                                                                                                                '=', ''),
                                                                                                            '{', ''),
                                                                                                        '}', ''),
                                                                                                    '[', ''),
                                                                                                ']', ''),
                                                                                            '|', ''),
                                                                                        '\'', ''),
                                                                                    ':', ''),
                                                                                ';', ''),
                                                                            '~', ''),
                                                                        '!', ''),
                                                                    '@', ''),
                                                                '#', ''),
                                                            '$', ''),
                                                        '%', ''),
                                                    '^', ''),
                                                '&', ''),
                                            '*', ''),
                                        '_', ''),
                                    '+', ''),
                                ',', ''),
                            '/', ''),
                        '(', ''),
                    ')', ''),
                '-', ''),
            '>', ''),
        ' ', '-'),
    '--', '-')) AS `link_berita`,
	 `m_opd`.`nama_opd` AS `nama_opd` 
from (`d_berita` left join `m_opd` on((`d_berita`.`id_opd` = `m_opd`.`id_opd`))) where (`d_berita`.`tayang_umum` = '1') order by `d_berita`.`tgl_terbit` desc limit 12 