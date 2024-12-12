-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Des 2024 pada 13.52
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartcon`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `categories` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `author`, `date`, `categories`, `image`, `created_at`) VALUES
(2, 'cara menjadi petani kaya', '**Cara Menjadi Petani Sukses: Panduan Singkat untuk Pemula**  \r\n\r\nMenjadi petani sukses membutuhkan kombinasi kerja keras, pengetahuan, dan strategi yang tepat. Berikut adalah beberapa langkah yang bisa Anda terapkan:  \r\n\r\n1. **Pahami Potensi Lahan**  \r\n   Kenali kondisi tanah, iklim, dan jenis tanaman yang cocok untuk lahan Anda. Lakukan analisis tanah untuk menentukan nutrisi yang dibutuhkan agar hasil panen maksimal.  \r\n\r\n2. **Belajar dan Terapkan Teknologi Pertanian**  \r\n   Ikuti pelatihan atau kursus pertanian modern untuk menguasai teknik terbaru, seperti irigasi tetes, penggunaan pupuk organik, dan alat-alat pertanian otomatis.  \r\n\r\n3. **Pilih Komoditas yang Tepat**  \r\n   Fokuslah pada tanaman atau komoditas dengan permintaan tinggi di pasar. Lakukan riset pasar terlebih dahulu untuk memastikan hasil panen memiliki peluang besar untuk laku.  \r\n\r\n4. **Manajemen Keuangan yang Baik**  \r\n   Kelola pendapatan dan pengeluaran dengan bijak. Catat semua transaksi, baik pembelian pupuk, alat, maupun hasil penjualan. Aplikasi pembukuan bisa menjadi solusi untuk efisiensi.  \r\n\r\n5. **Jalin Kerjasama dengan Komunitas**  \r\n   Bergabunglah dengan kelompok tani atau komunitas pertanian untuk berbagi pengalaman, mendapatkan informasi terbaru, dan membangun jaringan pemasaran yang lebih luas.  \r\n\r\n6. **Manfaatkan Media Digital**  \r\n   Pasarkan hasil tani Anda melalui media sosial atau platform online. Anda juga bisa membuat merek lokal untuk menarik pembeli langsung tanpa perantara.  \r\n\r\n7. **Jaga Konsistensi dan Kualitas**  \r\n   Pastikan hasil panen Anda berkualitas tinggi dan konsisten. Hal ini akan membuat Anda dipercaya oleh pembeli dan distributor.  \r\n\r\nDengan kerja keras dan strategi yang terencana, sukses di bidang pertanian bukanlah hal yang mustahil. Mulailah dari langkah kecil dan terus belajar untuk meningkatkan kemampuan Anda!  \r\n', 'Lukman', '2024-11-26', 'pendidikan', '/uploads/1732596861668-1662819890567.jpg', '2024-11-26 04:54:21'),
(4, 'Tutorial Menjadi Petani Jagung', 'Petani Jagung Adalah Petani Yang mudah', 'Admin', '2024-11-28', 'Sosial', '/uploads/1732782934362-PETANI_JAGUNG_DESA_GALUK.jpeg', '2024-11-28 08:35:34'),
(5, 'Menjadi Petani Handal', '\r\nCara Menjadi Petani Handal: Tips untuk Sukses dalam Dunia Pertanian\r\n\r\nMenjadi petani handal adalah impian banyak orang yang ingin terlibat dalam dunia pertanian dan menghasilkan produk berkualitas. Namun, untuk mencapainya, diperlukan keterampilan, pengetahuan, dan tekad yang kuat. Berikut adalah beberapa langkah yang dapat membantu Anda menjadi petani yang sukses.\r\n\r\n 1. Pahami Dasar-Dasar Pertanian\r\nLangkah pertama untuk menjadi petani handal adalah dengan mempelajari dasar-dasar pertanian. Pengetahuan tentang berbagai jenis tanaman, teknik budidaya, serta cara merawat tanah adalah hal yang penting. Anda juga perlu mengerti tentang cara memilih bibit yang baik, waktu tanam yang tepat, dan cara mengatasi hama atau penyakit tanaman.\r\n\r\n2. Pilih Jenis Tanaman yang Tepat\r\nTidak semua jenis tanaman cocok ditanam di semua daerah. Pilih tanaman yang sesuai dengan iklim dan kondisi tanah tempat Anda berada. Misalnya, tanaman padi cocok ditanam di daerah yang memiliki curah hujan tinggi, sementara tanaman sayuran seperti cabai atau tomat lebih cocok untuk daerah dengan iklim kering. Konsultasikan dengan ahli pertanian atau petani lain di daerah Anda untuk memilih jenis tanaman yang paling potensial.\r\n\r\n3. Gunakan Teknologi Pertanian\r\nInovasi teknologi pertanian telah berkembang pesat dan sangat membantu petani untuk meningkatkan hasil panen mereka. Mulai dari penggunaan alat pertanian modern, sistem irigasi yang efisien, hingga aplikasi yang membantu memantau kesehatan tanaman, semuanya dapat membuat pekerjaan Anda lebih mudah dan produktif. Sebagai petani, Anda harus terbuka untuk memanfaatkan teknologi yang ada.\r\n\r\n4. Kelola Sumber Daya Alam dengan Bijak\r\nSebagai petani, Anda harus bisa mengelola sumber daya alam seperti air, tanah, dan pupuk dengan bijak. Menggunakan pupuk organik dan ramah lingkungan bisa membantu menjaga kualitas tanah untuk jangka panjang. Selain itu, pastikan untuk melakukan rotasi tanaman untuk menghindari kelelahan tanah dan memastikan tanaman yang Anda tanam tetap sehat.\r\n\r\n 5. Fokus pada Kualitas, Bukan Kuantitas\r\nBanyak petani yang tergoda untuk menanam tanaman dalam jumlah besar demi keuntungan yang cepat. Namun, menjadi petani handal berarti fokus pada kualitas hasil pertanian Anda. Hasil yang berkualitas tinggi tidak hanya meningkatkan harga jual, tetapi juga menarik pembeli yang loyal. Dengan produk yang berkualitas, Anda juga dapat membangun reputasi yang baik di pasar.\r\n\r\n6. Belajar dari Pengalaman dan Gagal\r\nSetiap petani pasti pernah mengalami kegagalan, entah itu karena gagal panen, hama, atau kondisi cuaca yang tidak mendukung. Tetapi, kegagalan adalah bagian dari proses belajar. Petani handal adalah mereka yang bisa belajar dari kegagalan dan terus berusaha untuk memperbaiki metode budidaya mereka. Cobalah untuk mengevaluasi setiap kesalahan dan mencari solusi yang lebih baik di masa depan.\r\n\r\n 7. Jalin Hubungan dengan Komunitas Pertanian\r\nJangan ragu untuk bergabung dengan komunitas pertanian atau koperasi yang dapat membantu Anda berkembang. Melalui komunitas, Anda bisa berbagi pengetahuan, belajar dari pengalaman petani lain, serta mendapatkan akses ke pasar yang lebih luas. Jaringan yang kuat sangat penting dalam dunia pertanian untuk membuka peluang baru, baik itu untuk penjualan atau akses ke teknologi terbaru.\r\n\r\n### 8. **Pemasaran dan Penjualan**\r\nSelain fokus pada teknik budidaya yang baik, penting juga untuk memiliki strategi pemasaran yang efektif. Anda bisa memanfaatkan media sosial untuk mempromosikan hasil pertanian Anda, menjalin kerja sama dengan pengepul, atau menjual langsung ke konsumen melalui pasar atau gerai khusus. Semakin banyak saluran distribusi yang Anda buka, semakin besar peluang untuk sukses.\r\n\r\n### 9. **Pendidikan dan Pelatihan Berkelanjutan**\r\nPertanian adalah bidang yang selalu berkembang, dengan teknik baru dan inovasi yang muncul setiap tahun. Untuk itu, seorang petani handal harus selalu memperbarui pengetahuan dan keterampilannya. Mengikuti pelatihan atau seminar tentang pertanian modern bisa memberikan wawasan baru yang berguna untuk meningkatkan hasil dan produktivitas Anda.\r\n\r\n### 10. **Manajemen Keuangan yang Baik**\r\nMenjadi petani handal tidak hanya tentang bertani, tetapi juga tentang mengelola keuangan dengan baik. Memiliki anggaran yang jelas untuk pembelian benih, pupuk, alat pertanian, dan pengeluaran lainnya sangat penting. Selain itu, petani juga harus pintar dalam menyisihkan sebagian hasil untuk reinvestasi, sehingga bisnis pertanian Anda bisa terus berkembang.\r\n\r\n### Penutup\r\nMenjadi petani handal membutuhkan waktu, dedikasi, dan kemampuan untuk beradaptasi dengan perubahan. Dengan pengetahuan yang tepat, penggunaan teknologi, serta manajemen yang baik, Anda dapat meraih kesuksesan dalam dunia pertanian. Jangan takut untuk terus belajar dan berkembang, karena petani yang sukses adalah mereka yang terus berinovasi dan beradaptasi dengan perkembangan zaman.\r\n', 'Admin', '2024-12-04', 'Pendidikan', '/uploads/1733319793228-indonesia-1203250-480-6188bfa706310e20b94ba9f2.jpg', '2024-12-04 13:43:13'),
(6, 'Cara menghindari Gagal Panen Jangung', '<p>Untuk menghindari gagal panen jagung, ada beberapa langkah yang bisa diambil untuk memastikan tanaman jagung tumbuh dengan optimal dan menghasilkan panen yang maksimal. Berikut beberapa tips yang dapat membantu:</p><h3>1. <strong>Pemilihan Varietas Jagung yang Tepat</strong></h3><ul><li>Pilih varietas jagung yang sesuai dengan iklim dan kondisi tanah di lokasi Anda. Pastikan memilih varietas yang tahan terhadap hama, penyakit, serta kondisi cuaca yang ekstrem.</li></ul><h3>2. <strong>Persiapan Tanah yang Baik</strong></h3><ul><li>Lakukan persiapan tanah dengan baik, seperti pembajakan dan pengolahan tanah agar aerasi tanah baik dan tanah tidak terlalu padat. Pastikan pH tanah sesuai untuk pertumbuhan jagung (pH 6-7).</li><li>Lakukan pemupukan yang tepat sesuai dengan kebutuhan nutrisi tanaman jagung.</li></ul><h3>3. <strong>Pengelolaan Irigasi yang Tepat</strong></h3><ul><li>Jagung memerlukan kelembapan yang cukup, terutama pada fase pertumbuhan awal dan pembentukan tongkol. Pastikan sistem irigasi berjalan dengan baik, terutama di musim kemarau.</li><li>Hindari genangan air yang dapat menyebabkan pembusukan akar atau penyakit.</li></ul><h3>4. <strong>Pengendalian Hama dan Penyakit</strong></h3><ul><li>Lakukan pemantauan rutin terhadap hama dan penyakit yang bisa menyerang tanaman jagung. Gunakan pestisida secara bijak dan sesuai dosis untuk menghindari resistensi.</li><li>Beberapa hama yang umum menyerang jagung adalah ulat grayak, wereng, dan kutu daun. Penyakit yang sering muncul antara lain busuk akar dan jamur.</li></ul><h3>5. <strong>Penanaman pada Waktu yang Tepat</strong></h3><ul><li>Pastikan Anda menanam jagung pada musim yang tepat, dengan memperhatikan curah hujan dan suhu yang ideal untuk pertumbuhannya.</li><li>Jangan menanam terlalu terlambat agar tanaman memiliki waktu yang cukup untuk berkembang sebelum datangnya musim hujan atau kemarau yang ekstrem.</li></ul><h3>6. <strong>Penggunaan Pupuk yang Tepat</strong></h3><ul><li>Pemupukan yang tepat waktu dan sesuai kebutuhan tanaman sangat penting. Gunakan pupuk kandang, pupuk anorganik, dan mikroba tanah yang dapat memperbaiki kesuburan tanah.</li><li>Pemupukan dilakukan pada fase yang tepat, seperti pada saat tanam, pembentukan daun, dan pembentukan tongkol.</li></ul><h3>7. <strong>Pengaturan Jarak Tanam yang Sesuai</strong></h3><ul><li>Jarak tanam yang baik memungkinkan tanaman jagung memiliki ruang yang cukup untuk tumbuh dan berkembang tanpa saling bersaing untuk mendapatkan cahaya matahari dan nutrisi tanah.</li><li>Jarak tanam yang ideal biasanya sekitar 75-80 cm antar baris dan 20-25 cm antar tanaman.</li></ul><h3>8. <strong>Pengendalian Gulma</strong></h3><ul><li>Gulma yang tumbuh di sekitar tanaman jagung bisa bersaing untuk mendapatkan air, cahaya, dan nutrisi. Oleh karena itu, lakukan pengendalian gulma secara rutin untuk mencegahnya mengganggu pertumbuhan tanaman jagung.</li></ul><h3>9. <strong>Perhatikan Kelembapan Tanah</strong></h3><ul><li>Jagung membutuhkan tanah yang cukup lembap, tetapi tidak tergenang. Pengaturan kelembapan tanah dengan baik sangat penting agar tanaman tidak kekurangan atau kelebihan air.</li></ul><h3>10. <strong>Panen pada Waktu yang Tepat</strong></h3><ul><li>Jagung harus dipanen pada waktu yang tepat, yaitu saat tongkol sudah mengering dan biji jagung sudah keras. Panen terlalu cepat atau terlambat bisa mengurangi kualitas hasil panen.</li></ul>', 'Admin', '2024-12-04', 'Pendidikan', '/uploads/1733320737340-panen-jagung-ok.jpeg', '2024-12-04 13:58:57');

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `disease_logs`
--

CREATE TABLE `disease_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plant_disease` varchar(255) NOT NULL,
  `detection_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `forums`
