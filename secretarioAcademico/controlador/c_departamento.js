import { sesiones } from "../../public/core/sesiones.js"
import { Alerta } from "../../public/utilidades/u_alertas.js";
import { u_verificaciones } from "../../public/utilidades/u_verificaciones.js";
import { m_departamento } from "../modelo/m_departamento.js";
import { u_utilesSA } from "../utilidades/u_utilesSA.js";


export class c_departamento
{
    constructor() {
        this.departamentos = [];
        this.departamentoActual = null;
        this.modoEdicion = false;
        this.contadorId = 1;
        this.dataTable = null;
        this.facultades = [];

        this.nombreValido = false;
        this.facultadValida = false;
    }


    // Método principal para iniciar todo
    inicializar() {
        this.cargarFacultadesDeSesion();
        this.cargarDatosIniciales();
        this.configurarEventos();
        this.configurarValidaciones();
        this.cargarFacultadesEnSelect();
        this.obtenerDataTable();
    }


    // Cargar facultades desde sessionStorage
    cargarFacultadesDeSesion() {
        try {
            const facultadesJSON = sessionStorage.getItem('facultades');
            if (facultadesJSON) {
                const datosFacultades = JSON.parse(facultadesJSON);
                this.facultades = datosFacultades.map(f => ({
                    idFacultad: f.idFacultad,
                    nombre: f.nombreFacultad
                }));
            } else {
                Alerta.advertencia('Advertencia', 'No hay facultades registradas. Por favor, agregue facultades primero.');
            }
        } catch (error) {
            Alerta.error('Error', `Fallo al cargar facultades: ${error}`);
        }
    }


    // Llenar select con facultades
    cargarFacultadesEnSelect() {
        // let todasFacultades = await fetchFacultad.obtenerFacultadesDeBDD();

        const select = $('#facultadesDepartamento');
        select.empty();
        select.append('<option value="Ninguno">Seleccione...</option>');
        
        // Agregar facultades desde sessionStorage
        this.facultades.forEach(facultad => {
            select.append(`<option value="${facultad.idFacultad}">${facultad.nombre}</option>`);
        });
    }


    // Cargar departamentos desde sessionStorage
    cargarDepartamentosDeSesion() {
        try {
            const departamentosJSON = sessionStorage.getItem('departamentos');
            if (departamentosJSON) {
                return JSON.parse(departamentosJSON);
            }
        } catch (error) {
            Alerta.error('Error', `Fallo al cargar departamentos: ${error}`);
        }
        return null;
    }


    // Cargar datos iniciales de departamentos
    cargarDatosIniciales() {
        // let todosDepartamentos = await fetchDepartamento.obtenerDepartamentosDeBDD();

        const departamentosGuardados = this.cargarDepartamentosDeSesion();
        
        if (departamentosGuardados && departamentosGuardados.length > 0) {
            this.departamentos = departamentosGuardados.map(d => 
                new m_departamento(d.idDepartamento, d.nombreDepartamento, d.idFacultad)
            );
        } else {
            // Datos de ejemplo
            this.departamentos = [
                new m_departamento(1, "Informática", null)
            ];
            
            this.guardarDepartamentosEnSesion();
        }
        
        // Actualizar contadorId basado en el ID más alto
        if (this.departamentos.length > 0) {
            const maxId = Math.max(...this.departamentos.map(d => d.idDepartamento));
            this.contadorId = maxId + 1;
        }
        
        this.actualizarTabla();
    }


    // Configurar todos los eventos
    configurarEventos() {
        // Guardar departamento
        $('#btnGuardarDepartamento').on('click', () => this.guardarDepartamento());
        
        // Nuevo registro
        $('.nuevo').on('click', () => {
            this.modoEdicion = false;
            this.departamentoActual = null;
            $('#modalNuevoDepartamentoLabel').text('Agregar nuevo departamento');
            this.limpiarFormulario();
        });
        
        // Editar (delegación)
        $(document).on('click', '.editar', (e) => {
            const id = $(e.currentTarget).data('id');
            this.prepararEdicion(id);
        });
        
        // Deshabilitar (delegación)
        $(document).on('click', '.deshabilitar', (e) => {
            const id = $(e.currentTarget).data('id');
            this.deshabilitarDepartamento(id);
        });
    }


