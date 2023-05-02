// Initialize Firebase
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
;

   // Referência ao banco de dados Firestore
  
   const db = firebase.firestore();



   //pegar usuarios e criar selector
   db.collection("usuarios").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        
      const seletor = document.querySelector("#usuarios")
      const option = document.createElement("option");
   option.value = doc.data().nome;
     option.text = doc.data().nome; 
     seletor.appendChild(option);
    
        });
});


//PEGAR GRUPOS

   db.collection("grupos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        
       const seletor = document.querySelector("#grupos")
         const option = document.createElement("option");
      option.value = doc.data().nome;
        option.text = doc.data().nome; 
        seletor.appendChild(option);
       
        });
});
  
  const formTarefa = document.getElementById('formTarefa');
  formTarefa.addEventListener('submit', (event) => {
    event.preventDefault(); // previne o envio padrão do formulário
    
    const nome = document.querySelector('#nome').value
    const dataEntrega =  document.querySelector('#dataEntrega').value
    const descricao = document.querySelector('#descricao').value
    //PUXAR USUARIOS



// salva os dados no Firebase
db.collection('tasks').add({
    nome: nome,
    descricao: descricao,
    dataEntrega: dataEntrega,
    userID: localStorage.getItem("userId"),
    grupo: document.querySelector("#grupos").value,
    usuarios: document.querySelector("#usuarios").value,
    status: 'pendente'
})
  .then((docRef) => {
    console.log('Tarefa salva com ID: ', docRef.id);
    if(document.querySelector("#usuarios").value == "Selecionar Colaborador"){}else{
        //acao gravar em usuario
       
        acharuser(document.querySelector("#usuarios").value)
    }
    if(document.querySelector("#grupos").value == ''){}else{
        //acao gravar em grupo
        gravartarefagrupo()
    }
  })
  .catch((error) => {
    console.error('Erro ao salvar a tarefa: ', error);
  });

  });

function acharuser(emailuser){
    emailuser = document.querySelector("#usuarios").value
    
  
  //salvar tarefa no usuario
  db.collection("usuarios").where("email", "==", emailuser)
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        emailuser = document.querySelector("#usuarios").value
          gravartarefauser();
          console.log("usuario encontrado")
      });
  })
  .catch((error) => {
      console.log("erro achar usuario: ", error);
  });
}

function gravartarefauser(){
    emailuser = document.querySelector("#usuarios").value
   
db.collection(emailuser).add({
    nome: document.querySelector('#nome').value,
    descricao: document.querySelector('#descricao').value,
    dataEntrega: document.querySelector('#dataEntrega').value,
    email: document.querySelector("#usuarios").value,
    por: localStorage.getItem("nome"),
    status:"pendente"
    
})
.then((docRef) => {
    console.log("TAREFA GRAVADA NO USUARIO", docRef.id);
})
.catch((error) => {
    console.error("ERRO GRAVAR TAREFA NO USUARIO ", error);
});
}


//GRUPO



function gravartarefagrupo(){
    grupo = document.querySelector("#grupos").value
   
db.collection(grupo).add({
    nome: document.querySelector('#nome').value,
    descricao: document.querySelector('#descricao').value,
    dataEntrega: document.querySelector('#dataEntrega').value,
    grupo: document.querySelector("#grupos").value,
    por: localStorage.getItem("nome"),
    status:'pendente'
    
})
.then((docRef) => {
    console.log("TAREFA GRAVADA NO grupo", docRef.id);
})
.catch((error) => {
    console.error("ERRO GRAVAR TAREFA NO grupo", error);
});
}