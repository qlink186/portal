let express = require('express');
let router = express.Router() ;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render( 'portal/index', {
    title:  'Pemerintah Kota Tanjungpinang',
    menu:   '/'
    });
});

/* GET berita page. */
router.get('/berita', function(req, res, next) {
  res.render( 'portal/berita', {
    menu: 'berita',
    icon: 'linecons-note',
    title: 'Berita',
    desc: 'Berita / Artikel ',
    desc2:'di Lingkungan Pemerintah Kota Tanjungpinang'
    });
});

/* GET berita page. */
router.get('/berita/view', function(req, res, next) {
  res.render( 'portal/berita-single', {
    menu: 'berita',
    icon: 'linecons-note',
    title: 'Berita',
    desc: 'Berita / Artikel ',
    desc2:'4,810 TURIS CINA MASUK KE TANJUNGPINANG SELAMA BULAN FEBRUARI.'
    });
});

/* GET Selayang Pandang page. */
router.get('/pages-profil', function(req, res, next) {
  res.render( 'portal/pages', {
    menu: 'pages-profil',
    title: 'Selayang Pandang',
    desc: 'Selayang Pandang Pemerintah Kota Tanjungpinang'
    });
});

/* GET Visi dan Misi page. */
router.get('/pages-visimisi', function(req, res, next) {
  res.render( 'portal/pages', {
    menu: 'pages-visimisi',
    title: 'Visi dan Misi',
    desc: 'Visi dan Misi Pemerintah Kota Tanjungpinang'
    });
});

/* GET Lambang dan Motto page. */
router.get('/pages-lambangmoto', function(req, res, next) {
  res.render( 'portal/pages', {
    menu: 'pages-lambangmoto',
    title: 'Lambang dan Motto',
    desc: 'Lambang dan Motto Pemerintah Kota Tanjungpinang'
    });
});

/* GET Kepala Daerah page. */
router.get('/pages-kepaladaerah', function(req, res, next) {
  res.render( 'portal/pages', {
    menu: 'pages-kepaladaerah',
    title: 'Sambutan Kepala Daerah',
    desc: 'Sambutan Kepala Daerah Pemerintah Kota Tanjungpinang'
    });
});

/* GET Struktur Organisasi page. */
router.get('/pages-strukturorg', function(req, res, next) {
  res.render( 'portal/pages', {
    menu: 'pages-strukturorg',
    title: 'Struktur Organisasi',
    desc: 'Struktur Organisasi Pemerintah Kota Tanjungpinang'
    });
});

/* GET Struktur Organisasi page. */
router.get('/pages-aksidaerah', function(req, res, next) {
  res.render( 'portal/pages', {
    menu: 'pages-aksidaerah',
    title: 'Aksi Daerah PPK',
    desc: 'Rencana Aksi Daerah Pencegahan dan Pemberantasan Korupsi (PPK)'
    });
});

/* GET Data Unit Kerja page. */
router.get('/data-unitkerja', function(req, res, next) {
  res.render( 'portal/data', {
    menu: 'data-unitkerja',
    icon: 'fa-institution',
    title: 'Data Unit Kerja',
    desc: 'Data Unit Kerja ',
    desc2:'di Lingkungan Pemerintah Kota Tanjungpinang'
    });
});

/* GET Data Pegawai page. */
router.get('/data-peg', function(req, res, next) {
  res.render( 'portal/data', {
    menu: 'data-peg',
    icon: 'fa-users',
    title: 'Data Pegawai',
    desc: 'Data Pegawai ',
    desc2:'di Lingkungan Pemerintah Kota Tanjungpinang'
    });
});

/* GET Data Download Area page. */
router.get('/download-area', function(req, res, next) {
  res.render( 'portal/data', {
    menu: 'download-area',
    icon: 'fa-download',
    title: 'Download Area',
    desc: 'Download Area ',
    desc2:'berbagi dokumen / file'
    });
});

/* GET Gallery page. */
router.get('/gallery', function(req, res, next) {
  res.render( 'portal/gallery', {
    menu: 'gallery',
    icon: 'linecons-photo',
    title: 'Gallery',
    desc: 'Gallery Foto / Video ',
    desc2:'di Lingkungan Pemerintah Kota Tanjungpinang'
    });
});

