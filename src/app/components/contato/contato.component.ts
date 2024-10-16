import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formData = {
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  enviarEmail() {
    const corpoMensagem = 
    `Mensagem do site:\n${this.formData.mensagem}\n\n` +
    `Nome: ${this.formData.nome}\n` +
    `Email: ${this.formData.email}\n` +
    `Telefone: ${this.formData.telefone}`;

    this.http.post('http://localhost:3000/send-email', {mensagem: corpoMensagem, nome: this.formData.nome}, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Resposta:', response);
          alert('Email enviado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao enviar email:', error);
          alert('Erro ao enviar email.');
        }
      });
  }
  

}
