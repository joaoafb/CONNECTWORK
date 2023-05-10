
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
       
search()

setInterval(() => {
  
  const divPai = document.getElementById("mensagens"); // substitua "div-pai" pelo ID da div pai desejada
  const classesContent = divPai.getElementsByClassName("content");
document.querySelector("#quantidade").innerText = classesContent.length



const divPaiuser = document.getElementById("usuarios"); // substitua "div-pai" pelo ID da div pai desejada
const classesContentuser = divPaiuser.getElementsByClassName("content");
document.querySelector("#quantidadeuser").innerText = classesContentuser.length - 1

const divPaigp= document.getElementById("grupos"); // substitua "div-pai" pelo ID da div pai desejada
const classesContentgp = divPaigp.getElementsByClassName("content");
document.querySelector("#quantidadegp").innerText = classesContentgp.length 




}, 1000);

        db.collection("usuarios").where("email", "==", localStorage.getItem("email"))
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              
                localStorage.setItem("funcao", doc.data().funcao)
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
       
        
        //FIM
      
        db.collection("grupos" + localStorage.getItem("nome")).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
             
               
                const content = document.createElement('div');
                content.classList.add('content');
                document.body.appendChild(content);
                
                const h1 = document.createElement('h1');
                h1.textContent = doc.data().nome;
                content.appendChild(h1);
                



  

document.getElementById('grupos').appendChild(content);

            });
        });

//MENSAGENS
        firebase.database().ref("msg" + localStorage.getItem("nome")).on("value", (snapshot) => {
          
          snapshot.forEach((childSnapshot) => {
          
              const doc = childSnapshot.val()
              const numeroClasses = document.querySelectorAll("#mensagens .content").length ; // substitua "div-pai" pelo ID da div pai desejada
            
              const content = document.createElement('div');
              content.classList.add('content');
              
              const flexColumn = document.createElement('div');
              flexColumn.classList.add('flex', 'column');
              content.appendChild(flexColumn);
              
              const h1 = document.createElement('h1');
              h1.textContent = doc.por;
              flexColumn.appendChild(h1);
              
              const p1 = document.createElement('p');
              p1.textContent = doc.msg;
              flexColumn.appendChild(p1);
              
              const p5 = document.createElement('p');
              p5.textContent = numeroClasses;
              
              content.appendChild(p5);
              p5.style.opacity = '0'

              const p2 = document.createElement('p');
              p2.textContent = doc.horario;
              content.appendChild(p2);
              
              // Adiciona a div content como filho de outro elemento na página
              const container = document.querySelector('#mensagens');
              container.appendChild(content);


              //ALERT QUANDO CLICA NA MENSAGEM
              content.onclick = function(){
                localStorage.setItem("msgresposta", doc.msg)
              localStorage.setItem("useremail", doc.email)
              localStorage.setItem("usernome", doc.por)
              
                localStorage.setItem("mensagemKey", doc.id)
    //modal
Swal.fire({
  title: doc.por + ': ' + doc.msg,
  html: '<input type="text" id="msg" placeholder="Responda essa mensagem" >',
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
  const agora = new Date();
  localStorage.setItem("msg", document.querySelector("#msg").value)
  localStorage.setItem("nomemsg", doc.nome)
// Cria um objeto Timestamp do Firestore a partir da data e hora atual
const horario =agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});


    // Ação a ser executada quando o usuário confirma
     firebase.database().ref("msg" + localStorage.getItem("usernome")).push({
    por: localStorage.getItem("nome"),
    horario: horario,
    msg: document.querySelector("#msg").value,
    para: localStorage.getItem("useremail"),
    status: 'entregue',
    reponder: localStorage.getItem("msgresposta")
  }, (error) => {
    if (error) {
      console.error("Error writing document: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao encaminhar a mensagem',
        text: result.value
      });
    } else {
      
  
  } })




 
// Obtém uma referência para o nó (node) da mensagem no Firebase Realtime Database
const mensagemRef = firebase.database().ref().child("msg" + localStorage.getItem("nome") + '/' + Object.keys(snapshot.val())[p5.textContent]);

// Remove a mensagem do Firebase Realtime Database
mensagemRef.remove()
  .then(() => {
    console.log("Mensagem removida com sucesso");
    location.reload()
  })
  .catch((error) => {
    console.error("Erro ao remover mensagem:", error);
  });  
              }}) 
            }})})
        //procourar usuarios
      

        db.collection("usuarios").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots


                const content = document.createElement('div');
                content.classList.add('content');
                document.body.appendChild(content);
                
                const h1 = document.createElement('h1');
                h1.textContent = doc.data().nome;
                content.appendChild(h1);
                
  
