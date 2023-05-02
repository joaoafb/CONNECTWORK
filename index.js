
    const firebaseConfig = {
        apiKey: "AIzaSyBKa-Bs_f_Jg80zzeRlMLzrTH_0oWP3Jdo",
        authDomain: "connectwork-c13b2.firebaseapp.com",
        projectId: "connectwork-c13b2",
        storageBucket: "connectwork-c13b2.appspot.com",
        messagingSenderId: "407759011685",
        appId: "1:407759011685:web:625201a9a6e0b35aba6b8c",
        measurementId: "G-TC7VG0QJVX"
      };
      
      firebase.initializeApp(firebaseConfig);
      
      const db = firebase.firestore();
      //puxar grupos
      function searchgroup(){
        const userId = localStorage.getItem("userId");
        if (userId !== "FZVQ8v67i7bYMQbecHFKUE2JaN23") {
          document.querySelector("#btncriargp").style.display = 'none'
          document.querySelector("#btncriartarefa").style.display = 'none'
        }

        document.querySelector("#myuser").innerText = 'Usuario: ' + localStorage.getItem("nome")
        //PUXARMSG
        firebase.database().ref("msg" + localStorage.getItem("nome")).on("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
              const doc = childSnapshot.val()
              

          });
        });
        
        //FIM
        const gplist = document.createElement('ul');
        gplist.id = 'gruposul'
        db.collection("grupos").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots

               

const user1 = document.createElement('li');
user1.href = '#modal1'
const user1Name = document.createTextNode(doc.data().nome);
const user1Img = document.createElement('img');
user1Img.setAttribute('src', doc.data().imagem);
user1.appendChild(user1Img);
user1.appendChild(user1Name);
user1Img.className = 'imagem'


gplist.appendChild(user1);
user1.onclick = function(){
   
    //modal
Swal.fire({
    title: 'Digite uma mensagem para o grupo "' + doc.data().nome + '"',
    html: '<input type="text" placeholder="Digite aqui a mensagem" id="meuInput">',
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    focusConfirm: false,
    preConfirm: () => {
      const meuInput = Swal.getPopup().querySelector('#meuInput').value;
      if (!meuInput) {
        Swal.showValidationMessage('Você precisa digitar alguma coisa!');
      }
      return meuInput;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Mensagem encaminhada:',
        text: result.value
      });
    }
  });}
  

document.getElementById('grupos').appendChild(gplist);

            });
        });


        firebase.database().ref("msg" + localStorage.getItem("nome")).on("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
              const doc = childSnapshot.val()
              console.log(doc)// seleciona o elemento pai onde a div será adicionada
              const parentElement = document.getElementById("msgs");
              
              // cria a div
              const divElement = document.createElement("div");
      
              divElement.className = 'grey lighten-3 message mtop10 z-depth-1 grey lighten-4 rounded'
              divElement.classList.add("collection-item", "avatar");
              
              // cria os elementos filho
              
              const nameElement = document.createElement("span");
        
              nameElement.className = "title flow-text bold "
              nameElement.innerText = doc.por

              
              const messageElement = document.createElement("p");
              messageElement.innerText = doc.msg;
              
              const timeElement = document.createElement("span");
              timeElement.classList.add("secondary-content");
              timeElement.innerText = doc.horario;
              
         
              divElement.appendChild(nameElement);
              divElement.appendChild(messageElement);
              divElement.appendChild(timeElement);
              
              // adiciona a div no elemento pai
              parentElement.appendChild(divElement);
              
parentElement.appendChild(divElement);

          });
      });
      
        //procourar usuarios
        const userList = document.createElement('ul');

        db.collection("usuarios").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots

             
const user1 = document.createElement('li');
const user1Name = document.createTextNode(doc.data().nome);
const user1Img = document.createElement('img');
user1Img.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png');
user1.appendChild(user1Img);
user1.appendChild(user1Name);
user1Img.className = 'imagem'


userList.appendChild(user1);

const lis = document.querySelectorAll('li');
lis.forEach(li => {
  if (li.textContent === localStorage.getItem("nome")) {
    li.style.display = 'none';
  }
});
    
user1.onclick = function(){
   //horario// Obtém a data e hora atual
const agora = new Date();

// Cria um objeto Timestamp do Firestore a partir da data e hora atual
const horario =agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});





    //modal
Swal.fire({
    title: 'Digite uma mensagem para: "' + doc.data().nome + '"',
    html: '<input type="text" id="msg" placeholder="Digite aqui a mensagem" >',
    showCancelButton: true,
    
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    focusConfirm: true,
    preConfirm: () => {
      const meuInput = Swal.getPopup().querySelector('#msg').value;
      if (!meuInput) {
        Swal.showValidationMessage('Você precisa digitar alguma coisa!');
      }
      return meuInput;
    }
  }).then((result) => {
   //enviar msg para o serv USUARIO
  
    
    
   if (result.isConfirmed) {
    // Ação a ser executada quando o usuário confirma
     firebase.database().ref("msg" + doc.data().nome).push({
    por: localStorage.getItem("nome"),
    horario: horario,
    msg: document.querySelector("#msg").value,
    para: doc.data().email,
    status: 'entregue',
  }, (error) => {
    if (error) {
      console.error("Error writing document: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao encaminhar a mensagem',
        text: result.value
      });
    } else {
     
    }
    
  });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    // Ação a ser executada quando o usuário cancela
    console.log('Ação cancelada');
  }
   
  });}



document.getElementById('usuarios').appendChild(userList);

            });
        });

       
      }
 function criarGrupo(){
    location.href = 'cadgrupo.html'
 }

 const logoutBtn = document.querySelector("#deslogar");

 logoutBtn.addEventListener("click", () => {
   // Desloga o usuário da conta do Firebase Auth
   firebase.auth().signOut().then(() => {
     // Limpa os dados do navegador
     localStorage.clear();
     sessionStorage.clear();
     document.cookie.split(";").forEach((cookie) => {
       document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
     });
 
     // Redireciona para a página principal
     window.location.href = "login.html";
   });
 });
 