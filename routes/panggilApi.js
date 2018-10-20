var request = require('request'); // require in request
var alamatAPI = 'http://localhost:8000/api/';

var apiCaller = function (url, cb) {
    //use request to make the external http call to the JSON api
    request({
        url: url,
        json: true,
        contentType: "application/json"
        //headers : {"token" : key_value}
    },
    function (error, response, body) {
        if (!error && response.statusCode === 200) {
          cb(body);// Send body/response to callback
        }
    })
};

/* ---------- PANGGIL API BERITA ---------- */
var panggilBerita = function(cb) {
    var dataApi = 'berita';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

/* ---------- PANGGIL API BERITA HOME ---------- */
var panggilBeritaHome = function(cb) {
    var dataApi = 'berita_home';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

/* ---------- PANGGIL API BERITA POPULER ---------- */
var panggilBeritaPopuler = function(cb) {
    var dataApi = 'berita_populer';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var panggilBeritaJumlah = function(cb) {
    var dataApi = 'berita_jumlah';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var panggilBeritaKategori = function(cb) {
    var dataApi = 'berita_kategori';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

/* ---------- PANGGIL API DIP ---------- */
var panggilDip = function(cb) {
    var dataApi = 'dip';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var postDip = function(post, cb) {
    var dataApi = 'dip';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat + post, cb);
};

/* ---------- PANGGIL API DIP berdasarkan KATEGORI ---------- */
var panggilDipKat = function(cb) {
    var dataApi = 'dip/kategori';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var postDipKat = function(post, cb) {
    var dataApi = 'dip/kategori';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat + post, cb);
};

/* ---------- PANGGIL API DOWNLOAD AREA ---------- */
var panggilDownloadArea = function(cb) {
    var dataApi = 'download-area';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var postDownloadArea = function(post, cb) {
    var dataApi = 'download-area';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat + post, cb);
};

/* ---------- PANGGIL API DOWNLOAD HOME ---------- */
var panggilDownloadHome = function(cb) {
    var dataApi = 'download_home';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};


/* ---------- PANGGIL API GALLERY ---------- */
var panggilGallery = function(cb) {
    var dataApi = 'gallery';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var postGallery = function(post, cb) {
    var dataApi = 'gallery';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat + post, cb);
};

/* ---------- PANGGIL API ALBUM GALLERY ---------- */
var panggilAlbumGallery = function(cb) {
    var dataApi = 'gallery_album';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var postAlbumGallery = function(post, cb) {
    var dataApi = 'gallery_album';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat + post, cb);
};

/* ---------- PANGGIL API TAHUN ALBUM GALLERY ---------- */
var panggilAlbumGalleryTh = function(cb) {
    var dataApi = 'gallery_album_th';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

/* ---------- PANGGIL API INSTANSI ---------- */
var panggilEvent = function(cb) {
    var dataApi = 'kalenderevent';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var postEvent= function(post, cb) {
    var dataApi = 'kalenderevent';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat + post, cb);
};

/* ---------- PANGGIL API INSTANSI ---------- */
var panggilOpd = function(cb) {
    var dataApi = 'unitkerja';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var postOpd= function(post, cb) {
    var dataApi = 'unitkerja';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat + post, cb);
};

/* ---------- PANGGIL API USERS ---------- */
var panggilUsers = function(cb) {
    var dataApi = 'users';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var postUsers = function(post, cb) {
    var dataApi = 'users';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat + post, cb);
};

/* ---------- PANGGIL API PEGAWAI ---------- */
var panggilPeg = function(cb) {
    var dataApi = 'peg';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var postPeg= function(post, cb) {
    var dataApi = 'peg';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat + post, cb);
};

/* ---------- PANGGIL API JUMLAH PEGAWAI ---------- */
var panggilJumPeg = function(cb) {
    var dataApi = 'data/jum_peg';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

/* ---------- PANGGIL API PENGUMUMAN ---------- */
var panggilPengumuman = function(cb) {
    var dataApi = 'pengumuman';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

/* ---------- PANGGIL API PENGUMUMAN KHUSUS ---------- */
var panggilPengumumanKhusus = function(cb) {
    var dataApi = 'pengumuman_khusus';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

/* ---------- PANGGIL API PRANALA LUAR ---------- */
var panggilPranalaLuar = function(cb) {
    var dataApi = 'pranala-luar';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var postPranalaLuar= function(post, cb) {
    var dataApi = 'pranala-luar';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat + post, cb);
};

/* ---------- PANGGIL API SUBDOMAIN ---------- */
var panggilSubdomain = function(cb) {
    var dataApi = 'data/subdomain';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

var postSubdomain= function(post, cb) {
    var dataApi = 'data/subdomain';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat + post, cb);
};

/* ---------- PANGGIL ADMIN MENU ---------- */
var panggilTempMenu = function(cb) {
    var dataApi = 'temp_menu';
    var alamat = alamatAPI+dataApi;
    return apiCaller(alamat, cb);
};

// Export the functions for external access
module.exports = {
    panggilUsers: panggilUsers,
    postUsers: postUsers,
    panggilPeg: panggilPeg,
    panggilJumPeg: panggilJumPeg,
    postPeg: postPeg,
    panggilPranalaLuar: panggilPranalaLuar,
    postPranalaLuar: postPranalaLuar,
    panggilOpd: panggilOpd,
    postOpd: postOpd,
    panggilGallery: panggilGallery,
    postGallery: postGallery,
    panggilAlbumGallery: panggilAlbumGallery,
    postAlbumGallery: postAlbumGallery,
    panggilAlbumGalleryTh: panggilAlbumGalleryTh,
    panggilEvent: panggilEvent,
    postEvent: postEvent,
    panggilDip: panggilDip,
    postDip: postDip,
    panggilDipKat: panggilDipKat,
    postDipKat: postDipKat,
    panggilDownloadArea: panggilDownloadArea,
    postDownloadArea: postDownloadArea,
    panggilDownloadHome: panggilDownloadHome,
    panggilBerita: panggilBerita,
    panggilBeritaHome: panggilBeritaHome,
    panggilBeritaPopuler: panggilBeritaPopuler,
    panggilBeritaJumlah: panggilBeritaJumlah,
    panggilBeritaKategori: panggilBeritaKategori,
    panggilPengumuman: panggilPengumuman,
    panggilPengumumanKhusus: panggilPengumumanKhusus,
    panggilSubdomain: panggilSubdomain,
    postSubdomain: postSubdomain,
    panggilTempMenu: panggilTempMenu
};