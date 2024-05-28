////////// Usuario ////////////

class Usuario {
    constructor(nombre, apellidos, email, password, centro, curso) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.centro = centro;
        this.curso = curso;
        this.logros = []; 
    }
}

////////// Registrar usuario ////////////

document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let nombre = document.getElementById('nombre').value;
            let apellidos = document.getElementById('apellidos').value;
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            let centro = document.getElementById('centro').value;
            let curso = document.getElementById('curso').value;

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            if (usuarios.some(usuario => usuario.email === email)) {
                alert('El correo electrónico ya está registrado');
                return;
            }

            let usuario = new Usuario(nombre, apellidos, email, password, centro, curso);
            usuarios.push(usuario);

            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert('Usuario registrado con éxito');
            window.location.href = 'index.html';
        });
    }

////////// Inicio de sesión ////////////

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let email = document.getElementById('username').value;
            let password = document.getElementById('password').value;

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            let usuario = usuarios.find(usuario => usuario.email === email && usuario.password === password);

            if (usuario) {
                localStorage.setItem('usuarioActual', JSON.stringify(usuario));
                window.location.href = 'archie.html';
            } else {
                alert('Correo electrónico o contraseña incorrectos');
            }
        });
    }
});

////////// Recuperar datos de usuario ////////////

document.addEventListener('DOMContentLoaded', () => {
    const datosPersonalesForm = document.getElementById('datosPersonalesForm');

    if (datosPersonalesForm) {
        let usuario = JSON.parse(localStorage.getItem('usuarioActual'));

        if (usuario) {
            document.getElementById('nombre').value = usuario.nombre;
            document.getElementById('apellidos').value = usuario.apellidos;
            document.getElementById('email').value = usuario.email;
            document.getElementById('password').value = usuario.password;
            document.getElementById('centro').value = usuario.centro;
            document.getElementById('curso').value = usuario.curso;
        }

        document.getElementById('editarBtn').addEventListener('click', function() {
            let inputs = document.querySelectorAll('#datosPersonalesForm input');
            inputs.forEach(input => {
                input.removeAttribute('readonly');
            });

            document.getElementById('editarBtn').style.display = 'none';
            document.getElementById('guardarBtn').style.display = 'block';
        });

        datosPersonalesForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let nombre = document.getElementById('nombre').value;
            let apellidos = document.getElementById('apellidos').value;
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            let centro = document.getElementById('centro').value;
            let curso = document.getElementById('curso').value;

            let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
            usuarioActual.nombre = nombre;
            usuarioActual.apellidos = apellidos;
            usuarioActual.email = email;
            usuarioActual.password = password;
            usuarioActual.centro = centro;
            usuarioActual.curso = curso;

            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            let usuarioIndex = usuarios.findIndex(usuario => usuario.email === email);
            if (usuarioIndex !== -1) {
                usuarios[usuarioIndex] = usuarioActual;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
            }

            alert('Datos guardados correctamente');
            location.reload();
        });
    }

