function goTo(page) {
  window.location = page;
}

async function Register(name, email, phone, cep, password) {
  if (
    name == "" ||
    name == null ||
    email == "" ||
    email == null ||
    phone == "" ||
    phone == null ||
    cep == "" ||
    cep == null ||
    password == "" ||
    password == null
  ) {
    alert("Campos Vazios!");
  } else {
    if (cep < 8) {
      alert('Cep inválido')
    }
    else if (cep.includes('-')) {
      alert('Por favor tire o tracinho do cep :)');
    } else {
      const adress = await getAdress(cep);
      let data = RegisterToJson(name, email, phone, adress, password);
      localStorage.setItem("User", data);
      alert("Cadastro efetuado com sucesso!");
    }
  }
}
function getAdress(cep) {
  const request = new Request(`http://viacep.com.br/ws/${cep}/json/`);
  try {
    const teste = fetch(request)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .then((json) => {
        return json;
      });
    return teste;
  } catch (e) {
    alert(e);
  }
}
function Login(email, password) {
  if (email == "" || email == null || password == "" || password == null) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Campos Vazios!",
      timer: 1500,
    });
  } else {
    let user = getUser();
    if (user.email == email && user.password == password) {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Login efetuado!",
        timer: 1500,
      });
      setTimeout(() => {
        goTo("dashboard.html");
      }, 1500);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email ou senha incorretos!",
        timer: 1500,
      });
    }
  }
}

function RegisterToJson(name, email, phone, adress, password) {
  const data = {
    id: Date.now(),
    name: name,
    email: email,
    phone: phone,
    street: adress["logradouro"],
    neighborhood: adress["bairro"],
    uf: adress["uf"],
    password: password,
    status: "active",
    categories: null,
    entries: null,
    balance: 0,
  };
  return JSON.stringify(data);
}

function editUser() {
  let user = getUser();
  const { value: formValues } = Swal.fire({
    title:
      '<h2 style="color: black; font-family: Toma Sans;">Editar informações</h2>',
    html:
      "<label style='font-family: Toma Sans; font-weight: bold;'> Nome </label>" +
      `<input id="name" style="color: black; font-family: Toma Sans;" type="text"   value='${user.name}' 
       style="color: white" class="swal2-input">` +
      "<label style='font-family: Toma Sans; font-weight: bold;'> Email </label>" +
      `<input id="email" style="color: black; font-family: Toma Sans;" type="email"  value='${user.email}' 
       style="color: white"  class="swal2-input">` +
      "<label style='font-family: Toma Sans; font-weight: bold;'> Telefone </label>" +
      `<input id="phone" style="color: black; font-family: Toma Sans;" type="text"  value='${user.phone}' 
       style="color: white"  class="swal2-input">` +
      "<label style='font-family: Toma Sans; font-weight: bold;'> Estado </label>" +
      `<input id="uf" style="color: black; font-family: Toma Sans;" type="text"  value='${user.uf}' 
      style="color: white"  class="swal2-input">` +
      "<label style='font-family: Toma Sans; font-weight: bold;'> Bairro </label>" +
      `<input id="neighborhood" style="color: black; font-family: Toma Sans;" type="text"  value='${user.neighborhood}' 
      style="color: white"  class="swal2-input">` +
      "<label style='font-family: Toma Sans; font-weight: bold;'> Rua </label>" +
      `<input id="street" style="color: black; font-family: Toma Sans;" type="text"  value='${user.street}' 
      style="color: white"  type="email" class="swal2-input">` +
      "<label style='font-family: Toma Sans; font-weight: bold;'> Senha </label>" +
      `<input id="password" style="color: black;" type="password" value='${user.password}' 
      style="color: white" class="swal2-input">`,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      user.name = document.getElementById("name").value;
      user.email = document.getElementById("email").value;
      user.phone = document.getElementById("phone").value;
      user.uf = document.getElementById("uf").value;
      user.neighborhood = document.getElementById("neighborhood").value;
      user.street = document.getElementById("street").value;
      user.password = document.getElementById("password").value;
      localStorage.setItem("User", JSON.stringify(user));
      if (
        user.name == "" ||
        user.phone == "" ||
        user.uf == "" ||
        user.neighborhood == "" ||
        user.street == "" ||
        user.email == "" ||
        user.password == ""
      ) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Campos Vazios!",
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Alteração efetuada com sucesso!",
          timer: 1500,
        });
      }
    },
  });
}

