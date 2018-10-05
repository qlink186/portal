-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.14-MariaDB-log - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table dk_tpi3.d_log_berita
CREATE TABLE IF NOT EXISTS `d_log_berita` (
  `id_log` int(11) NOT NULL AUTO_INCREMENT,
  `proses` varchar(15) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `id_berita` int(5) NOT NULL,
  `waktu_proses` timestamp NOT NULL DEFAULT current_timestamp(),
  `yg_ngubah` int(5) DEFAULT NULL,
  `id_opd` int(9) NOT NULL,
  `yg_bikin` int(5) NOT NULL,
  `perubahan_id_kategori` enum('0','1') NOT NULL DEFAULT '0',
  `id_kategori_lama` tinyint(3) DEFAULT NULL,
  `id_kategori_baru` tinyint(3) DEFAULT NULL,
  `perubahan_judul` enum('0','1') NOT NULL DEFAULT '0',
  `judul_lama` varchar(150) DEFAULT NULL,
  `judul_baru` varchar(150) DEFAULT NULL,
  `perubahan_isi_berita` enum('0','1') NOT NULL DEFAULT '0',
  `isi_berita_lama` text DEFAULT NULL,
  `isi_berita_baru` text DEFAULT NULL,
  `jml_komentar` int(5) DEFAULT NULL,
  `tgl_post` datetime NOT NULL,
  `tgl_terbit` datetime NOT NULL,
  `perubahan_tayang_umum` enum('0','1') NOT NULL DEFAULT '0',
  `tayang_umum_lama` enum('0','1') DEFAULT NULL,
  `tayang_umum_baru` enum('0','1') DEFAULT NULL,
  `perubahan_tayang_opd` enum('0','1') NOT NULL DEFAULT '0',
  `tayang_opd_lama` enum('0','1') DEFAULT NULL,
  `tayang_opd_baru` enum('0','1') DEFAULT NULL,
  `perubahan_tayang_pribadi` enum('0','1') NOT NULL DEFAULT '0',
  `tayang_pribadi_lama` enum('0','1') DEFAULT NULL,
  `tayang_pribadi_baru` enum('0','1') DEFAULT NULL,
  `perubahan_status` enum('0','1') NOT NULL DEFAULT '0',
  `status_lama` tinyint(4) DEFAULT NULL,
  `status_baru` tinyint(4) DEFAULT NULL,
  `perubahan_gambar` enum('0','1') NOT NULL DEFAULT '0',
  `gambar_lama` varchar(100) DEFAULT NULL,
  `gambar_baru` varchar(100) DEFAULT NULL,
  `jml_klik` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_log`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for trigger dk_tpi3.after_insert_berita
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `after_insert_berita` AFTER INSERT ON `d_berita` FOR EACH ROW BEGIN
	INSERT INTO `d_log_berita` 
		(
			`d_log_berita`.`id_berita`,
			`d_log_berita`.`id_opd`,
			`d_log_berita`.`yg_bikin`,
			`d_log_berita`.`perubahan_id_kategori`,
			`d_log_berita`.`id_kategori_baru`, 
			`d_log_berita`.`proses`, 
			`d_log_berita`.`ip`, 
			`d_log_berita`.`perubahan_judul`,
			`d_log_berita`.`judul_baru`, 
			`d_log_berita`.`perubahan_isi_berita`,
			`d_log_berita`.`isi_berita_baru`,
			`d_log_berita`.`jml_komentar`,
			`d_log_berita`.`tgl_post`,
			`d_log_berita`.`tgl_terbit`,
			`d_log_berita`.`perubahan_tayang_umum`,
			`d_log_berita`.`tayang_umum_baru`,
			`d_log_berita`.`perubahan_tayang_opd`,
			`d_log_berita`.`tayang_opd_baru`,
			`d_log_berita`.`perubahan_tayang_pribadi`,
			`d_log_berita`.`tayang_pribadi_baru`,
			`d_log_berita`.`perubahan_status`,
			`d_log_berita`.`status_baru`,
			`d_log_berita`.`perubahan_gambar`,
			`d_log_berita`.`gambar_baru`,
			`d_log_berita`.`jml_klik`,
			`d_log_berita`.`yg_ngubah`
		)
	VALUES
		(
			NEW.`id_berita`,
			NEW.`id_opd`,
			NEW.`id_user`,
			'1',
			NEW.`id_kategori`,
			CONCAT('Tambah Berita'),
			USER(),
			'1',
			NEW.`judul_berita`,
			'1',
			NEW.`isi_berita`,
			NEW.`jml_komentar`,
			NEW.`tgl_post`,
			NEW.`tgl_terbit`,
			'1',
			NEW.`tayang_umum`,
			'1',
			NEW.`tayang_opd`,
			'1',
			NEW.`tayang_pribadi`,
			'1',
			NEW.`status`,
			'1',
			NEW.`gambar`,
			NEW.`jml_klik`,
			NEW.`id_user`
		);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger dk_tpi3.after_update_berita
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `after_update_berita` AFTER UPDATE ON `d_berita` FOR EACH ROW BEGIN
	INSERT INTO `d_log_berita`
		(
			`d_log_berita`.`id_berita`,
			d_log_berita.id_opd,
			d_log_berita.yg_bikin,
			d_log_berita.perubahan_id_kategori,
			d_log_berita.id_kategori_lama,
			d_log_berita.id_kategori_baru,
			`d_log_berita`.`proses`, 
			`d_log_berita`.`ip`, 
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
			`d_log_berita`.`yg_ngubah`
		)
	VALUES
		(
			NEW.`id_berita`,
				NEW.`id_opd`,
				NEW.`id_user`,
				if(OLD.`id_kategori`=NEW.`id_kategori`, '0', '1'),
				if(OLD.`id_kategori`=NEW.`id_kategori`, NEW.`id_kategori`, OLD.`id_kategori`),
				if(OLD.`id_kategori`=NEW.`id_kategori`, NULL, NEW.`id_kategori`),
			CONCAT('Ubah Berita'),
			USER(),
			if(OLD.`judul_berita`=NEW.`judul_berita`, '0', '1'),
			if(OLD.`judul_berita`=NEW.`judul_berita`, NEW.`judul_berita`, OLD.`judul_berita`),
			if(OLD.`judul_berita`=NEW.`judul_berita`, NULL, NEW.`judul_berita`),
			if(OLD.`isi_berita`=NEW.`isi_berita`, '0', '1'),
			if(OLD.`isi_berita`=NEW.`isi_berita`, NEW.`isi_berita`, OLD.`isi_berita`),
			if(OLD.`isi_berita`=NEW.`isi_berita`, NULL, NEW.`isi_berita`),
				NEW.`jml_komentar`,
				NEW.`tgl_post`,
				NEW.`tgl_terbit`,
				
				if(OLD.`tayang_umum`=NEW.`tayang_umum`, '0', '1'),
				if(OLD.`tayang_umum`=NEW.`tayang_umum`, NEW.`tayang_umum`, OLD.`tayang_umum`),
				if(OLD.`tayang_umum`=NEW.`tayang_umum`, NULL, NEW.`tayang_umum`),
				
				if(OLD.`tayang_opd`=NEW.`tayang_opd`, '0', '1'),
				if(OLD.`tayang_opd`=NEW.`tayang_opd`, NEW.`tayang_opd`, OLD.`tayang_opd`),
				if(OLD.`tayang_opd`=NEW.`tayang_opd`, NULL, NEW.`tayang_opd`),
				
				if(OLD.`tayang_pribadi`=NEW.`tayang_pribadi`, '0', '1'),
				if(OLD.`tayang_pribadi`=NEW.`tayang_pribadi`, NEW.`tayang_pribadi`, OLD.`tayang_pribadi`),
				if(OLD.`tayang_pribadi`=NEW.`tayang_pribadi`, NULL, NEW.`tayang_pribadi`),
				
			if(OLD.`status`=NEW.`status`, '0', '1'),
			if(OLD.`status`=NEW.`status`, NEW.`status`, OLD.`status`),
			if(OLD.`status`=NEW.`status`, NULL, NEW.`status`),
			if(OLD.`gambar`=NEW.`gambar`, '0', '1'),
			if(OLD.`gambar`=NEW.`gambar`, NEW.`gambar`, OLD.`gambar`),
			if(OLD.`gambar`=NEW.`gambar`, NULL, NEW.`gambar`),
				NEW.`jml_klik`,
			NEW.`yg_ngubah`
		);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger dk_tpi3.before_delete_berita
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `before_delete_berita` BEFORE DELETE ON `d_berita` FOR EACH ROW BEGIN
	INSERT INTO `d_log_berita` 
		(
			`d_log_berita`.`id_berita`,
			`d_log_berita`.`id_opd`,
			`d_log_berita`.`yg_bikin`,
			`d_log_berita`.`perubahan_id_kategori`,
			`d_log_berita`.`id_kategori_lama`, 
			`d_log_berita`.`proses`, 
			`d_log_berita`.`ip`, 
			`d_log_berita`.`perubahan_judul`,
			`d_log_berita`.`judul_lama`, 
			`d_log_berita`.`perubahan_isi_berita`,
			`d_log_berita`.`isi_berita_lama`,
			`d_log_berita`.`jml_komentar`,
			`d_log_berita`.`tgl_post`,
			`d_log_berita`.`tgl_terbit`,
			`d_log_berita`.`perubahan_tayang_umum`,
			`d_log_berita`.`tayang_umum_lama`,
			`d_log_berita`.`perubahan_tayang_opd`,
			`d_log_berita`.`tayang_opd_lama`,
			`d_log_berita`.`perubahan_tayang_pribadi`,
			`d_log_berita`.`tayang_pribadi_lama`,
			`d_log_berita`.`perubahan_status`,
			`d_log_berita`.`status_lama`,
			`d_log_berita`.`perubahan_gambar`,
			`d_log_berita`.`gambar_lama`,
			`d_log_berita`.`jml_klik`,
			`d_log_berita`.`yg_ngubah`
		)
	VALUES
		(
			OLD.`id_berita`,
			OLD.`id_opd`,
			OLD.`id_user`,
			'1',
			OLD.`id_kategori`,
			CONCAT('Hapus Berita'),
			USER(),
			'1',
			OLD.`judul_berita`,
			'1',
			OLD.`isi_berita`,
			OLD.`jml_komentar`,
			OLD.`tgl_post`,
			OLD.`tgl_terbit`,
			'1',
			OLD.`tayang_umum`,
			'1',
			OLD.`tayang_opd`,
			'1',
			OLD.`tayang_pribadi`,
			'1',
			OLD.`status`,
			'1',
			OLD.`gambar`,
			OLD.`jml_klik`,
			OLD.`id_user`
		);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