/* GET adm page. */
router.get('/adm', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-index', {
    menu: 'adm',
    title: 'Administrator Pelaporan',
    desc: 'Ruang Administrator'
  });
});

/* GET adm ADUAN. */
router.get('/adm-aduan-list', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-aduan', {
    menu: 'adm-aduan-list',
    title: 'Data Aduan Masyarakat',
    desc: 'Pelaporan Masyarakat terhadap kinerja Unit Kerja di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-aduan-tanggapan', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-aduan-tanggapan', {
    menu: 'adm-aduan-tanggapan',
    title: 'Tanggapan Pelaporan Masyarakat',
    desc: 'Tanggapan Pelaporan Masyarakat di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-aduan-kategori', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-aduan-kategori', {
    menu: 'adm-aduan-kategori',
    title: 'Kategori Pelaporan Masyarakat',
    desc: 'Kategori Pelaporan Masyarakat di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-aduan-operator', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-aduan-operator', {
    menu: 'adm-aduan-operator',
    title: 'Petugas Pelaporan Masyarakat',
    desc: 'Petugas / Operator Pelaporan Masyarakat yang tersebar di seluruh OPD di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-setting-aduan', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-setting-aduan', {
    menu: 'adm-setting-aduan',
    title: 'Pengaturan Pelaporan Masyarakat',
    desc: 'Pengaturan Pelaporan Masyarakat'
  });
});

/* GET adm ARTIKEL. */
router.get('/adm-artikel-list', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-artikel-list', {
    menu: 'adm-artikel-list',
    title: 'Data Artikel',
    desc: 'Pengelolaan Artikel / Berita di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-artikel-tulis', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-artikel-tulis', {
    menu: 'adm-artikel-tulis',
    title: 'Tulis Artikel',
    desc: 'Menerbitkan berita'
  });
});

router.get('/adm-artikel-kategori', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-artikel-kategori', {
    menu: 'adm-artikel-kategori',
    title: 'Kategori Artikel',
    desc: 'Artikel akan ditampilkan berdasarkan kategori di bawah ini'
  });
});

router.get('/adm-artikel-komentar', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-artikel-komentar', {
    menu: 'adm-artikel-komentar',
    title: 'Komentar Artikel',
    desc: 'Data Komentar dari artikel yang ditayangkan'
  });
});

router.get('/adm-artikel-editor', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-artikel-editor', {
    menu: 'adm-artikel-editor',
    title: 'Editor Artikel',
    desc: 'Pengelolaan Artikel / Berita di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

/* GET adm HALAMAN. */
router.get('/adm-halaman-list', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-halaman-list', {
    menu: 'adm-halaman-list',
    title: 'Data Halaman',
    desc: 'Pengelolaan Halaman / Pages di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-halaman-tulis', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-halaman-tulis', {
    menu: 'adm-halaman-tulis',
    title: 'Buat Halaman Baru',
    desc: 'Penambahan data Halaman / Pages di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-setting-menu', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-setting-menu', {
    menu: 'adm-setting-menu',
    title: 'Pengaturan Menu',
    desc: 'Berdasarkan Halaman / Pages yang ada'
  });
});

/* GET adm SIARAN PERS. */
router.get('/adm-siaran-pers', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-siaran-pers', {
    menu: 'adm-siaran-pers',
    title: 'Data Siaran PErs',
    desc: 'Pengelolaan Siaran Pers dan / atau Pengumuman di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

/* GET adm KALENDER EVENT. */
router.get('/adm-kalender-event', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-kalender-event', {
    menu: 'adm-kalender-event',
    title: 'Data Kalender Event',
    desc: 'Pengaturan Kalender Event (Acara) di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

/* GET adm SLIDESHOW. */
router.get('/adm-slideshow', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-slideshow', {
    menu: 'adm-slideshow',
    title: 'Data Slideshow',
    desc: 'Pengaturan Slideshow / Carousel'
  });
});