const lis = document.querySelectorAll('h1');
lis.forEach(li => {
  if (li.textContent === localStorage.getItem("nome")) {
    li.style.display = 'none';
    
  }
});

    
content.onclick = function(){
   //horario// Obtém a data e hora atual
const agora = new Date();

// Cria um objeto Timestamp do Firestore a partir da data e hora atual
const horario =agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});





    //modal
Swal.fire({
    title: doc.data().nome,
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
    const agora = new Date();

// Cria um objeto Timestamp do Firestore a partir da data e hora atual
const horario =agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});


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
      
  
  } })}
   
  });}



document.getElementById('usuarios').appendChild(content);

            });
        });

       
      }
 function criarGrupo(){
    location.href = 'cadgrupo.html'
 }

 function deslogar(){
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
 };
 
 const selects = document.getElementById("status");

 selects.addEventListener("change", (event) => {
   const selectedOption = event.target.value;
   // Execute ação desejada
   
   search()
 });
 
function search(){  
  
  document.querySelector("#tarefas").innerHTML = ''
  db.collection('tarefas' + localStorage.getItem("nome")).where("status", "==", document.querySelector("#status").value)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
   const content = document.createElement('div');
   content.classList.add('content');
   
   const flexColumn = document.createElement('div');
   flexColumn.classList.add('flex', 'column');
   content.appendChild(flexColumn);
   
   const h1 = document.createElement('h1');
   h1.textContent = doc.data().nome;
   const nomedatarefa = doc.data().nome
   flexColumn.appendChild(h1);
   
   const desc = document.createElement('span');
   desc.textContent = doc.data().descricao;
   flexColumn.appendChild(desc);
   
   const entrega = document.createElement('span');
   entrega.textContent = 'Entrega:' + doc.data().dataEntrega;
   flexColumn.appendChild(entrega);
   
   
   const flexRow = document.createElement('div');
   flexRow.classList.add('flex', 'row');
   flexColumn.appendChild(flexRow);
   
   const realizar = document.createElement('button');
   realizar.classList.add('realizar');
   realizar.textContent = 'Realizar';
   flexRow.appendChild(realizar);
   
   const negar = document.createElement('button');
   negar.classList.add('negar');
   negar.textContent = 'Negar';
   flexRow.appendChild(negar);
   
   const p = document.createElement('p');
   p.textContent = doc.data().status;
   p.className = 'statustarefa'
   content.appendChild(p);
   negar.addEventListener("click", () => {
    //receber id
    db.collection('tarefas' + localStorage.getItem("nome")).where("nome", "==", document.querySelector("#idnome").textContent)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
              
                localStorage.setItem("iddoc", doc.id)
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    
           //atualizar status
           
    // Add a new document in collection "cities"
    db.collection('tarefas' + localStorage.getItem("nome")).doc(localStorage.getItem("iddoc")).update({
        status:'negada'
    })
    .then(() => {
        console.log("TAREFA NEGADA");
        location.reload()
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
          });

          realizar.addEventListener("click", () => {
            //receber id
            db.collection('tarefas' + localStorage.getItem("nome")).where("nome", "==", nomedatarefa)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                       
                        localStorage.setItem("iddoc", doc.id)
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            
                   //atualizar status
                   
            // Add a new document in collection "cities"
            db.collection('tarefas' + localStorage.getItem("nome")).doc(localStorage.getItem("iddoc")).update({
                status:'realizada'
            })
            .then(() => {
                console.log("TAREFA REALIZADA");
                location.reload()
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
                  });
        
        
        
   document.querySelector("#tarefas").appendChild(content);
     
   
     if(document.querySelector("#status").value == 'realizada'){
  
      
      document.querySelector(".statustarefa").classList= 'green'
       realizar.style.display = 'none'
       negar.style.display = 'none'
   }
   if(document.querySelector("#status").value == 'negada'){
     realizar.style.display = 'none'
     document.querySelector(".statustarefa").classList = 'red'
     negar.style.display = 'none'
   }
    
   });
   const divPaitar= document.getElementById("tarefas"); // substitua "div-pai" pelo ID da div pai desejada
   const classesContenttar = divPaitar.getElementsByClassName("content");
   document.querySelector("#quantidadetar").innerText = classesContenttar.length 
})}