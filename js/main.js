let usuario = { nome: '', email: '', senha: '', telefone: '', cep: '', status: '', id: '', saldo: '' }
let entradas = [];

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



function cadEntradas() {
    getUser();
    let saldoUser = 0;
    usuario.saldo != null ? saldoUser += parseInt(usuario.saldo) : null;
    const { value: formValues } = Swal.fire({
        title: '<h2 style="color: white;">Lançar entrada</h2>',
        confirmButtonColor: "black",
        background: "black",
        html:
            '<input id="entrada" style="color: white" class="swal2-input">' +
            '<input id="descricao" style="color: white" placeholder="Descrição" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            let entrada = document.getElementById('entrada').value;
            if (entrada == "" || entrada == null) {
                alert('Sua entrada não pode ser vazia!');
            } else if (/\D/.test(entrada)) {
                alert('Sua entrada não pode conter letras!')
            } else if (document.getElementById('descricao').value == '') {
                alert('Não deixe a descrição vazia')
            }
            else {
                setEntrada(entrada, usuario.id, document.getElementById('descricao').value);
                saldoUser += parseInt(entrada);
                usuario.saldo = saldoUser;
                localStorage.setItem('Usuario', JSON.stringify(usuario));
                document.getElementById('Entradas').innerHTML = entradas.length;
                document.getElementById('viewEntradas').hidden = false;
                alert('Entrada registrada com sucesso!')
                getSaldo();
            }
        }
    })
}

function setEntrada(entrada, userId, descricaoEntrada) {
    let data = new Date();
    getEntradas();
    entradas.push({
        id: Date.now(),
        userId: userId,
        descricao: descricaoEntrada,
        valor: entrada,
        data: data.getDate(),
        hora: data.getHours()
    });
    localStorage.setItem('Entradas', JSON.stringify(entradas));
}




function getUser() {
    usuario = JSON.parse(localStorage.getItem('Usuario'));
}

function getSaldo() {
    getUser();
    const campoSaldo = document.getElementById('Saldo');
    usuario.saldo == null ? campoSaldo.innerHTML = '0' : campoSaldo.innerHTML = usuario.saldo;
}

function getEntradas() {
    getUser();
    entradas = JSON.parse(localStorage.getItem('Entradas'));
    if (entradas != null) {
        entradas.filter(value => value.userId == usuario.id);
    } else {
        entradas = [];
    }
}


function viewEntradas() {
    getEntradas();
    entradas.forEach((entrada) => {
        document.getElementById('lista').innerHTML += "<div class=col-sm-3>" +
            "<div class='well'>" +
            "<div class='card-header' style='font-size: 40px; background-color: indigo; color: white;'>" + entrada.descricao + "</div>" +
            "<div class='card-body' style='text-align: justify; font-size: 20px;'><label>Descrição: " + entrada.valor + "</label>" +
            "</div>"
    });

}

function listEntradas(){
    getEntradas();
    document.getElementById('Entradas').innerHTML = entradas.length;
    document.getElementById('viewEntradas').hidden = false;
}