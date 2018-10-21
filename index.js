'use strict'

window.addEventListener('load', function() {
  function generateKey(nombre) {
    return nombre.replace(/ /g, ''); // expresión regular
  }

  function acciona() {
    var valores = this.id.split('_');
    var dato = JSON.parse(localStorage.getItem(valores[1]));

    if(valores[0] == 'hecha' || valores[0] == 'borra') {
      alert('Se ha quitado de la lista ' + dato.nombre);
      localStorage.removeItem(valores[1]);
      location.reload();
    }
    else {
      materia.value = dato.materia;
      nombre.value = dato.nombre;
      descripcion.value = dato.descripcion;
      localStorage.removeItem(dato[1]);
    }
  }

  var formulario = document.querySelector('.formulario');
  var div_tareas = document.querySelector('.tareas');
  var tabla = document.querySelector('#tabla_tareas');

  var materia = document.querySelector('#materia');
  var nombre = document.querySelector('#nombre');
  var descripcion = document.querySelector('#descripcion');
  var datos = {};

  materia.focus();

  if(localStorage.length == 0)
    div_tareas.style.display = "none";
  else {
    for(var j in localStorage) {
      if(localStorage.getItem(j) != null) {
        let tr = document.createElement('tr');
        let td, a, text, p;
        var dato = JSON.parse(localStorage.getItem(j));

        for(var i in dato) {
          td = document.createElement('td');
          p = document.createElement('p');
          text = document.createTextNode(dato[i]);
          p.appendChild(text);
          td.appendChild(p);
          tr.appendChild(td);
        }

        td = document.createElement('td');

        a = document.createElement('a');
        p = document.createElement('p');
        text = document.createTextNode('Hecha');
        p.appendChild(text);
        a.appendChild(p);
        a.id = `hecha_${j}`;
        td.appendChild(a);

        a = document.createElement('a');
        p = document.createElement('p');
        text = document.createTextNode('Borrar');
        p.appendChild(text);
        a.appendChild(p);
        a.id = `borra_${j}`;
        td.appendChild(a);

        a = document.createElement('a');
        p = document.createElement('p');
        text = document.createTextNode('Modificar');
        p.appendChild(text);
        a.appendChild(p);
        a.id = `modifica_${j}`;
        td.appendChild(a);

        tr.appendChild(td);

        tabla.appendChild(tr);
      }
    }
    var enlaces = document.getElementsByTagName('a');

    for(var i of enlaces)
      i.addEventListener('click', acciona);
  }

  formulario.addEventListener('submit', function() {
    materia = document.querySelector('#materia').value;
    nombre = document.querySelector('#nombre').value;
    descripcion = document.querySelector('#descripcion').value;

    if(materia.trim().length == 0 || nombre.trim().length == 0 || descripcion.trim().length == 0) {
      alert('Faltan datos')
      return false;
    }

    datos.materia = materia;
    datos.nombre = nombre;
    datos.descripcion = descripcion;

    localStorage.setItem(generateKey(nombre), JSON.stringify(datos));
    location.reload();
  });
});