function registerCategory() {
  let user = getUser();
  let categories = [];
  Swal.fire({
    title:
      '<h2 style="color: black; font-family: Toma Sans;">Cadastre uma categoria</h2>',
    html:
      '<input id="categorie" type="text" style="color: black; font-family: Toma Sans;" placeholder="Categoria" style="color: white" class="swal2-input">',
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      if (
        document.getElementById("categorie").value == "" ||
        document.getElementById("categorie").value == null
      ) {
        Swal.fire({
          icon: "warning",
          title: "Oops ...!",
          text: "Campos Vazios!",
          timer: 1500,
        });
      } else {
        categories = user.categories == null ? [] : user.categories;
        categories.push(document.getElementById("categorie").value);
        user.categories = categories;
        localStorage.setItem("User", JSON.stringify(user));
        Swal.fire({
          icon: "success",
          title: "Categoria salva!",
          timer: 1500,
        });
      }
    },
  });
}

function registerEntry() {
  getCategories(true);
}

function setEntry(user, indexCategorie, categories) {
  let entries = [];
  Swal.fire({
    title: '<h2 style="color: black;">Valor da entrada</h2>',
    html:
      '<input id="entry" type="number" style="color: black; font-family: Toma Sans;"  placeholder="Entrada"  style="color: white" class="swal2-input">',
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      if (
        document.getElementById("entry").value == "" ||
        document.getElementById("entry").value == null
      ) {
        Swal.fire({
          icon: "warning",
          title: "Oops...!",
          text: "Campos Vazios!",
          timer: 1500,
        });
      } else if (/\D/.test(document.getElementById("entry").value)) {
        alert("Não coloque números no valor!");
      } else {
        entries = user.entries == null ? [] : user.entries;
        entries.push({
          id: Date.now(),
          category: categories[indexCategorie],
          date: getDateNow(),
          value: document.getElementById("entry").value,
        });
        user.entries = entries;
        updateBalance(user, true);
        Swal.fire({
          icon: "success",
          title: "Entrada efetuada com sucesso!",
          timer: 1500,
        });
      }
    },
  });
}

function getCategories(isEntry) {
  let user = getUser();
  if (user.categories == null) {
    Swal.fire({
      icon: "error",
      title: "Crie uma categoria!",
      timer: 1500,
    });
    registerCategory();
  } else {
    let categories = categoriesToJson(user.categories);
    Swal.fire({
      title: "Categorias",
      input: "select",
      inputOptions: categories,
      inputPlaceholder: "Categorias",
      showCancelButton: true,
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value !== "") {
            resolve();
          } else {
            resolve("Você precisa selecionar uma categoria!");
          }
        });
      },
    }).then(function (result) {
      if (result.value) {
        isEntry
          ? setEntry(user, result.value, user.categories)
          : setExit(user, result.value, user.categories);
      }
    });
  }
}

function registerExit() {
  getCategories(false);
}

function setExit(user, indexCategorie, categories) {
  let exits = [];
  Swal.fire({
    title: '<h2 style="color: black;">Valor da saída</h2>',
    html:
      '<input id="exit" type="number" style="color: black; font-family: Toma Sans;"  placeholder="Saída"  style="color: white" class="swal2-input">',
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      if (
        document.getElementById("exit").value == "" ||
        document.getElementById("exit").value == null
      ) {
        Swal.fire({
          icon: "warning",
          title: "Oops...!",
          text: "Campos Vazios!",
          timer: 1500,
        });
      } else if (/\D/.test(document.getElementById("exit").value)) {
        alert("Não coloque números no valor!");
      } else {
        exits = user.exits == null ? [] : user.exits;
        exits.push({
          id: Date.now(),
          category: categories[indexCategorie],
          date: getDateNow(),
          value: document.getElementById("exit").value,
        });
        user.exits = exits;
        updateBalance(user, false);
        Swal.fire({
          icon: "success",
          title: "Saída efetuada com sucesso!",
          timer: 1500,
        });
      }
    },
  });
}