    // Configurar validaciones
    configurarValidaciones() {
        // Validar nombre
        $('#nombreDepartamento').on('input', () => {
            const valor = $('#nombreDepartamento').val().trim();
            this.nombreValido = u_verificaciones.validarTexto(valor);
            
            if (this.nombreValido) {
                $('#nombreDepartamento')
                    .removeClass('border-danger')
                    .addClass('border-success');
                $('#errorNombreDepartamento').text('').hide();
            } else {
                $('#nombreDepartamento')
                    .removeClass('border-success')
                    .addClass('border-danger');
                $('#errorNombreDepartamento')
                    .text('El nombre debe tener entre 3 y 100 caracteres')
                    .show();
            }
        });
        
        // Validar facultad (opcional)
        $('#facultadesDepartamento').on('change', () => {
            const valor = $('#facultadesDepartamento').val();
            this.facultadValida = valor !== "Ninguno";
            
            if (this.facultadValida) {
                $('#facultadesDepartamento')
                    .removeClass('border-danger')
                    .addClass('border-success');
                $('#errorFacultadesDepartamento').text('').hide();
            } else {
                $('#facultadesDepartamento')
                    .removeClass('border-success')
                    .addClass('border-danger');
                $('#errorFacultadesDepartamento')
                    .text('Seleccione una facultad (opcional)')
                    .show();
            }
        });
    }


