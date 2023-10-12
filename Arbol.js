class Usuario {
    constructor(id, usuario, password, nombre, apellidos) {
        this.id = id;
        this.usuario = usuario;
        this.password = password;
        this.nombre = nombre;
        this.apellidos = apellidos;
    }
}

class Nodo {
    constructor(usuario) {
    this.usuario = usuario;
    this.izquierda = null;
    this.derecha = null;
    }
}

class ArbolBinario {
    constructor() {
        this.raiz = null;
    }

    insertar(usuario) {
        const nuevoNodo = new Nodo(usuario);

        if (this.raiz === null) {
            this.raiz = nuevoNodo;
            return true;
        } else {
            return this.insertarRecursivo(this.raiz, nuevoNodo);
        }
    }

    insertarRecursivo(nodoActual, nuevoNodo) {
        if (nuevoNodo.usuario.id === nodoActual.usuario.id) {
            return false; 
        }

        if (nuevoNodo.usuario.id < nodoActual.usuario.id) {
            if (nodoActual.izquierda === null) {
                nodoActual.izquierda = nuevoNodo;
                return true;
            }
            return this.insertarRecursivo(nodoActual.izquierda, nuevoNodo);
        } else {
            if (nodoActual.derecha === null) {
                nodoActual.derecha = nuevoNodo;
                return true;
            }
            return this.insertarRecursivo(nodoActual.derecha, nuevoNodo);
        }
    }

    buscarPorId(id) {
        return this.buscarPorIdRecursivo(this.raiz, id);
    }

    buscarPorIdRecursivo(nodo, id) {
        if (nodo === null) {
            return null;
        }

        if (id === nodo.usuario.id) {
            return nodo.usuario;
        } else if (id < nodo.usuario.id) {
            return this.buscarPorIdRecursivo(nodo.izquierda, id);
        } else {
            return this.buscarPorIdRecursivo(nodo.derecha, id);
        }
    }

    eliminarPorId(id) {
        this.raiz = this.eliminarNodo(this.raiz, id);
    }

    eliminarNodo(nodo, id) {
        if (nodo === null) {
            return null;
        }

        if (id < nodo.usuario.id) {
            nodo.izquierda = this.eliminarNodo(nodo.izquierda, id);
            return nodo;
        } else if (id > nodo.usuario.id) {
            nodo.derecha = this.eliminarNodo(nodo.derecha, id);
            return nodo;
        } else {
            if (nodo.izquierda === null && nodo.derecha === null) {
                return null;
            }

            if (nodo.izquierda === null) {
                return nodo.derecha;
            }

            if (nodo.derecha === null) {
                return nodo.izquierda;
            }

            
            const menorDerecha = this.encontrarMenor(nodo.derecha);
            nodo.usuario = menorDerecha.usuario;
            nodo.derecha = this.eliminarNodo(nodo.derecha, menorDerecha.usuario.id);
            return nodo;
        }
    }

    encontrarMenor(nodo) {
        while (nodo.izquierda !== null) {
            nodo = nodo.izquierda;
        }
        return nodo;
    }

    actualizarPorId(id, usuarioActualizado) {
        this.eliminarPorId(id);
        return this.insertar(usuarioActualizado);
    }
}


const arbol = new ArbolBinario();

const usuarios = [
    {
        "id": 1,
        "usuario": "Yahir",
        "password": "98767891",
        "nombre": "Daniela",
        "apellidos": "Sachez"
    },
    {
        "id": 2,
        "usuario": "Osvaldo",
        "password": "21234567",
        "nombre": "Jorge",
        "apellidos": "Gonzalez"
    },
    {
        "id": 2,
        "usuario": "Osv",
        "password": "87654321",
        "nombre": "Fatima",
        "apellidos": "Perez"
    },
    {
        "id": 3,
        "usuario": "Ivan",
        "password": "87543212",
        "nombre": "lizzy",
        "apellidos": "Simuta"
    }
];

for (const lizzy of usuarios) {
    arbol.insertar(new Usuario(lizzy.id, lizzy.usuario, lizzy.password, lizzy.nombre, lizzy.apellidos));
}



console.log("Buscando usuario con id 2:", arbol.buscarPorId(2));

arbol.eliminarPorId("2");
console.log("Usuario con id 2 eliminado.");
console.log("Buscando usuario con id 2:", arbol.buscarPorId(2));

const usuarioActualizado = new Usuario(1, "Miguel", "12345678", "Jose", "Corzo");
arbol.actualizarPorId("1", usuarioActualizado);
console.log("Buscando usuario con id 1:", arbol.buscarPorId(1));