function updateBalance(user, isEntry) {
  const userEntrie = user.entries;
  const userExits = user.exits;
  let totalEntrie = 0;
  let totalExits = 0;

  if (isEntry) {
    const userEntriesLength = userEntrie.length
    if (userEntriesLength == 1) totalEntrie = parseFloat(userEntrie[0].value);
    else totalEntrie = parseFloat(userEntrie[userEntriesLength != 1 ? userEntriesLength - 1 : 0].value);
    user.balance += totalEntrie;
  } else {
    const userExitsLength = userExits.length;
    if (userExitsLength == 1) totalExits = parseFloat(userExits[0].value);
    else totalExits = parseFloat(userExits[userExitsLength != 1 ? userExitsLength - 1 : 0].value);
    user.balance -= totalExits;
  }
  localStorage.setItem("User", JSON.stringify(user));
  getUserFinances();
}


function updateBalanceDelete(value, user) {
  if (user.balance < 0)
    user.balance += value;
  else
    user.balance -= value
  localStorage.setItem("User", JSON.stringify(user));
}

function getUserFinances() {
  let user = getUser();
  let entries = _totalExits(user.entries);
  let exits = _totalExits(user.exits);
  let balance = user.balance;
  document.getElementById("entriesQuant").innerHTML = entries == undefined ? 0 : entries;
  document.getElementById("balance").innerHTML = balance;
  balance < 0 ? document.getElementById("balance").style.color = '#ff0000' : '#00ff00';
  document.getElementById("exitsQuant").innerHTML = exits == undefined ? 0 : exits;

  chartMaker();
}

function getDateNow() {
  const date = new Date();
  const meses = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const ano = date.getFullYear();
  const dia = date.getDate();
  return dia + "/" + meses[date.getMonth()] + "/" + ano;
}

function viewEntries() {
  document.getElementById('entries').innerHTML = '';
  let date = new Date();
  let user = getUser();
  if (user.entries == null || user.entries.length == 0) {
    alert("Nenhuma entrada registrada");
    goTo("dashboard.html");
  } else {
    user.entries.forEach((entrie) => {
      document.getElementById("entries").innerHTML +=
        "<div class='card-body color1'>" +
        "<div class='float-left'>" +
        "<h3>" +
        "<span class='currency'>R$ </span>" +
        "<span class='count'>" +
        entrie.value +
        "</span>" +
        "</h3>" +
        "Categoria: " +
        entrie.category +
        "<br>" +
        "<label>" +
        "Data de adição: " +
        entrie.date +
        "</label>" +
        "</div>" +
        "<div class='float-right'>" +
        "<button type='button' class='btn btn-outline-danger' style='width: 60px; height: 50px;' onclick='deleteEntrie(" + entrie.id + ")'><img src='img/criss_cross.svg' alt='delete' style='width: 30px;'></i></button>" +
        "</div>" +
        "</div>"
    });
    entriesChart();
  }
}

function deleteEntrie(entrieId) {
  const user = getUser();
  const userEntries = user.entries;
  const valueToremove = userEntries.find((entrie) => {
    return entrie.id == entrieId;
  });
  updateBalanceDelete(parseFloat(valueToremove.value), user);
  userEntries.splice(userEntries.indexOf(valueToremove), 1);
  localStorage.setItem('User', JSON.stringify(user));
  viewEntries();
}

function viewExits() {
  document.getElementById('exits').innerHTML = '';
  let user = getUser();
  if (user.exits == null || user.exits.length == 0) {
    alert("Nenhuma saída registrada");
    goTo("dashboard.html");
  } else {
    user.exits.forEach((exit) => {
      document.getElementById("exits").innerHTML +=
        "<div class='card-body color3'>" +
        "<div class='float-left'>" +
        "<h3>" +
        "<span class='currency'>R$ </span>" +
        "<span class='count'>" +
        exit.value +
        "</span>" +
        "</h3>" +
        "<p>" +
        exit.category +
        "</p>" +
        "<label>" +
        "Data de adição: " +
        exit.date +
        "</label>" +
        "</div>" +
        "<div class='float-right'>" +
        "<button type='button' class='btn btn-outline-danger' style='width: 60px; height: 50px;'  onclick='deleteExit(" + exit.id + ")'><img src='img/criss_cross.svg' alt='delete' style='width: 30px;'></i></button>" +
        "</div>" +
        "</div>";
    });
    exitChart();
  }

}

