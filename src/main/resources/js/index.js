


const iniciarSesion = () => {
    const loading  = '<img src="imagenes/carrito-de-compra-3.gif">';
    $("#loading").html(loading);

    setTimeout (()=>{
        autenticar();
    }, 200);
}

    const autenticar = ()=>{
        const email= $("#email").val();
        const password=$("#password").val();

        if(email.length ===0 || password.length ===0){
            alert("no pueden haber campos vacios");
            $("#loading").html("");
            return;
        }

        $.ajax({
            url:"http://129.151.114.170:8080/api/user/"+email+"/"+password,
            type: "GET",
            dataType: 'json',
            success:function (respuesta) {
                $("#loading").html("");
                console.log(respuesta);
                if (respuesta.id===null){
                    alert('email/password no validos');
                }else{
                    alert('usuario valido');

                    setTimeout(()=>{
                    window.location.href ='paginaInicio.html';
                    }, 1000);               

                }
                
            },
            error: function(xhr,status){
                $("#loading").val("");
               console.log(xhr);
               console.log(status);
               alert("error   al   validar ");

            },
        });
    } 

 