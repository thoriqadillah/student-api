# Tentang Student-API

Ini adalah sebuah API dari database universitas khayalan pada salah satu program studinya demi membantu saya lebih jauh memahami tentang bagaiamana menggunakan Express.js dan MongoDB dalam membuat suatu API

Collection yang ada pada database ini adalah :
* <code>Courses</code>
* <code>StudentCourse</code>
* <code>Scores</code>
* <code>Semesters</code>
* <code>Students</code>
* <code>Teachers</code>
  
Berikut diagram untuk menggambarkan relasi antar document :

![Data Model](/data_model/data_model.png)
<p>&nbsp</p>

# Kenapa Saya Mendesain Databasenya Seperti Ini?
MongoDB merupakan DBMS yang sifatnya fleksibel, tidak seperti DBMS SQL pada umumnya yang mempunyai aturan baku. Pada NoSQL model data akan sangat berpengaruh dengan optimalitas dan performa databasenya. Maka saya akan mencoba menjelaskan kenapa saya mendesain database tersebut seperti pada gambar diatas.

Many-to-many pada NoSQL merupakan hal yang cukup sulit bagi saya. Saya berpikir, mungkin jika saya menggunakan aturan many-to-many pada SQL, yaitu membuat 3 tabel/collection, dimana tabel/collection ke 3 digunakan untuk merelasikan keduanya, maka apa gunanya saya mempelajari NoSQL jika akhirnya saya kembali pada aturan SQL, meskipun itu diperbolehkan. Awalnya saya juga bingung bagaimana mendesain tampilan json yang nantinya akan ditampilkan, padahal seharusnya yang terpenting adalah query dari database tersebut sehingga menghasilkan performa yang diinginkan. 

Jalan pikir saya, daripada membuat tabel ke 3 seperti aturan SQL pada umumnya, dan karena NoSQL ini bersifat fleksibel, saya berpikir kenapa tidak langsung membuat tabel ke 3 tersebut tanpa membuat 3 tabel. Jalan pikiran inilah yang menjelaskan mengapa antara collection <code>Student</code> dan <code>Semester</code> memiliki hubungan one-to-many. Meskipun jatuhnya akan membuat document pada collection <code>Semester</code> berjumlah n x m, dimana n adalah <code>Student</code>, m adalah <code>Semester</code>, tapi menurut saya itu tidak mengapa karena pada SQL pun pada tabel ke 3 juga menerapkan seperti itu. Yang lebih penting lagi, payload yang dikembalikan ketika fetch data dari collection tidak banyak dikarenakan cara ini. Jika saya menggunakan relasi many-to-many dengan merelasikan banyak <code>Student</code> dengan document pada semester 1, yang mana satu program studi dapat mempunyai ratusan bahkan ribuan mahasiswa, maka ini akan berakibat pada penurunan performa dalam query data. Ini juga berlaku pada relasi antara <code>StudentCourse</code> dan <code>Semester</code>, dimana pada 1 semester pasti mempunyai banyak mata kuliah dan 1 mata kuliah bisa berada pada banyak semester (mata kuliah semester ganjil dan genap) (berlaku juga pada relasi <code>Teacher</code> dengan <code>StudentCourse</code>).

Pada relasi <code>Score</code> dengan <code>Student</code> dan <code>Score</code> dengan <code>StudentCourse</code> sudah benar menggunakan one-to-many dikarenakan suatu nilai pasti spesifik dimiliki oleh satu orang mahasiswa dan juga mata kuliahnya. Ini masuk akal, karena meskipun mungkin terdapat nilai yang sama antara mahasiswa sehingga dapat direlasikan menggunakan many-to-many, ini bukan merupakan desain yang baik karena jika ada nilai yang ingin dirubah dan kebetulan nilai yang sama tersebut yang ingin dirubah, maka ini sama saja kerja tambahan.

Kenapa terdapat 2 collection yang hampir sama, yaitu <code>Course</code> dan <code>StudentCourse</code>?. <code>Course</code> berguna sebagai daftar mata kuliah jika mahasiswa ingin memrogram rencana studinya. Bayangkan jika ini tidak dilakukan, maka kita harus hard-code nama mata kuliah, jumlah sks, dll. Ini juga berguna sebagai relasi many-to-many pada collection <code>Teacher</code> sebagai pilihan siapa saja dosen yang tersedia dalam mengajarkan mata kuliah tersebut. Collection <code>StudentCourse</code> berguna sebagai semacam tabel ke 3. Untuk menambah mata kuliah, pertama - tama pilih mata kuliah dari list yang ada pada collection <code>Course</code>. Setelah dipilih, kita duplikasi datanya pada <code>StudentCourse</code> pada saat penambahan documentnya
<p>&nbsp</p>

# Dokumentasi
## Penambahan Data
Penambahan data dapat dilakukan menggunakan method <code>POST</code> pada URI :

<pre><code>http://localhost/namaCollection</code></pre>

Contoh : <code>http://localhost/students</code>


## Pencarian Data
Pencarian data dapat dilakukan menggunakan method <code>GET</code> pada URI :

<pre><code>http://localhost/namaCollection/search?req.query</code></pre>

Contoh : <code>http://localhost/students/search?_id=q8ownfw98y</code>


## Pengeditan Data
Pengeditan data dapat dilakukan menggunakan method <code>PATCH</code> pada URI :

<pre><code>http://localhost/namaCollection/:id_namaCollection</code></pre>

Contoh : <code>http://localhost/students/0q7e87q97e</code>


## Penghapusan Data
Untuk penghapusan satu document dapat dilakukan menggunakan method <code>DELETE</code> pada URI :

<pre><code>http://localhost/namaCollection/:id_namaCollection</code></pre>

