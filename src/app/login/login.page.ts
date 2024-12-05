import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = ''; // Gunakan tipe string
  password: string = ''; // Gunakan tipe string

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    // Bisa menambahkan logika inisialisasi jika diperlukan
    console.log('Login component initialized');
  }

  login() {
    // Cek apakah username dan password sudah diisi
    if (this.username && this.password) {
      const data = {
        username: this.username,
        password: this.password,
      };

      // Panggil service untuk login
      this.authService.postMethod(data, 'login.php').subscribe({
        next: (res) => {
          if (res.status_login === 'berhasil') {
            this.authService.saveData(res.token, res.username);
            this.username = ''; // Reset form
            this.password = ''; // Reset form
            this.router.navigateByUrl('/mahasiswa');
          } else {
            this.authService.notifikasi('Username atau Password Salah');
          }
        },
        error: (error) => {
          if (error.status === 0) {
            this.authService.notifikasi('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
          } else {
            this.authService.notifikasi(`Error: ${error.message}`);
          }
        },
      });
    } else {
      this.authService.notifikasi('Username atau Password Tidak Boleh Kosong');
    }
  }
}
