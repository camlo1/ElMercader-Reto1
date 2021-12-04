 function crear() {

    let email = $("#email").val();
    let password = $("#password").val();
    let name = $("#name").val();
    let confirmarpassword = $("#confirmarpassword").val();

    if (password !== confirmarpassword) {
        alert('La clave no es igual');
        return;
    }
    else if (email.length === 0 || password.length === 0 || name.lenght === 0 || confirmarpassword.lenght === 0) {
        alert("No pueden haber campos vacios");
        return;
    }
    else if (password.length < 6) {
        alert('La clave debe tener mas de 6 letras');
        return;
    }
    else {
        checkMail(email);
        if (checkMail(email) == false) {
            return;
        }
        else if (validarExisteEmail(email)==true){
            return;
        }
    }

    const payload = {
        email: email,
        password: password,
        name: name
    };

    $.ajax({
        url: "http://localhost:8080/api/user/new",
        type: "POST",
        dataType: 'JSON',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(payload),
        statusCode: {
            201: function () {
                alert('Usuario creado exitosamente');
                limpiarCampos();
            }
        },
    });
}

function limpiarCampos(){
    $("#name").val("");
    $("#email").val("");
    $("#password").val("");
    $("#confirmarpassword").val("");
    location.href ="index.html";
}

function checkMail(email){
	var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(email)) {
		return true;
	} else {
        alert("La dirección de email es incorrecta!");
	    return false};
}

  function validarExisteEmail(){
    let email= $("#email").val()
    $.ajax ({
        url: "http://localhost:8080/api/user/"+email,
        type: 'GET',
        dataType: 'JSON',
        contentType: "aplication/JSON",
        success: function(respuesta){
            console.log(respuesta);
            if(respuesta==true){
                alert("Ya existe una cuenta asociada a este email");
                $("#email").focus();
                $("#password").val("")
                $("#confirmarpassword").val("")
                return true;
            }else{
                crear();
                return false
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error")
        }
    });
}


       