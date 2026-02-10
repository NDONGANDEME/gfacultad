import { sesiones } from "../../public/core/sesiones.js"
import { u_utilesSA } from "../utilidades/u_utilesSA.js";


export class c_formacion
{
    static manejoSubidaArchivos()
    {
        $(document).ready(function() {
            // ============================================
            // FUNCIONES DE UTILIDAD
            // ============================================
            function formatearTamanio(bytes) {
                if (bytes === 0) return '0 Bytes';
                const k = 1024;
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
            }
            
            function obtenerIconoArchivo(tipo, nombre) {
                const extension = nombre.split('.').pop().toLowerCase();
                
                if (tipo.includes('pdf') || extension === 'pdf') {
                    return '<i class="fas fa-file-pdf text-danger"></i>';
                } else if (tipo.includes('image') || ['png', 'jpg', 'jpeg', 'gif'].includes(extension)) {
                    return '<i class="fas fa-image text-success"></i>';
                } else if (tipo.includes('word') || extension === 'doc' || extension === 'docx') {
                    return '<i class="fas fa-file-word text-primary"></i>';
                } else {
                    return '<i class="fas fa-file text-secondary"></i>';
                }
            }
            
            function mostrarPrevisualizacionArchivos(archivos) {
                const preview = $('#previewArchivos');
                preview.empty();
                
                archivos.forEach((archivo, index) => {
                    const icono = obtenerIconoArchivo(archivo.type, archivo.name);
                    const tamaño = formatearTamanio(archivo.size);
                    
                    const item = $(`
                        <div class="file-preview-item d-flex align-items-center mb-2" data-index="${index}">
                            <div class="file-icon" style="font-size: 20px;">
                                ${icono}
                            </div>
                            <div class="flex-grow-1">
                                <div class="file-name text-truncate" style="max-width: 300px;">
                                    ${archivo.name}
                                </div>
                                <div class="file-size">
                                    ${tamaño}
                                </div>
                            </div>
                            <div class="text-muted ml-2">
                                <small>${archivo.type || 'Tipo desconocido'}</small>
                            </div>
                            <button type="button" class="btn btn-sm btn-outline-danger ml-2 btn-eliminar-archivo" 
                                    data-index="${index}" title="Quitar archivo">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `);
                    
                    preview.append(item);
                });
                
                $('#previewContainer').show();
            }
            
            function actualizarContadorArchivos(cantidad) {
                const texto = cantidad === 1 ? '1 archivo seleccionado' : `${cantidad} archivos seleccionados`;
                $('#contadorArchivos').text(texto);
                
                if (cantidad >= 1) {
                    $('#fileDropArea').removeClass('border-primary').addClass('bg-success text-white');
                } else {
                    $('#fileDropArea').removeClass('bg-success text-white').addClass('border-primary');
                }
            }
            
            // ============================================
            // MANEJO DE ARCHIVOS - MEJORADO
            // ============================================
            let archivosSeleccionados = [];
            
            // Función para manejar archivos seleccionados
            function manejarArchivosSeleccionados(files) {
                archivosSeleccionados = Array.from(files);
                
                // Mostrar previsualización
                mostrarPrevisualizacionArchivos(archivosSeleccionados);
                
                // Actualizar contador
                actualizarContadorArchivos(archivosSeleccionados.length);
            }
            
            // Evento para el área de arrastrar y soltar
            $('#fileDropArea').click(function() {
                $('#fileInput').click();
            });
            
            // Evento cuando se seleccionan archivos
            $('#fileInput').change(function() {
                manejarArchivosSeleccionados(this.files);
            });
            
            // Arrastrar y soltar
            $('#fileDropArea').on('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).addClass('border-warning bg-warning-light');
            });
            
            $('#fileDropArea').on('dragleave', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).removeClass('border-warning bg-warning-light');
            });
            
            $('#fileDropArea').on('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).removeClass('border-warning bg-warning-light');
                
                const files = e.originalEvent.dataTransfer.files;
                manejarArchivosSeleccionados(files);
            });
            
            // Eliminar archivo individual de la previsualización
            $(document).on('click', '.btn-eliminar-archivo', function() {
                const index = $(this).data('index');
                archivosSeleccionados.splice(index, 1);
                
                // Volver a mostrar la previsualización
                mostrarPrevisualizacionArchivos(archivosSeleccionados);
                actualizarContadorArchivos(archivosSeleccionados.length);
            });
            
            // Limpiar todos los archivos
            $('#btnLimpiarArchivos').click(function() {
                archivosSeleccionados = [];
                $('#previewArchivos').empty();
                $('#previewContainer').hide();
                actualizarContadorArchivos(0);
                $('#fileInput').val('');
            });
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión
    sesiones.verificarExistenciaSesion();

    // Cargar componentes
    u_utilesSA.cargarArchivosImportadosHTML('modalCerrarSesion', '.importandoModalCierreSesion');
    u_utilesSA.manejoTabla('#tablaFormaciones');
    u_utilesSA.botonesNavegacionWrapper();
    c_formacion.manejoSubidaArchivos();
});