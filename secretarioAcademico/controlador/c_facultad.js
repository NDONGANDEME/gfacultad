import { sesiones } from "../../public/core/sesiones.js"
import { Alerta } from "../../public/utilidades/u_alertas.js";
import { u_verificaciones } from "../../public/utilidades/u_verificaciones.js";
import { m_facultad } from "../modelo/m_facultad.js";
import { u_utilesSA } from "../utilidades/u_utilesSA.js";

export class c_facultad
{
    constructor() {
        this.facultades = [];
        this.facultadActual = null;
        this.modoEdicion = false;
        this.contadorId = 1;
        this.dataTable = null;
        this.nombreValido = false;
    }


    // Método principal para iniciar todo
    inicializar() {
        this.cargarDatosIniciales();
        this.configurarEventos();
        this.configurarValidaciones();
        this.obtenerDataTable();
    }


    // Cargar facultades desde sessionStorage
    cargarFacultadesDeSesion() {
        try {
            const facultadesJSON = sessionStorage.getItem('facultades');
            if (facultadesJSON) {
                return JSON.parse(facultadesJSON);
            }
        } catch (error) {
            Alerta.error('Error', `Fallo al cargar datos guardados: ${error}`);
        }
        return null;
    }


    // Cargar datos iniciales
    cargarDatosIniciales() {
        const facultadesGuardadas = this.cargarFacultadesDeSesion();
        
        if (facultadesGuardadas && facultadesGuardadas.length > 0) 
        {
            this.facultades = facultadesGuardadas.map(f => 
                new m_facultad(f.idFacultad, f.nombreFacultad)
            );
        } else {
            this.facultades = [
                new m_facultad(1, "Ingenierías y Arquitectura"),
                new m_facultad(2, "Ciencias de la Salud"),
                new m_facultad(3, "Humanidades")
            ];
            
            this.guardarFacultadesEnSesion();
        }
        
        // Actualizar el contadorId basado en el ID más alto encontrado
        if (this.facultades.length > 0) {
            const maxId = Math.max(...this.facultades.map(f => f.idFacultad));
            this.contadorId = maxId + 1;
        }
        
        this.actualizarTabla();
    }


    // Configurar todos los eventos
    configurarEventos() {
        // Guardar facultad
        $('#btnGuardarFacultad').on('click', () => this.guardarFacultad());
        
        // Nuevo registro
        $('.nuevaFacultad').on('click', () => {
            this.modoEdicion = false;
            this.facultadActual = null;
            $('#modalNuevaFacultadLabel').text('Agregar nueva facultad');
            this.limpiarFormulario();
        });
        
        // Editar (delegación)
        $(document).on('click', '.editarFacultad', (e) => {
            const id = $(e.currentTarget).data('id');
            this.prepararEdicion(id);
        });
        
        // Deshabilitar (delegación)
        $(document).on('click', '.deshabilitar', (e) => {
            const id = $(e.currentTarget).data('id');
            this.deshabilitarFacultad(id);
        });
    }


    // Configurar validaciones
    configurarValidaciones() {
        $('#nombreFacultad').on('input', () => {
            const valor = $('#nombreFacultad').val().trim();
            this.nombreValido = u_verificaciones.validarTexto(valor);
            
            if (this.nombreValido) {
                $('#nombreFacultad')
                    .removeClass('border-danger')
                    .addClass('border-success');
                $('#errorNombreFacultad').text('').hide();
            } else {
                $('#nombreFacultad')
                    .removeClass('border-success')
                    .addClass('border-danger');
                $('#errorNombreFacultad')
                    .text('El nombre debe tener entre 3 y 100 caracteres')
                    .show();
            }
        });
    }


    // Obtener referencia a DataTable
    obtenerDataTable() {
        // Verificar si DataTable ya está inicializado
        if ($.fn.dataTable.isDataTable('#tablaFacultades')) {
            this.dataTable = $('#tablaFacultades').DataTable();
        } else {
            // Solo inicializar si no existe
            this.dataTable = $('#tablaFacultades').DataTable({
                language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' }
            });
        }
    }


    // Actualizar tabla
    actualizarTabla() {
        if (!this.dataTable) {
            this.obtenerDataTable();
        }
        
        this.dataTable.clear();
        
        this.facultades.forEach(facultad => {
            this.dataTable.row.add([
                facultad.nombre,
                this.crearBotonesAccion(facultad.idFacultad)
            ]);
        });
        
        this.dataTable.draw();
    }