Contoh : <code>http://localhost/students/0q7e87q97e</code>

Sedangkan untuk penghapusan seluruh document dapat dilakukan pada URI

<pre><code>http://localhost/namaCollection</code></pre>

Contoh : <code>http://localhost/students</code>


## Merelasikan Document
Untuk merelasikan suatu document dengan document yang lain dapat dilakukan menggunakan method <code>PATCH</code> pada URI :

<pre><code>http://localhost/namaCollection_asal/assign/namaCollection_tujuan/:id_namaCollection_asal?req.query_namaCollection_tujuan</code></pre>

Contoh : <code>http://localhost/semesters/assign/student/s8ha9dsh?nim=195150400111034</code>


## Menghapus Relasi Document
Untuk menghapus relasi suatu document dengan document yang lain dapat dilakukan menggunakan method <code>PATCH</code> pada URI :

<pre><code>http://localhost/namaCollection_asal/unassign/namaCollection_tujuan/:id_namaCollection_asal?req.query_namaCollection_tujuan</code></pre>

Contoh : <code>http://localhost/semesters/unassign/student/s8ha9dsh?nim=195150400111034</code>
<p>&nbsp</p>

# Bagaiamana API Ini Digunakan?
Untuk memudahkan penggunaan, direkomendasikan dengan cara menambahkan data pada collection <code>Course</code> tanpa harus merelasikannya pada document yang lain pada menggunakan method <code>POST</code> untuk initial datanya pada URI :

<pre><code>http://localhost/course</code></pre>

Setelah terisi, selanjutnya kita isi data pada document dosen dan student karena universitas juga butuh mahasiswa untuk diajar, dan dosen sebagai tenaga pengajar. Pengisian data bisa dilakukan menggunakan method <code>POST</code> melalui URI :

<pre><code>http://localhost/students</code></pre>

## Cara Mahasiswa Untuk Memrogram Rencana Studinya Selama Satu Semester Kedepan
Pertama, menambahkan semester untuk mahasiswa. Penambahan semester bisa dilakukan dengan menggunakan method <code>POST</code> pada URI :

<pre><code>http://localhost/semesters</code></pre>


Kemudian relasikan semester tersebut dengan mahasiswa yang ingin memrogram rencana studinya pada semester tersebut dengan menggunakan method <code>PATCH</code> pada URI :

<pre><code>http://localhost/semesters/assign/student/:id_semester?req.query_student</code></pre>

dan masukkan query menggunakan <code>_id</code> dari student yang dituju.

Setelah itu buat program untuk memilih course dari data course, yang nantinya akan ditambahkan ke Collection <code>StudentCourse</code>sebagai document dengan menggunakan method <code>POST</code> pada URI :

<pre><code>http://localhost/studentCourses</code></pre>

Setelah itu, bisa menambahkan course yang dipilih pada semester yang telah direlasikan dengan student tadi dengan mengguanakan method <code>PATCH</code> pada URI :
<pre><code>http://localhost/studentCourses/assign/semester/:id_studentCourse?req.params_semester</code></pre>

<pre><code>http://localhost/studentCourses/assign/student/:id_studentCourse?req.params_student</code></pre>

dan masukkan query menggunakan <code>_id</code> dari course dan semester yang dituju. 

## Cara menugaskan dosen ke suatu mata kuliah 
Pada kasus ini, kita merelasikan dosen dengan document statis pada collection Courses. Tujuannya adalah sebagai pilihan untuk ditampilkan dosen siapa saja yang bertugas pada suatu mata kuliah. Sehingga kita bisa menugaskan dosen pada suatu mata kuliah dengan cara merelasikannya menggunakan method <code>PATCH</code> pada URI :

<pre><code>http://localhost/teachers/assign/course/:id_teacher?req.params_course</code></pre>

<pre><code>http://localhost/courses/assign/teacher/:id_course?req.params_teacher</code></pre>

dan masukkan query menggunakan id dari course dan semester yang dituju. 

## Cara menugaskan dosen untuk mengajar mata kuliah untuk seorang mahasiswa
Setelah penugasan selesai, maka kita perlu mengarahkan/menugaskan dosen untuk mengajar mata kuliah pada seorang mahasiswa. Untuk menugaskannya, relasikan <code>StudentCourse</code> dengan dosen dengan method PATCH pada URI :

<pre><code>http://localhost/studentCourses/assign/teacher/:id_studentCourse?req.params_teacher</code></pre>

dan masukkan query menggunakan id dari teacher yang dituju.

## Cara dosen memberi nilai kepada mahasiswa pada suatu mata kuliah
Pertama, tambahkan data pada Collection <code>Score</code>. Score pada sebuah course bisa lebih dari satu. Maka silahkan tambahkan document seperlunya untuk sebuah course. Penambahan data bisa dilakukan menggunakan method <code>POST</code> pada URI :

<pre><code>http://localhost/scores</code></pre>

Kemudian relasikan score pada document <code>StudentCourse</code> dengan menggunakan method <code>PATCH</code> pada URI :

<pre><code>http://localhost/scores/assign/course/:id_score?req.params_studentCourse</code></pre>

dan masukkan query menggunakan id dari score yang dituju.

Selanjutnya, relasikan juga siapa dosen yang memberi nilai tersebut dengan menggunakan method <code>PATCH</code> pada URI : 

<pre><code>http://localhost/scores/assign/teacher/:id_score?req.params_teacher</code></pre>

dan masukkan query menggunakan id dari score yang dituju.

Terakhir, relasikan kepada mahasiswa yang bersangkutan menggunakan method <code>PATCH</code> pada URI :

<pre><code>http://localhost/scores/assign/student/:id_score?req.params_student</code></pre>

dan masukkan query menggunakan id dari score yang dituju.