    // Obtener referencia a DataTable
    obtenerDataTable() {
        if ($.fn.dataTable.isDataTable('#tablaDepartamentos')) {
            this.dataTable = $('#tablaDepartamentos').DataTable();
        } else {
            this.dataTable = $('#tablaDepartamentos').DataTable({
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
        
        this.departamentos.forEach(departamento => {
            // Obtener nombre de la facultad
            const nombreFacultad = this.obtenerNombreFacultad(departamento.idFacultad);
            
            this.dataTable.row.add([
                departamento.nombre,
                nombreFacultad,
                this.crearBotonesAccion(departamento.idDepartamento)
            ]);
        });
        
        this.dataTable.draw();
    }


    // Obtener nombre de facultad por ID
    obtenerNombreFacultad(idFacultad) {
        if (!idFacultad) return "Ninguno";
        
        const facultad = this.facultades.find(f => f.idFacultad == idFacultad);
        return facultad ? facultad.nombre : "Facultad no encontrada";
    }


    // Crear botones de acción para cada fila
    crearBotonesAccion(idDepartamento) {
        return `
            <div class="d-flex justify-content-center gap-1">
                <button class="btn btn-sm btn-outline-warning editar" 
                        data-bs-toggle="modal" 
                        data-bs-target="#modalNuevoDepartamento" 
                        title="Editar" 
                        data-id="${idDepartamento}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger deshabilitar" 
                        data-id="${idDepartamento}" 
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


    // INSERTAR/EDITAR: Guardar departamento
    async guardarDepartamento() {
        if (!this.validarFormulario()) {
            Alerta.advertencia('¡Atención!', 'Complete correctamente el nombre del departamento.');
            return;
        }
        
        try {
            const nombre = $('#nombreDepartamento').val().trim();
            const idFacultad = $('#facultadesDepartamento').val() !== "Ninguno" 
                ? parseInt($('#facultadesDepartamento').val()) 
                : null;
            
            const id = this.modoEdicion ? this.departamentoActual.idDepartamento : this.contadorId++;
            
            if (this.modoEdicion) {
                // EDITAR: Actualizar registro
                const index = this.departamentos.findIndex(d => d.idDepartamento === id);
                if (index !== -1) {
                    this.departamentos[index].nombre = nombre;
                    this.departamentos[index].idFacultad = idFacultad;
                    //await fetchDepartamento.actualizarDepartamentoEnBDD({idDepartamento: index, nombre: nombre, idFacultad: idFacultad});
                    Alerta.exito('Éxito', 'Departamento actualizado correctamente');
                }
            } else {
                // INSERTAR: Crear nuevo registro
                const nuevoDepartamento = new m_departamento(id, nombre, idFacultad);
                this.departamentos.push(nuevoDepartamento);
                // await fetchDepartamento.insertarDepartamentoEnBDD(nuevoDepartamento);
                Alerta.exito('Éxito', 'Departamento creado correctamente');
            }
            
            this.actualizarTabla();
            this.guardarDepartamentosEnSesion();
            this.limpiarFormulario();
            $('#modalNuevoDepartamento').modal('hide');
            
        } catch (error) {
            Alerta.error('Error', `Error al guardar: ${error}`);
        }
    }


    // EDITAR: Preparar formulario para edición
    prepararEdicion(idDepartamento) {
        const departamento = this.departamentos.find(d => d.idDepartamento == idDepartamento);
        
        if (departamento) {
            this.modoEdicion = true;
            this.departamentoActual = departamento;
            
            $('#nombreDepartamento').val(departamento.nombre);
            $('#facultadesDepartamento').val(departamento.idFacultad || "Ninguno");
            $('#modalNuevoDepartamentoLabel').text('Editar departamento');
            
            // Forzar validaciones
            $('#nombreDepartamento').trigger('input');
            $('#facultadesDepartamento').trigger('change');
            
            $('#modalNuevoDepartamento').modal('show');
        }
    }


    // DESHABILITAR: Eliminar departamento
    async deshabilitarDepartamento(idDepartamento) {
        try {
            const confirmacion = await Alerta.confirmar(
                'Confirmar', 
                '¿Está seguro de deshabilitar este departamento?'
            );
            
            if (confirmacion) {
                // DESHABILITAR: Eliminar de la lista
                this.departamentos = this.departamentos.filter(d => d.idDepartamento != idDepartamento);
                this.actualizarTabla();
                this.guardarDepartamentosEnSesion();
                // await fetchDepartamento.deshabilitarDepartamentoEnBDD(idDepartamento);
                Alerta.exito('Éxito', 'Departamento deshabilitado correctamente');
            }
        } catch (error) {
            Alerta.error('Error', `Error al deshabilitar: ${error}`);
        }
    }


    // Limpiar formulario
    limpiarFormulario() {
        $('#nombreDepartamento').val('');
        $('#facultadesDepartamento').val('Ninguno');
        
        this.nombreValido = false;
        this.facultadValida = false;
        
        $('#nombreDepartamento').removeClass('border-success border-danger');
        $('#facultadesDepartamento').removeClass('border-success border-danger');
        
        $('#errorNombreDepartamento').text('').hide();
        $('#errorFacultadesDepartamento').text('').hide();
        
        this.modoEdicion = false;
        this.departamentoActual = null;
        $('#modalNuevoDepartamentoLabel').text('Agregar nuevo departamento');
    }


    // Guardar departamentos en sessionStorage
    guardarDepartamentosEnSesion() {
        try {
            const departamentosData = this.departamentos.map(d => ({
                idDepartamento: d.idDepartamento,
                nombreDepartamento: d.nombre,
                idFacultad: d.idFacultad
            }));
            
            sessionStorage.setItem('departamentos', JSON.stringify(departamentosData));
        } catch (error) {
            Alerta.error('Error', `Fallo al guardar en sessionStorage: ${error}`);
        }
    }
}



document.addEventListener('DOMContentLoaded', function() {
    sesiones.verificarExistenciaSesion();
    
    u_utilesSA.cargarArchivosImportadosHTML('modalCerrarSesion', '.importandoModalCierreSesion');
    u_utilesSA.botonesNavegacionWrapper();
    
    const controladorDepartamentos = new c_departamento();
    
    // Pequeño delay para asegurar que DataTable esté disponible
    setTimeout(() => {
        controladorDepartamentos.inicializar();
    }, 100);
});