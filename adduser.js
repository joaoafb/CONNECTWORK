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
  
  // ADICIONAR USUARIOS NO SELECT
  const db = firebase.firestore();
  db.collection("usuarios").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var option = document.createElement('option');
        option.setAttribute('value', doc.data().nome);
        option.textContent = doc.data().nome;
        var select = document.getElementById('usuarioslist');
        select.appendChild(option);
        

    });
});


  
  // ADICIONAR GRUPOS NO SELECT

  db.collection("grupos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var option = document.createElement('option');
        option.setAttribute('value', doc.data().nome);
        option.textContent = doc.data().nome;
        var select = document.getElementById('gruposlist');
        select.appendChild(option);
        

    });
});
document.querySelector("#grupos").addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    pegarinfor()
  });

function adduser(){

  const inputgrupos = document.querySelector("#grupos").value
  const inputusuarios = document.querySelector("#usuarios").value

  

db.collection("grupos" + inputusuarios).doc(inputgrupos).set({
    dataCriacao: localStorage.getItem("dataCriacao"),
    imagem: localStorage.getItem("imagem"),
    nome: localStorage.getItem("nomegp"),
    userId: localStorage.getItem("userIdgp")
})
.then(() => {
    console.log("Usuario Adicionado com Sucesso");
    Swal.fire(
        'Parabens!',
        'Usuario Cadastrado Com Sucesso',
        'success'
      )
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
}






function pegarinfor(){
    
  //PEGAR INFOR DO GP
  const inputgrupos = document.querySelector("#grupos").value
  db.collection('grupos').where("nome", "==", inputgrupos)
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
         localStorage.setItem("dataCriacao", doc.data().dataCriacao)
         localStorage.setItem("imagem",doc.data().imagem)
         localStorage.setItem("nomegp", doc.data().nome)
         localStorage.setItem("userIdgp", doc.data().userId)
      });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
}