--

CREATE TABLE `forums` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `predicted_class` varchar(255) NOT NULL,
  `confidence` decimal(5,2) NOT NULL,
  `handling_tip` text DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`id`, `image`, `status`, `predicted_class`, `confidence`, `handling_tip`, `date`) VALUES
(1, '1733583229806.jpg', 'blight', 'blight', 0.65, '[\"1. Gunakan benih unggul: Pilih varietas jagung tahan terhadap blight (Pioneer P27, BIMA 20 URI).\",\"2. Fungisida: Semprotkan fungisida sistemik seperti mankozeb, flutriafol, atau propikonazol saat gejala awal muncul.\",\"3. Tanam tepat waktu: Hindari menanam jagung terlalu awal di musim hujan, karena kondisi lembap mendukung infeksi.\",\"4. Pengelolaan sisa tanaman: Hancurkan sisa tanaman yang terinfeksi agar tidak menjadi sumber inokulum.\",\"5. Rotasi tanaman: Tanam tanaman selain jagung (seperti kedelai) untuk memutus siklus hidup patogen.\"]', '2024-12-07 14:54:04'),
(2, '1733583700862.jpg', 'blight', 'blight', 0.82, '[\"1. Gunakan benih unggul: Pilih varietas jagung tahan terhadap blight (Pioneer P27, BIMA 20 URI).\",\"2. Fungisida: Semprotkan fungisida sistemik seperti mankozeb, flutriafol, atau propikonazol saat gejala awal muncul.\",\"3. Tanam tepat waktu: Hindari menanam jagung terlalu awal di musim hujan, karena kondisi lembap mendukung infeksi.\",\"4. Pengelolaan sisa tanaman: Hancurkan sisa tanaman yang terinfeksi agar tidak menjadi sumber inokulum.\",\"5. Rotasi tanaman: Tanam tanaman selain jagung (seperti kedelai) untuk memutus siklus hidup patogen.\"]', '2024-12-07 15:01:55'),
(3, '1733583920746.jpg', 'blight', 'blight', 0.82, '[\"1. Gunakan benih unggul: Pilih varietas jagung tahan terhadap blight (Pioneer P27, BIMA 20 URI).\",\"2. Fungisida: Semprotkan fungisida sistemik seperti mankozeb, flutriafol, atau propikonazol saat gejala awal muncul.\",\"3. Tanam tepat waktu: Hindari menanam jagung terlalu awal di musim hujan, karena kondisi lembap mendukung infeksi.\",\"4. Pengelolaan sisa tanaman: Hancurkan sisa tanaman yang terinfeksi agar tidak menjadi sumber inokulum.\",\"5. Rotasi tanaman: Tanam tanaman selain jagung (seperti kedelai) untuk memutus siklus hidup patogen.\"]', '2024-12-07 15:05:33'),
(4, '1733584153053.jpg', 'blight', 'blight', 0.65, '[\"1. Gunakan benih unggul: Pilih varietas jagung tahan terhadap blight (Pioneer P27, BIMA 20 URI).\",\"2. Fungisida: Semprotkan fungisida sistemik seperti mankozeb, flutriafol, atau propikonazol saat gejala awal muncul.\",\"3. Tanam tepat waktu: Hindari menanam jagung terlalu awal di musim hujan, karena kondisi lembap mendukung infeksi.\",\"4. Pengelolaan sisa tanaman: Hancurkan sisa tanaman yang terinfeksi agar tidak menjadi sumber inokulum.\",\"5. Rotasi tanaman: Tanam tanaman selain jagung (seperti kedelai) untuk memutus siklus hidup patogen.\"]', '2024-12-07 15:09:27'),
(5, '1733584226550.jpg', 'blight', 'blight', 0.82, '[\"1. Gunakan benih unggul: Pilih varietas jagung tahan terhadap blight (Pioneer P27, BIMA 20 URI).\",\"2. Fungisida: Semprotkan fungisida sistemik seperti mankozeb, flutriafol, atau propikonazol saat gejala awal muncul.\",\"3. Tanam tepat waktu: Hindari menanam jagung terlalu awal di musim hujan, karena kondisi lembap mendukung infeksi.\",\"4. Pengelolaan sisa tanaman: Hancurkan sisa tanaman yang terinfeksi agar tidak menjadi sumber inokulum.\",\"5. Rotasi tanaman: Tanam tanaman selain jagung (seperti kedelai) untuk memutus siklus hidup patogen.\"]', '2024-12-07 15:10:28'),
(6, '1733585391813.jpeg', 'gray spot', 'gray spot', 0.71, '[\"1. Varietas tahan penyakit: Tanam varietas jagung yang memiliki ketahanan terhadap gray leaf spot (BISI-2, NK7328).\",\"2. Pemangkasan daun yang terinfeksi: Segera buang daun yang menunjukkan gejala untuk mencegah penyebaran.\",\"3. Fungisida preventif: Gunakan fungisida berbasis azoksistrobin atau propikonazol saat kondisi mendukung infeksi (kelembapan tinggi dan suhu hangat).\",\"4. Hindari irigasi atas yang menyebabkan daun basah.\",\"5. Lakukan pengelolaan sisa tanaman dengan membajak atau membakar sisa tanaman yang terinfeksi.\"]', '2024-12-07 15:30:06'),
(7, '1733617547841.jpg', 'gray spot', 'gray spot', 0.52, '[\"1. Varietas tahan penyakit: Tanam varietas jagung yang memiliki ketahanan terhadap gray leaf spot (BISI-2, NK7328).\",\"2. Pemangkasan daun yang terinfeksi: Segera buang daun yang menunjukkan gejala untuk mencegah penyebaran.\",\"3. Fungisida preventif: Gunakan fungisida berbasis azoksistrobin atau propikonazol saat kondisi mendukung infeksi (kelembapan tinggi dan suhu hangat).\",\"4. Hindari irigasi atas yang menyebabkan daun basah.\",\"5. Lakukan pengelolaan sisa tanaman dengan membajak atau membakar sisa tanaman yang terinfeksi.\"]', '2024-12-08 00:26:03'),
(8, '1733617743566.jpg', 'blight', 'blight', 0.68, '[\"1. Gunakan benih unggul: Pilih varietas jagung tahan terhadap blight (Pioneer P27, BIMA 20 URI).\",\"2. Fungisida: Semprotkan fungisida sistemik seperti mankozeb, flutriafol, atau propikonazol saat gejala awal muncul.\",\"3. Tanam tepat waktu: Hindari menanam jagung terlalu awal di musim hujan, karena kondisi lembap mendukung infeksi.\",\"4. Pengelolaan sisa tanaman: Hancurkan sisa tanaman yang terinfeksi agar tidak menjadi sumber inokulum.\",\"5. Rotasi tanaman: Tanam tanaman selain jagung (seperti kedelai) untuk memutus siklus hidup patogen.\"]', '2024-12-08 00:29:18'),
(9, '1733617876648.jpg', 'blight', 'blight', 0.72, '[\"1. Gunakan benih unggul: Pilih varietas jagung tahan terhadap blight (Pioneer P27, BIMA 20 URI).\",\"2. Fungisida: Semprotkan fungisida sistemik seperti mankozeb, flutriafol, atau propikonazol saat gejala awal muncul.\",\"3. Tanam tepat waktu: Hindari menanam jagung terlalu awal di musim hujan, karena kondisi lembap mendukung infeksi.\",\"4. Pengelolaan sisa tanaman: Hancurkan sisa tanaman yang terinfeksi agar tidak menjadi sumber inokulum.\",\"5. Rotasi tanaman: Tanam tanaman selain jagung (seperti kedelai) untuk memutus siklus hidup patogen.\"]', '2024-12-08 00:31:31'),
(10, '1733618027944.jpg', 'gray spot', 'gray spot', 0.38, '[\"1. Varietas tahan penyakit: Tanam varietas jagung yang memiliki ketahanan terhadap gray leaf spot (BISI-2, NK7328).\",\"2. Pemangkasan daun yang terinfeksi: Segera buang daun yang menunjukkan gejala untuk mencegah penyebaran.\",\"3. Fungisida preventif: Gunakan fungisida berbasis azoksistrobin atau propikonazol saat kondisi mendukung infeksi (kelembapan tinggi dan suhu hangat).\",\"4. Hindari irigasi atas yang menyebabkan daun basah.\",\"5. Lakukan pengelolaan sisa tanaman dengan membajak atau membakar sisa tanaman yang terinfeksi.\"]', '2024-12-08 00:34:03'),
(11, '1733662619189.jpg', 'blight', 'blight', 0.72, '[\"1. Gunakan benih unggul: Pilih varietas jagung tahan terhadap blight (Pioneer P27, BIMA 20 URI).\",\"2. Fungisida: Semprotkan fungisida sistemik seperti mankozeb, flutriafol, atau propikonazol saat gejala awal muncul.\",\"3. Tanam tepat waktu: Hindari menanam jagung terlalu awal di musim hujan, karena kondisi lembap mendukung infeksi.\",\"4. Pengelolaan sisa tanaman: Hancurkan sisa tanaman yang terinfeksi agar tidak menjadi sumber inokulum.\",\"5. Rotasi tanaman: Tanam tanaman selain jagung (seperti kedelai) untuk memutus siklus hidup patogen.\"]', '2024-12-08 12:58:23'),
(12, '1733662898693.jpg', 'blight', 'blight', 0.68, '[\"1. Gunakan benih unggul: Pilih varietas jagung tahan terhadap blight (Pioneer P27, BIMA 20 URI).\",\"2. Fungisida: Semprotkan fungisida sistemik seperti mankozeb, flutriafol, atau propikonazol saat gejala awal muncul.\",\"3. Tanam tepat waktu: Hindari menanam jagung terlalu awal di musim hujan, karena kondisi lembap mendukung infeksi.\",\"4. Pengelolaan sisa tanaman: Hancurkan sisa tanaman yang terinfeksi agar tidak menjadi sumber inokulum.\",\"5. Rotasi tanaman: Tanam tanaman selain jagung (seperti kedelai) untuk memutus siklus hidup patogen.\"]', '2024-12-08 13:01:54'),
(13, '1733805552501.jpg', 'gray spot', 'gray spot', 0.38, '[\"1. Varietas tahan penyakit: Tanam varietas jagung yang memiliki ketahanan terhadap gray leaf spot (BISI-2, NK7328).\",\"2. Pemangkasan daun yang terinfeksi: Segera buang daun yang menunjukkan gejala untuk mencegah penyebaran.\",\"3. Fungisida preventif: Gunakan fungisida berbasis azoksistrobin atau propikonazol saat kondisi mendukung infeksi (kelembapan tinggi dan suhu hangat).\",\"4. Hindari irigasi atas yang menyebabkan daun basah.\",\"5. Lakukan pengelolaan sisa tanaman dengan membajak atau membakar sisa tanaman yang terinfeksi.\"]', '2024-12-10 04:39:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `rooms`
--

CREATE TABLE `rooms` (
  `room_id` int(11) NOT NULL,
  `room_name` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `rooms`
--

INSERT INTO `rooms` (`room_id`, `room_name`, `created_by`) VALUES
(1, 'umum', 9);

-- --------------------------------------------------------

--
-- Struktur dari tabel `room_members`
--

CREATE TABLE `room_members` (
  `room_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `joined_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `photo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `city`, `province`, `country`, `age`, `role`, `created_at`, `photo`) VALUES
(1, 'Admin', 'Smartcon', 'admin1@gmail.com', '7488e331b8b64e5794da3fa4eb10ad5d', 'Jakarta', 'DKI Jakarta', 'Indonesia', 30, 'admin', '2024-11-23 14:10:35', NULL),
(4, 'lukman', 'bopupa', 'bopupalukman@gmail.com', '$2b$10$udQNFELlBQOvVi4TG7ZEUecdP2Eah67hW1RWqU/Q0pUQ.es6kvU82', 'gresik', 'jatim', 'indo', 20, 'admin', '2024-11-24 03:42:32', '/uploads/profiles/1733989832210-me.jpg'),
(11, 'lukman', 'ganteng', 'lukmanganteng@gmail.com', '$2b$10$Mcd4cwIs/wMnhzSAueFSYev8rx.389fWd2EJIsrh0OdLh/Ik2hymO', 'gresik', 'jteam', 'ind', 20, 'user', '2024-12-07 12:48:25', '/uploads/profiles/1733989426324-me3.jpg');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indeks untuk tabel `disease_logs`
--
ALTER TABLE `disease_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `forums`
--
ALTER TABLE `forums`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `fk_sender` (`sender_id`);

--
-- Indeks untuk tabel `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indeks untuk tabel `room_members`
--
ALTER TABLE `room_members`
  ADD PRIMARY KEY (`room_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `disease_logs`
--
ALTER TABLE `disease_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `forums`
--
ALTER TABLE `forums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT untuk tabel `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `forums` (`id`);

--
-- Ketidakleluasaan untuk tabel `disease_logs`
--
ALTER TABLE `disease_logs`
  ADD CONSTRAINT `disease_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`);

--
-- Ketidakleluasaan untuk tabel `room_members`
--
ALTER TABLE `room_members`
  ADD CONSTRAINT `room_members_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  ADD CONSTRAINT `room_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