function deleteExit(exitId) {
  const user = getUser();
  const userExits = user.exits;
  const valueToremove = userExits.find((exit, i) => {
    return exit.id == exitId;
  });
  updateBalanceDelete(parseFloat(valueToremove.value), user);
  userExits.splice(userExits.indexOf(valueToremove), 1);
  localStorage.setItem('User', JSON.stringify(user));
  viewExits();
}

function chartMaker() {
  const user = getUser();
  const entries = _totalEntries(user.entries);
  const exits = _totalExits(user.exits);
  const ctx = document.getElementById("mChart").getContext("2d");
  const comparissonChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Entrada", "Saldo", "Saída"],
      options: {
        responsive: true,
      },
      datasets: [
        {
          label: "Comparação de entradas e saídas",
          data: [entries, user.balance, exits],
          backgroundColor: [
            "rgba(0,194,146)",
            "rgba(3,169,243)",
            "rgba(251,113,70)",
          ],
        },
      ],
    },
  });
  return comparissonChart;
}

function exitChart() {
  const user = getUser();
  const userExits = user.exits
  const ctx = document.getElementById("mChart").getContext("2d");
  const labeArr = getExitsDescription(userExits);
  const values = getExitsValues(userExits);
  const colors = getExitsColors(userExits);
  const comparissonChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labeArr,
      options: {
        responsive: true,
      },
      datasets: [
        {
          label: "Comparação entre saídas",
          data: values,
          backgroundColor: colors,
        },
      ],
    },
  });
  return comparissonChart;
}

function getExitsDescription(exits) {
  const arr = [];
  exits.forEach((exit) => arr.push(exit.category + " " + exit.date));
  return arr;
}

function getExitsValues(exits) {
  const arr = [];
  exits.forEach((exit) => arr.push(parseFloat(exit.value)));
  return arr;
}

function getExitsColors(exits) {
  const arr = [];
  const red = "rgba(251,113,70)";
  exits.forEach((_) =>
    arr.push(red));
  return arr;
}


function entriesChart() {
  const user = getUser();
  const userEntries = user.entries
  const ctx = document.getElementById("mChart").getContext("2d");
  const labeArr = getEntriesDescription(userEntries);
  const values = getEntriesValues(userEntries);
  const colors = getEntriesColors(userEntries);
  const comparissonChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labeArr,
      options: {
        responsive: true,
      },
      datasets: [
        {
          label: "Comparação entre entradas",
          data: values,
          backgroundColor: colors,
        },
      ],
    },
  });
  return comparissonChart;
}

function getEntriesDescription(entries) {
  const arr = [];
  entries.forEach((entrie) => arr.push(entrie.category + " " + entrie.date));
  return arr;
}

function getEntriesValues(entries) {
  const arr = [];
  entries.forEach((entrie) => arr.push(parseFloat(entrie.value)));
  return arr;
}

function getEntriesColors(entries) {
  const arr = [];
  const green = "rgba(0,194,146)";
  entries.forEach((_) =>
    arr.push(green));
  return arr;
}



function _totalEntries(entries) {
  if (entries != null && entries.length != 0) {
    if (entries.length == 1) return entries[0].value;
    else
      return entries.reduce(
        (acc, cv) => parseFloat(cv.value) + parseFloat(acc.value == undefined ? acc : acc.value)
      );
  }
}

function _totalExits(exits) {
  if (exits != null && exits.length != 0) {
    if (exits.length == 1) return exits[0].value;
    else
      return exits.reduce(
        (acc, cv) => parseFloat(cv.value) + parseFloat(acc.value == undefined ? acc : acc.value)
      );
  }
}

function getUser() {
  return JSON.parse(localStorage.getItem("User"));
}

function categoriesToJson(categories) {
  return Object.assign({}, categories);
}
