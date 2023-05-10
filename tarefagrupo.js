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
  
  // Referência ao banco de dados Firestore
  const db = firebase.firestore();
  //puxar grupos
  function searchgroup(){
    
   //pegar usuarios e criar selector
   db.collection("grupos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        
       const seletor = document.querySelector("#grupos")
         const option = document.createElement("option");

        option.text = doc.data().nome; 
        seletor.appendChild(option);
       
        });
});
  }
  
  // Obtém uma referência ao elemento HTML onde os dados serão exibidos
  const listaEmail = document.getElementById('lista-email');
  function search(){
    
  db.collection(document.querySelector("#inputgrupos").value).where("status", "==", document.querySelector("#status").value)
  .get()
  .then((querySnapshot) => {
    // Limpa o elemento HTML antes de adicionarmos os novos dados
    listaEmail.innerHTML = "";

    // Itera sobre os documentos da coleção "email" e cria o HTML correspondente
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const div = document.createElement("div");
      const h2 = document.createElement("h2");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const p3 = document.createElement("p");
      const p4 = document.createElement("p");
      const button1 = document.createElement("button");
      const button2 = document.createElement("button");
      div.className = "card box";
      
      h2.className = "card-title";
      button1.className = "btn waves-effect waves-light";
      button2.className = "btn red waves-effect waves-light";
    
      
        h2.id = 'idnome'
      h2.textContent = `${data.nome}`;
      p1.textContent = `Descrição: ${data.descricao}`;
      p2.textContent = `Por: ${data.por}`;
      p3.textContent = `Data de entrega: ${data.dataEntrega}`;
      p4.textContent = `Status: ${data.status}`;
      button1.textContent = "realizada";
      button2.textContent = "Negar";

     //btn realizada
     button1.addEventListener("click", () => {
        //receber id
        db.collection(document.querySelector("#inputgrupos").value).where("nome", "==", document.querySelector("#idnome").textContent)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    localStorage.setItem("iddoc", doc.id)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        
               //atualizar status
               
        // Add a new document in collection "cities"
        db.collection(document.querySelector("#inputgrupos").value).doc(localStorage.getItem("iddoc")).update({
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




              //btn negar
              button2.addEventListener("click", () => {
                //receber id
                db.collection(document.querySelector("#inputgrupos").value).where("nome", "==", document.querySelector("#idnome").textContent)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                            localStorage.setItem("iddoc", doc.id)
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
                
                       //atualizar status
                       
                // Add a new document in collection "cities"
                db.collection(document.querySelector("#inputgrupos").value).doc(localStorage.getItem("iddoc")).update({
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

      div.appendChild(h2);
      div.appendChild(p1);
      div.appendChild(p2);
      div.appendChild(p3);
      div.appendChild(p4);
      div.appendChild(button1);
      div.appendChild(button2);
      if(document.querySelector("#status").value == button1.textContent){
        button1.style.display = 'none'
        button2.style.display = 'none'
    }
    if(document.querySelector("#status").value == 'negada'){
        button1.style.display = 'none'
        button2.style.display = 'none'
    }
      listaEmail.appendChild(div);
    });
  });

  }