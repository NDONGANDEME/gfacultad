export class u_alertas {
    /**
     * Muestra un modal de carga con redirección automática
     * @param {number} tiempo - Tiempo en milisegundos
     * @param {string} mensaje - Mensaje a mostrar
     * @param {string} url - URL para redireccionar
     */
    static cargarSimple(tiempo = 3000, mensaje, url) {
        // Crear estructura del modal
        const modalId = 'loadingModal' + Date.now();
        
        const modalHTML = `
            <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true" 
                 data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content border-0 shadow-lg">
                        <div class="modal-body text-center p-5">
                            <!-- Spinner de Bootstrap mejorado -->
                            <div class="mb-4">
                                <div class="spinner-border text-primary" style="width: 70px; height: 70px;" role="status">
                                    <span class="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                            
                            <!-- Mensaje -->
                            <h5 class="text-dark mb-3 fw-semibold">${mensaje}</h5>
                            
                            <!-- Barra de progreso mejorada -->
                            <div class="progress" style="height: 6px;">
                                <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
                                    role="progressbar" 
                                    style="width: 100%" 
                                    aria-valuenow="100" 
                                    aria-valuemin="0" 
                                    aria-valuemax="100">
                                </div>
                            </div>
                            
                            <!-- Texto adicional opcional -->
                            <small class="text-muted d-block mt-3">
                                Redireccionando automáticamente...
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insertar modal en el DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Mostrar modal
        const modalElement = document.getElementById(modalId);
        const loadingModal = new bootstrap.Modal(modalElement, {
            backdrop: 'static',
            keyboard: false
        });
        
        // Forzar a que el modal se muestre sin animación de entrada lenta
        modalElement.classList.add('show');
        modalElement.style.display = 'block';
        modalElement.setAttribute('aria-hidden', 'false');
        
        // Añadir backdrop manualmente
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
        
        // Configurar redirección
        setTimeout(() => {
            // Remover backdrop
            backdrop.remove();
            
            // Ocultar modal
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            modalElement.setAttribute('aria-hidden', 'true');
            
            // Remover elementos del DOM
            setTimeout(() => {
                modalElement.remove();
                if (url) {
                    window.location.href = url;
                }
            }, 300);
        }, tiempo);
    }
    
    /**
     * Muestra una notificación toast (útil para mensajes no intrusivos)
     * @param {string} tipo - success, error, warning, info
     * @param {string} mensaje - Mensaje a mostrar
     * @param {number} duracion - Duración en milisegundos
     */
    static notificar(tipo = 'info', mensaje, duracion = 5000) {
        const toastId = 'toast-' + Date.now();
        const tipoBootstrap = this._mapearTipoBootstrap(tipo);
        const icono = this._obtenerIcono(tipo);
        
        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center border-0 text-bg-${tipoBootstrap}" 
                 role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body p-3">
                        <div class="d-flex align-items-center">
                            <div class="me-3 fs-4">
                                ${icono}
                            </div>
                            <div class="flex-grow-1">
                                ${mensaje}
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                            data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;
        
        // Crear contenedor de toasts si no existe
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
            toastContainer.style.zIndex = '999999';
            document.body.appendChild(toastContainer);
        }
        
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: duracion
        });
        
        toast.show();
        
        // Remover del DOM cuando se oculte
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
    
    // Métodos auxiliares
    static _mapearTipoBootstrap(tipo) {
        const mapa = {
            success: 'success',
            error: 'danger',
            warning: 'warning',
            info: 'info',
            question: 'primary'
        };
        return mapa[tipo] || 'primary';
    }
    
    static _obtenerIcono(tipo, grande = false) {
        const iconos = {
            success: `<i class="fas fa-check-circle${grande ? ' fa-2x' : ''}"></i>`,
            error: `<i class="fas fa-times-circle${grande ? ' fa-2x' : ''}"></i>`,
            warning: `<i class="fas fa-exclamation-triangle${grande ? ' fa-2x' : ''}"></i>`,
            info: `<i class="fas fa-info-circle${grande ? ' fa-2x' : ''}"></i>`,
            question: `<i class="fas fa-question-circle${grande ? ' fa-2x' : ''}"></i>`
        };
        return iconos[tipo] || iconos.info;
    }
}



export const Alerta = {
    /**
     * Muestra una alerta personalizada
     * @param {string} tipo - success, error, warning, info, question
     * @param {string} titulo - Título de la alerta
     * @param {string} texto - Texto adicional (opcional)
     * @param {Object} opciones - Opciones de configuración
     * @returns {Promise} Promise que resuelve con la acción del usuario
    */

    mostrar: function(tipo, titulo, texto = '', opciones = {}) 
    {
        return new Promise((resolve) => {
            const alertaId = 'alerta-' + Date.now();
            const tipoBootstrap = this._mapearTipoBootstrap(tipo);
            const icono = this._obtenerIcono(tipo);
            
            // Configuración por defecto
            const config = {
                textoConfirmar: 'Aceptar',
                textoCancelar: 'Cancelar',
                mostrarCancelar: tipo === 'question',
                temporizador: null,
                ...opciones
            };
            
            // Crear alerta con Bootstrap
            const alertaHTML = `
                <div id="${alertaId}" class="modal fade" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow-lg">
                            <div class="modal-body p-4">
                                <!-- Encabezado -->
                                <div class="text-center mb-3">
                                    <div class="text-${tipoBootstrap} mb-3" style="font-size: 3rem;">
                                        ${icono}
                                    </div>
                                    <h4 class="modal-title text-dark fw-bold mb-2">${titulo}</h4>
                                    ${texto ? `<p class="text-muted mb-0">${texto}</p>` : ''}
                                </div>
                                
                                <!-- Botones -->
                                <div class="d-flex justify-content-center gap-3 mt-4">
                                    ${config.mostrarCancelar ? 
                                        `<button type="button" class="btn btn-outline-secondary btn-cancel" 
                                                style="min-width: 100px;">
                                            ${config.textoCancelar}
                                        </button>` : ''}
                                    <button type="button" class="btn btn-${tipoBootstrap} btn-confirm" 
                                            style="min-width: 100px;">
                                        ${config.textoConfirmar}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Añadir al DOM
            document.body.insertAdjacentHTML('beforeend', alertaHTML);
            const alertaElement = document.getElementById(alertaId);
            const modal = new bootstrap.Modal(alertaElement);
            
            // Configurar eventos
            const btnConfirm = alertaElement.querySelector('.btn-confirm');
            const btnCancel = alertaElement.querySelector('.btn-cancel');
            
            const cerrarYResolver = (resultado) => {
                modal.hide();
                setTimeout(() => {
                    alertaElement.remove();
                    resolve(resultado);
                }, 300);
            };
            
            btnConfirm.addEventListener('click', () => cerrarYResolver(true));
            
            if (btnCancel) {
                btnCancel.addEventListener('click', () => cerrarYResolver(false));
            }
            
            // Cerrar al hacer clic fuera
            alertaElement.addEventListener('hidden.bs.modal', () => {
                cerrarYResolver(false);
            });
            
            // Temporizador automático
            if (config.temporizador) {
                setTimeout(() => cerrarYResolver(null), config.temporizador);
            }
            
            // Mostrar alerta
            modal.show();
        });
    },
    
    // Métodos rápidos (sugar syntax)
    exito: function(titulo, texto = '', opciones = {}) {
        return this.mostrar('success', titulo, texto, opciones);
    },
    
    error: function(titulo, texto = '', opciones = {}) {
        return this.mostrar('error', titulo, texto, opciones);
    },
    
    advertencia: function(titulo, texto = '', opciones = {}) {
        return this.mostrar('warning', titulo, texto, opciones);
    },
    
    informacion: function(titulo, texto = '', opciones = {}) {
        return this.mostrar('info', titulo, texto, opciones);
    },
    
    pregunta: function(titulo, texto = '', opciones = {}) {
        const opcionesDefault = {
            textoConfirmar: 'Sí',
            textoCancelar: 'No',
            mostrarCancelar: true,
            ...opciones
        };
        return this.mostrar('question', titulo, texto, opcionesDefault);
    },
    
    confirmar: function(titulo, texto = '', opciones = {}) {
        return this.pregunta(titulo, texto, opciones);
    },
    
    // Métodos auxiliares internos
    _mapearTipoBootstrap: function(tipo) {
        const mapa = {
            success: 'success',
            error: 'danger',
            warning: 'warning',
            info: 'info',
            question: 'primary'
        };
        return mapa[tipo] || 'primary';
    },
    
    _obtenerIcono: function(tipo) {
        const iconos = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-times-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>',
            question: '<i class="fas fa-question-circle"></i>'
        };
        return iconos[tipo] || iconos.info;
    }
};