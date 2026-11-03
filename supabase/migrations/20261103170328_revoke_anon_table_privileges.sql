/*
# Cabut akses tabel untuk pengguna anonim

1. Perubahan
- Peran anonim (pengunjung yang belum masuk) tidak lagi memiliki hak akses ke tabel profiles, materi_progress, quiz_attempts, dan simulation_history.

2. Keamanan
- Hanya pengguna yang sudah masuk yang dapat mengakses data, dan tetap hanya data miliknya sendiri karena kebijakan RLS.

3. Catatan
- Tidak ada data yang diubah atau dihapus.
- Aman dijalankan ulang.
*/

REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.materi_progress FROM anon;
REVOKE ALL ON public.quiz_attempts FROM anon;
REVOKE ALL ON public.simulation_history FROM anon;