    // Crear botones de acción para cada fila
    crearBotonesAccion(idFacultad) {
        return `
            <div class="d-flex justify-content-center gap-1">
                <button class="btn btn-sm btn-outline-warning editarFacultad" 
                        data-bs-toggle="modal" 
                        data-bs-target="#modalNuevaFacultad" 
                        title="Editar" 
                        data-id="${idFacultad}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger deshabilitar" 
                        data-id="${idFacultad}" 
                        title="Deshabilitar">
                    <i class="fas fa-ban"></i>
                </button>
            </div>
        `;
    }


    // Validar formulario
    validarFormulario() {
        return this.nombreValido;
    }


    // INSERTAR: Guardar nueva facultad
    async guardarFacultad() {
        if (!this.validarFormulario()) {
            Alerta.advertencia('¡Atención!', 'Complete correctamente todos los campos.');
            return;
        }
        
        try {
            const nombre = $('#nombreFacultad').val().trim();
            const id = this.modoEdicion ? this.facultadActual.idFacultad : this.contadorId++;
            
            if (this.modoEdicion) {
                // EDITAR: Actualizar registro
                const index = this.facultades.findIndex(f => f.idFacultad === id);
                if (index !== -1) {
                    this.facultades[index].nombre = nombre;
                    // await fetchFacultad.actualizarFacultadEnBDD({idFacultad: index, nombre: nombre});
                    Alerta.exito('Éxito', 'Facultad actualizada correctamente');
                }
            } else {
                // INSERTAR: Crear nuevo registro
                const nuevaFacultad = new m_facultad(id, nombre);
                this.facultades.push(nuevaFacultad);
                // await fetchFacultad.insertarFacultadEnBDD(nuevaFacultad);
                Alerta.exito('Éxito', 'Facultad creada correctamente');
            }
            
            this.actualizarTabla();
            this.guardarFacultadesEnSesion();
            this.limpiarFormulario();
            $('#modalNuevaFacultad').modal('hide');
            
        } catch (error) {
            Alerta.error('Error', `Error al guardar: ${error}`);
        }
    }


    // EDITAR: Preparar formulario para edición
    prepararEdicion(idFacultad) {
        const facultad = this.facultades.find(f => f.idFacultad == idFacultad);
        
        if (facultad) {
            this.modoEdicion = true;
            this.facultadActual = facultad;
            
            $('#nombreFacultad').val(facultad.nombre);
            $('#modalNuevaFacultadLabel').text('Editar facultad');
            $('#nombreFacultad').trigger('input');
            $('#modalNuevaFacultad').modal('show');
        }
    }


    // DESHABILITAR: Eliminar facultad
    async deshabilitarFacultad(idFacultad) {
        try {
            const confirmacion = await Alerta.confirmar(
                'Confirmar', 
                '¿Está seguro de deshabilitar esta facultad?'
            );
            
            if (confirmacion) {
                // DESHABILITAR: Eliminar de la lista
                this.facultades = this.facultades.filter(f => f.idFacultad != idFacultad);
                this.actualizarTabla();
                this.guardarFacultadesEnSesion();
                Alerta.exito('Éxito', 'Facultad deshabilitada correctamente');
                // await fetchFacultad.deshabilitarFacultadEnBDD(idFacultad);
            }
        } catch (error) {
            Alerta.error('Error', `Error al deshabilitar: ${error}`);
        }
    }


    // Limpiar formulario
    limpiarFormulario() {
        $('#nombreFacultad').val('');
        this.nombreValido = false;
        $('#nombreFacultad').removeClass('border-success border-danger');
        $('#errorNombreFacultad').text('').hide();
        this.modoEdicion = false;
        this.facultadActual = null;
        $('#modalNuevaFacultadLabel').text('Agregar nueva facultad');
    }


    // Guardar en sessionStorage
    guardarFacultadesEnSesion() {
        try {
            const facultadesData = this.facultades.map(f => ({
                idFacultad: f.idFacultad,
                nombreFacultad: f.nombre
            }));
            
            sessionStorage.setItem('facultades', JSON.stringify(facultadesData));
        } catch (error) {
            Alerta.error('Error', `Fallo al guardar en sessionStorage: ${error}`);
        }
    }
}



document.addEventListener('DOMContentLoaded', function() {
    sesiones.verificarExistenciaSesion();
    
    u_utilesSA.cargarArchivosImportadosHTML('modalCerrarSesion', '.importandoModalCierreSesion');
    u_utilesSA.botonesNavegacionWrapper();
    
    const controladorFacultades = new c_facultad();
    
    // Pequeño delay para asegurar que DataTable esté disponible
    setTimeout(() => {
        controladorFacultades.inicializar();
    }, 100);
});