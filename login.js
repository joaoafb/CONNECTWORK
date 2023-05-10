    var firebaseConfig = {
        // configurações do seu projeto Firebase
        apiKey: "AIzaSyBKa-Bs_f_Jg80zzeRlMLzrTH_0oWP3Jdo",
        authDomain: "connectwork-c13b2.firebaseapp.com",
        projectId: "connectwork-c13b2",
        storageBucket: "connectwork-c13b2.appspot.com",
        messagingSenderId: "407759011685",
        appId: "1:407759011685:web:625201a9a6e0b35aba6b8c",
        measurementId: "G-TC7VG0QJVX"
    };
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    // Adiciona o evento de submit ao formulário
    document.getElementById("form-login").addEventListener("submit", function(event) {
        event.preventDefault(); // previne o comportamento padrão do form

        // Obtém os valores dos campos
        var email = document.getElementById("email").value;
        var senha = document.getElementById("senha").value;

        // Faz o login no Firebase
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(function(user) {
            salvarfuncao()
                console.log("Usuário logado com sucesso!");
                // Redireciona o usuário para a página desejada
                location.href = 'index.html'
                
            const IDUSER = firebase.auth().currentUser;
                localStorage.setItem('userId', IDUSER.uid)
                localStorage.setItem('nome',IDUSER.displayName)
                localStorage.setItem("email", IDUSER.email)

            
            
            
                
            })
            .catch(function(error) {
                
                var errorCode = error.code;
                var errorMessage = error.message;
                
                // Exibe mensagem de erro personalizada de acordo com o código de erro retornado
                if (errorCode === 'auth/wrong-password') {
                    console.log("Senha inválida. Tente novamente.'")
                    document.querySelector("#alert").innerHTML = 'Senha inválida. Tente novamente.'
                    document.querySelector("#alert").style.display = 'block'
                    setInterval(() => {
                        document.querySelector("#alert").style.display = 'none'
                    }, 5000);
            
                } else if (errorCode === 'auth/user-not-found') {
                    console.log("Usuário não encontrado. Verifique seu e-mail e tente novamente.")
                    document.querySelector("#alert").innerHTML = 'Usuário não encontrado. Verifique seu e-mail e tente novamente.'
                    document.querySelector("#alert").style.display = 'block'
                    setInterval(() => {
                        document.querySelector("#alert").style.display = 'none'
                    }, 5000);
                } else {
                alert(errorMessage);
                }
            });
    });

    function salvarfuncao(){
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
    }
