let usuario = { nome: '', email: '', senha: '', telefone: '', cep: '', status: '', id: '' }

function validarCadastro(nome, email, senha, telefone, cep) {
    if (nome == '' || email == '' || senha == '' || telefone == '' || cep == '') {

        alert("Campos vazios!");
    } else {

        _cadastrar(nome, email, senha, telefone, cep);
    }
}

function _cadastrar(nome, email, senha, telefone, cep) {

    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha;
    usuario.telefone = telefone;
    usuario.cep = cep;
    usuario.status = status;
    usuario.id = Date.now();

    localStorage.setItem('Usuarios', JSON.stringify(usuario));
    alert('Cadastrado com sucesso!');
    window.location = 'login.html';
}


function validarLogin(email, senha) {
    getUser();
    if (email == '' || senha == '') {
        alert("Campos vazios!");
    } else if (usuario == null) {
        alert('Usuário inexistente');
    } else if (usuario.email == email && usuario.senha == senha) {
        alert('Logado!')
        window.location = 'dashboard.html';
    } else {
        alert('Tá errado em');
    }
}


function editarUsuario() {
    getUser();
    const { value: formValues } = Swal.fire({
        title: '<h2 style="color: white;">Editar usuário</h2>',
        confirmButtonColor: "black",
        background: "black",
        html:
            '<input id="nome"  value=' + usuario.nome + '  style="color: white" class="swal2-input">' +
            '<input id="telefone" value=' + usuario.telefone + '  style="color: white"  class="swal2-input">' +
            '<input id="cep" value=' + usuario.cep + ' style="color: white"  class="swal2-input">' +
            '<input id="email" value=' + usuario.email + ' style="color: white"  type="email" class="swal2-input">' +
            '<input id="senha" type="password" value=' + usuario.senha + ' style="color: white" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            usuario.nome = document.getElementById('nome').value;
            usuario.telefone = document.getElementById('telefone').value;
            usuario.cep = document.getElementById('cep').value;
            usuario.email = document.getElementById('email').value;
            usuario.senha = document.getElementById('senha').value;
            if (usuario.nome == '' || usuario.telefone == '' || usuario.cep == '' || usuario.email == '') {
                alert('Não deixe um campo vazio :)');
            } else {
                localStorage.setItem('Usuario', JSON.stringify(usuario));

            }
        }
    })

}


function getUser() {
    usuario = JSON.parse(localStorage.getItem('Usuario'));
}