////////// Notas ////////////

    const guardarNotasBtn = document.getElementById('guardarNotasBtn');

    if (guardarNotasBtn) {
        guardarNotasBtn.addEventListener('click', function(event) {
            event.preventDefault();

            let notas = {
                fisica1: parseFloat(document.getElementById('fisica1').value),
                fisica2: parseFloat(document.getElementById('fisica2').value),
                biologia1: parseFloat(document.getElementById('biologia1').value),
                biologia2: parseFloat(document.getElementById('biologia2').value),
                matematicas1: parseFloat(document.getElementById('matematicas1').value),
                matematicas2: parseFloat(document.getElementById('matematicas2').value),
                historia1: parseFloat(document.getElementById('historia1').value),
                historia2: parseFloat(document.getElementById('historia2').value),
                english1: parseFloat(document.getElementById('english1').value),
                english2: parseFloat(document.getElementById('english2').value),
                castellano1: parseFloat(document.getElementById('castellano1').value),
                castellano2: parseFloat(document.getElementById('castellano2').value),
                catala1: parseFloat(document.getElementById('catala1').value),
                catala2: parseFloat(document.getElementById('catala2').value),
                optativa1_1: parseFloat(document.getElementById('optativa1_1').value),
                optativa1_2: parseFloat(document.getElementById('optativa1_2').value)
            };

            let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || {};
            usuarioActual.notas = notas;
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            let usuarioIndex = usuarios.findIndex(usuario => usuario.email === usuarioActual.email);
            if (usuarioIndex !== -1) {
                usuarios[usuarioIndex] = usuarioActual;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
            }

            alert('Notas guardadas correctamente');

////////// Logros del usuario ////////////

            usuarioActual.logros = usuarioActual.logros || [];
            let nuevosLogros = [];

            //Logro Historia
            if (notas.historia1 === 10 || notas.historia2 === 10) {
                if (!usuarioActual.logros.includes('Haciendo historia')) {
                    usuarioActual.logros.push('Haciendo historia');
                    nuevosLogros.push('Haciendo historia');
                }
            }

            //Logro Mates
            if ((notas.matematicas1 >= 5 && notas.matematicas2 >= 5)) {
                if (!usuarioActual.logros.includes('Matemático')) {
                    usuarioActual.logros.push('Matemático');
                    nuevosLogros.push('Matemático');
                }
            }

            //Logro Física
            let mediaFisica = (notas.fisica1 + notas.fisica2) / 2;
            if (mediaFisica >= 8) {
                if (!usuarioActual.logros.includes('Todo es relativo')) {
                    usuarioActual.logros.push('Todo es relativo');
                    nuevosLogros.push('Todo es relativo');
                }
            }

            //Logro English
            if (notas.english1 >= 5 && notas.english2 >= 5) {
                if (!usuarioActual.logros.includes('Ciudadano inglés')) {
                    usuarioActual.logros.push('Ciudadano inglés');
                    nuevosLogros.push('Ciudadano inglés');
                }
            }

            //Logro Bio
            if (notas.biologia1 >= 5 || notas.biologia2 >= 5) {
                if (!usuarioActual.logros.includes('Conociendo el medio')) {
                    usuarioActual.logros.push('Conociendo el medio');
                    nuevosLogros.push('Conociendo el medio');
                }
            }

            //Logro Optativa1
            if (notas.optativa1_1 >= 5 || notas.optativa1_2 >= 5) {
                if (!usuarioActual.logros.includes('No es opcional')) {
                    usuarioActual.logros.push('No es opcional');
                    nuevosLogros.push('No es opcional');
                }
            }

            //Logro para verificar más de un idioma
            if ((notas.english1 >= 5 && notas.castellano1 >= 5) || (notas.english2 >= 5 && notas.castellano2 >= 5) ||
                (notas.english1 >= 5 && notas.catala1 >= 5) || (notas.english2 >= 5 && notas.catala2 >= 5) ||
                (notas.castellano1 >= 5 && notas.catala1 >= 5) || (notas.castellano2 >= 5 && notas.catala2 >= 5)) {
                if (!usuarioActual.logros.includes('La torre de babel')) {
                    usuarioActual.logros.push('La torre de babel');
                    nuevosLogros.push('La torre de babel');
                }
            }

            //Logro Bingo
            let todasAprobadas = true;

            //bucle para verificar si todas las notas estan aprobadas
            for (let key in notas) {
                if (notas[key] < 5) {
                    todasAprobadas = false;
                    break;
                }
            }

            if (todasAprobadas) {
                if (!usuarioActual.logros.includes('Bingo')) {
                    usuarioActual.logros.push('Bingo');
                    nuevosLogros.push('Bingo');
                }
            }

            if (nuevosLogros.length > 0) {
                localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
                nuevosLogros.forEach(logro => {
                    alert('¡Has ganado el logro: ' + logro + '!');
                });
            }
        });
    }

    //Mostrar las notas al cargar la página
    let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || {};
    let notasGuardadas = usuarioActual.notas;
    if (notasGuardadas) {
        document.getElementById('fisica1').value = notasGuardadas.fisica1 || '';
        document.getElementById('fisica2').value = notasGuardadas.fisica2 || '';
        document.getElementById('biologia1').value = notasGuardadas.biologia1 || '';
        document.getElementById('biologia2').value = notasGuardadas.biologia2 || '';
        document.getElementById('matematicas1').value = notasGuardadas.matematicas1 || '';
        document.getElementById('matematicas2').value = notasGuardadas.matematicas2 || '';
        document.getElementById('historia1').value = notasGuardadas.historia1 || '';
        document.getElementById('historia2').value = notasGuardadas.historia2 || '';
        document.getElementById('english1').value = notasGuardadas.english1 || '';
        document.getElementById('english2').value = notasGuardadas.english2 || '';
        document.getElementById('castellano1').value = notasGuardadas.castellano1 || '';
        document.getElementById('castellano2').value = notasGuardadas.castellano2 || '';
        document.getElementById('catala1').value = notasGuardadas.catala1 || '';
        document.getElementById('catala2').value = notasGuardadas.catala2 || '';
        document.getElementById('optativa1_1').value = notasGuardadas.optativa1_1 || '';
        document.getElementById('optativa1_2').value = notasGuardadas.optativa1_2 || '';
    }
});



/////////////////////////////////// Logros /////////////////////////////

//Mostrar todos los logros ganados al refrescar la página
document.addEventListener('DOMContentLoaded', () => {
    let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || {};
    let logrosGanados = usuarioActual.logros || [];

    let logrosContainer = document.getElementById('logrosGanados');
    logrosGanados.forEach(logro => {
        let li = document.createElement('li');
        li.textContent = 'Has ganado el logro: ' + logro;
        logrosContainer.appendChild(li);
    });
    logrosContainer.style.listStyleType = 'none';

    //Verificar si hay nuevos logros
    let logrosNuevos = usuarioActual.logros.slice(logrosGanados.length);
    logrosNuevos.forEach(logro => {
        let li = document.createElement('li');
        li.textContent = 'Has ganado el logro: ' + logro;
        logrosContainer.appendChild(li);
    });
});
