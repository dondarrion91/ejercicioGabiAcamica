
var personas = [];
let hasFilter = false;


/**
 * alterna la lista actualizada contra la lista
 * original.
 */
function handleOnListaEliminados(){
    
    if(!hasFilter){
        let filteredList = JSON.parse(localStorage.getItem("eliminados"));
        recargarLista(filteredList,() => {
            alert("La lista se ha actualizado");
        });
        
        hasFilter = true;
    }
    
}


function handleOnAlternarLista() {
    setTimeout(() => {
        
        if(!hasFilter){
            let filteredList = handleOnBuscarPorNombre(nombre);
            recargarLista(filteredList,() => {
                alert("La lista se ha actualizado");
            });
            
            hasFilter = true;
        }else{
            console.log("object")
            recargarLista(personas,() => {
                alert("La lista se ha actualizado");
            });
            
            hasFilter = false;
        }
            
    },5000)
}


/**
 * muestra la cantidad de personas que estan en la lista
 */
function handleOnCantidadPersonas() {
    
    let tbodyNumber = document.getElementsByTagName("tbody")[0].childElementCount;
    alert(`En la tabla hay ${tbodyNumber} personas`);
    
}


/**
 * elimina la primera persona de la lista
 */
function handleOnEliminarPrimero() {
    

    personas.map(elem => {
        
        if(personas.indexOf(elem) === 0){
            personas.splice(personas.indexOf(elem),1);
        }
    })

    recargarLista(personas);
    
}


/**
 * elimina la ultima persona de la lista.
 */
function handleOnEliminarUltimo() {
    
    personas.map(elem => {
        
        if(personas.indexOf(elem) === personas.length-1){
            personas.splice(personas.indexOf(elem),1);
        }
    })

    recargarLista(personas);
    
}


/**
 * del total de personas cargadas, filtra las que no coinciden con el criterio de busqueda.
 * @param {string} nombre 
 */


function handleOnBuscarPorNombre() {
    
    
    //let nombres = onCargarPersonas();
    

    let nombre = document.getElementById("busquedaNombre").value;
    // for(let i=0;i<nombres.length;i++ ){
    //     // nombre = "gabriel" nombreIngresado = "gabriel"
    //     // nombre = "gabriel soria" nombreIngresado = "soria"
    //     if(nombres[i].nombre.toLowerCase().includes(nombre.toLowerCase().trim())){
    //         arrayNombre.push(nombres[i]);
    //     }
    
    // }

    let arrayResultante = personas.filter(function(elem) {
        return elem.nombre.toLowerCase().includes(nombre.toLowerCase().trim());
    });

    hasFilter= true;
    recargarLista(arrayResultante,() => {
        alert("busqueda Filtrada");
    });
    return arrayResultante;

}





/**
 * limpia la busqueda de persona.
 */
function handleOnLimpiarBusquedaPersona() {
    let busquedaNombre = document.getElementById("busquedaNombre");
    recargarLista(personas);
    busquedaNombre.value = "";
    hasFilter=false;
}


/**
 * indica que persona hay que eliminar 
 * pasando por parametro el id.
 * @param {number} idPersona 
 */
if(!localStorage.getItem("eliminados")){
    let listaEliminados = [];
    localStorage.setItem("eliminados",JSON.stringify(listaEliminados));
}else{
    let listaEliminados = localStorage.getItem("eliminados");
}

function handleOnEliminarPersona(id) {
    
    personas.map(elem => {
        if(elem.id === parseInt(id) && confirm("Esta seguro de eliminar el usuario?")){
            let listaEliminados = JSON.parse(localStorage.getItem("eliminados"));
            console.log(listaEliminados);
            listaEliminados.push(elem);
            localStorage.setItem("eliminados",JSON.stringify(listaEliminados));
            personas.splice(personas.indexOf(elem),1);
            
        }
    })

    recargarLista(personas,() => {
        console.log("callback")
    });
    
}

/**
 * evento para actualizar el nombre de una persona
 * pasando por parametro el id.
 * @param {number} idPersona 
 */
function handleOnActualizarNombrePersona(id) {
    let newName = prompt("Nuevo nombre: ");
    
    personas.map(elem => {

        if(elem.id === parseInt(id) && newName !== null && newName !== "" && confirm("Esta seguro de hacer el cambio?")){
            personas[personas.indexOf(elem)].nombre = newName;
        }

    })

    recargarLista(personas);
    
    
}


/**
 * Recibe un array de personas y lo 
 * agrega a la lista de la pantalla.
 * @param {Array} personas 
 */
function recargarLista(personas,callback) {
    


    // creacion de tabla y registro
    var table = document.getElementById("tablePersonas");
    var tbody = table.getElementsByTagName("tbody")[0];

    var tbodyNew = document.createElement('tbody');

    for(var i = 0; i < personas.length; i++) {

        var tr = tbodyNew.insertRow(i);

        // celda
        var tdId = tr.insertCell(0);
        tdId.className = "text-center";
        tdId.innerText = personas[i].id;

        // celda
        var tdNombre = tr.insertCell(1);
        tdNombre.className = "text-center";
        tdNombre.innerText = personas[i].nombre;

        // celda
        var tdApellido = tr.insertCell(2);
        tdApellido.innerText = personas[i].apellido;
        tdApellido.className = "text-center";

        // celda
        var tdEdad = tr.insertCell(3);
        tdEdad.innerText = personas[i].edad;
        tdEdad.className = "text-center";

        // boton de accion
        var button = document.createElement("button");
        button.className = "btn btn-primary btn-sm mr-1";
        button.type = "button";
        button.setAttribute( "onClick", `handleOnEliminarPersona('${personas[i].id}')`);
        button.innerText = "Eliminar";

        var button2 = document.createElement("button");
        button2.className = "btn btn-primary btn-sm mr-1";
        button2.type = "button";
        button2.setAttribute( "onClick", `handleOnActualizarNombrePersona('${personas[i].id}')`);
        button2.innerText = "Actualizar Nombre";

        // celda
        var tdAccion = tr.insertCell(4);
        tdAccion.className = "text-center";
        tdAccion.appendChild(button);
        tdAccion.appendChild(button2);
    }
    
    table.replaceChild(tbodyNew, tbody);
    
    callback("Primera Carga");
}





/**
 * function que carga personas
 */
function onCargarPersonas() {
    
    var persona1 = {
        id: 4,
        nombre: "Gabriel",
        apellido: "Martinez",
        edad: 20
    };
    
    var persona2 = {
        id: 55,
        nombre: "Martin",
        apellido: "Tolosa",
        edad: 25
    };
    
    var persona3 = {
        id: 57,
        nombre: "Marcelo",
        apellido: "Alvarez",
        edad: 37
    };
    
    var persona4 = {
        id: 8,
        nombre: "Florencia",
        apellido: "Guzman",
        edad: 30
    };
    
    var persona5 = {
        id: 9,
        nombre: "Julieta",
        apellido: "Garcia",
        edad: 33
    };
    
    var persona6 = {
        id: 12,
        nombre: "Mariela",
        apellido: "Santini",
        edad: 40
    };

    personas = [persona1, persona2, persona3, persona4, persona5, persona6];
    

    recargarLista(personas,string => {
        alert(`${string}`);
    });

    return personas;

    
}



onCargarPersonas();