/* GET adm PEGAWAI. */
router.get('/adm-peg-list', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-peg-list', {
    menu: 'adm-peg-list',
    title: 'Data Pegawai',
    desc: 'Data Seluruh Pegawai di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-peg-tambah', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-peg-tambah', {
    menu: 'adm-peg-tambah',
    title: 'Tambah Pegawai',
    desc: 'Penambahan Data PNS / PTT / OS di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-peg-mutasi', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-peg-mutasi', {
    menu: 'adm-peg-mutasi',
    title: 'Mutasi Pegawai',
    desc: 'Mutasi PNS / PTT / OS di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-unit-kerja', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-unit-kerja', {
    menu: 'adm-unit-kerja',
    title: 'Data Unit Kerja',
    desc: 'Unit Kerja di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

/* GET adm MEMBER. */
router.get('/adm-member-list', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-member-list', {
    menu: 'adm-member-list',
    title: 'Data Member',
    desc: 'Kelola Member berdasarkan level member.'
  });
});

router.get('/adm-member-tambah', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-member-tambah', {
    menu: 'adm-member-tambah',
    title: 'Tambah Member',
    desc: 'Penambahan User / Member diambil dari Pegawai yang telah terdata.'
  });
});

/* GET adm GALLERY. */
router.get('/adm-gallery-gambar-list', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-gallery-gambar-list', {
    menu: 'adm-gallery-gambar-list',
    title: 'Data Gallery | Gambar',
    desc: 'Gambar Kegiatan di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-gallery-video-list', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-gallery-video-list', {
    menu: 'adm-gallery-video-list',
    title: 'Data Gallery | Video',
    desc: 'Video Kegiatan di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

/* GET adm DOWNLOAD AREA. */
router.get('/adm-download-list', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-download-list', {
    menu: 'adm-download-list',
    title: 'Data Download | File',
    desc: 'Seluruh Dokumen yang diunggah oleh member'
  });
});

router.get('/adm-download-kategori', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-download-kategori', {
    menu: 'adm-download-kategori',
    title: 'Data Kategori File',
    desc: 'Kategori File Download Area pada seluruh Dokumen yang diunggah oleh member'
  });
});

/* GET adm DATA. */
router.get('/adm-data-opd', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-data-opd', {
    menu: 'adm-data-opd',
    title: 'Data Unit Kerja',
    desc: 'Data Unit Kerja di Lingkungan Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-data-link', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-data-link', {
    menu: 'adm-data-link',
    title: 'Data Pranala Luar',
    desc: 'Data Pranala Luar'
  });
});

router.get('/adm-data-kontak-penting', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-data-kontak-penting', {
    menu: 'adm-data-kontak-penting',
    title: 'Data Kontak Penting',
    desc: 'Data Kontak Penting di Lingkungan Kota Tanjungpinang'
  });
});

/* GET adm BUKU TAMU. */
router.get('/adm-buku-tamu', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-buku-tamu', {
    menu: 'adm-buku-tamu',
    title: 'Data Buku Tamu',
    desc: 'Data Buku Tamu yang diisi oleh member (umum)'
  });
});

/* GET adm SETTING. */
router.get('/adm-setting-profile', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-setting-profile', {
    menu: 'adm-setting-profile',
    title: 'Profile',
    desc: 'Pengaturan Profil Member'
  });
});

router.get('/adm-setting-sistem', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-setting-sistem', {
    menu: 'adm-setting-sistem',
    title: 'Pengaturan Sistem Portal',
    desc: 'Pengaturan Sistem Portal Website Pemerintah Kota Tanjungpinang'
  });
});

router.get('/adm-setting-db', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-setting-db', {
    menu: 'adm-setting-db',
    title: 'Backup Database',
    desc: 'Pengaturan Backup Database'
  });
});

router.get('/adm-setting-log', isAuthenticated, (req, res, next) => {
  res.render('adm/adm-setting-log', {
    menu: 'adm-setting-log',
    title: 'Log Record',
    desc: 'Record Seluruh Kegiatan Member terhadap halaman Administrator'
  });
});

/* GET adm LOGOUT. */
router.get('/logout', function (req, res) {
  req.logout();
  req.flash('success_msg', 'Anda telah berhasil keluar');
  res.redirect('./auth');
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('./auth');
  }
}
module.exports = router;
