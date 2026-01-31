import { m_noticia } from "../modelo/m_noticia.js";
import { Alerta } from "../utilidades/u_alertas.js";
import { u_utiles } from "../utilidades/u_utiles.js";


export class c_noticia
{
    // Variable estática para almacenar las noticias
    static listaNoticias = m_noticia.noticiasEstaticas();

    // Variables para la paginación
    static noticiasPorPagina = 21;
    static paginaActual = 1;
    static totalPaginas = 1;


    
    // METODO PRINCIPAL DE INICIALIZACIÓN
    static inicializar() {
        // 1. Cargar noticias
        this.cargarNoticias();
        
        // 2. Inicializar eventos dinámicos
        this.inicializarEventos();
    }


    // Método para cargar noticias
    static async cargarNoticias() {
        try {
            // Calcular total de páginas
            this.totalPaginas = Math.ceil(this.listaNoticias.length / this.noticiasPorPagina);
            
            // Verificar si estamos en una página que necesita mostrar tarjetas
            const contTarjetaNoticia = document.querySelector('#contTarjetaNoticia');
            if (contTarjetaNoticia) {
                // Obtener página de la URL si existe
                const urlParams = new URLSearchParams(window.location.search);
                const paginaParam = urlParams.get('pagina');
                if (paginaParam) {
                    this.paginaActual = parseInt(paginaParam);
                    if (this.paginaActual < 1) this.paginaActual = 1;
                    if (this.paginaActual > this.totalPaginas) this.paginaActual = this.totalPaginas;
                }
                
                this.renderizarTarjetas();
                this.renderizarPaginacion();
            }
            
            // Verificar si estamos en una página que necesita carousel
            const carroNoticias = document.querySelector('.carroNoticias');
            if (carroNoticias) {
                this.renderizarCarousel();
            }
        } catch(error) {
            Alerta.error('Error', `Fallo al cargar noticias. (c_noticia linea:56): ${error}`);
        }
    }



    // Método para renderizar tarjetas con paginación
    static renderizarTarjetas() {
        const contTarjetaNoticia = document.querySelector('#contTarjetaNoticia');
        if (!contTarjetaNoticia) {
            Alerta.informacion('Alerta', 'No existe el contTarjetaNoticia (c_noticia linea:66)');
            return;
        }
        
        // Limpiar contenedor
        contTarjetaNoticia.innerHTML = '';
        
        // Calcular índices de las noticias a mostrar
        const inicio = (this.paginaActual - 1) * this.noticiasPorPagina;
        const fin = inicio + this.noticiasPorPagina;
        const noticiasPagina = this.listaNoticias.slice(inicio, fin);
        
        if (noticiasPagina.length === 0) {
            contTarjetaNoticia.innerHTML = `
                <div class="text-center py-5">
                    <h3 class="text-muted">No hay noticias para mostrar</h3>
                    <p class="text-muted">Intenta en otra página</p>
                </div>
            `;
            return;
        }
        
        // Crear fila contenedora
        const row = document.createElement('div');
        row.className = 'row g-4';
        
        // Renderizar cada noticia de la página actual
        noticiasPagina.forEach(noticia => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-lg-4 col-md-6 col-sm-6 col-12';
            colDiv.innerHTML = this.crearTarjetaNoticia(noticia);
            row.appendChild(colDiv);
        });
        
        contTarjetaNoticia.appendChild(row);
        
        // Añadir contador de noticias
        const contadorDiv = document.createElement('div');
        contadorDiv.className = 'mt-3 text-center text-muted';
        contadorDiv.innerHTML = `
            <small>
                Mostrando ${inicio + 1} - ${Math.min(fin, this.listaNoticias.length)} 
                de ${this.listaNoticias.length} noticias
                (Página ${this.paginaActual} de ${this.totalPaginas})
            </small>
        `;
        contTarjetaNoticia.appendChild(contadorDiv);
    }



    // Método para renderizar carousel
    static renderizarCarousel() {
        const carroNoticias = document.querySelector('.carroNoticias');
        if (!carroNoticias) Alerta.informacion('Alerta', 'No existe el carroNoticias (c_noticia linea:120)');
        
        // Limpiar carousel
        carroNoticias.innerHTML = '';
        
        // Renderizar cada item del carousel
        let listaReciente = m_noticia.listarNoticiasRecientes();
        listaReciente.forEach(noticia => {
            this.crearTarjetasDelCaroussel(noticia);
        });
    }



    // FUNCIÓN AUXILIAR PARA INICIALIZAR TODOS LOS EVENTOS
    static inicializarEventos() {
        // Eventos para botones "Leer más"
        this.inicializarEventosLeerMas();
        
        // Manejar el botón de navegación atrás/adelante
        window.addEventListener('popstate', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const paginaParam = urlParams.get('pagina');
            if (paginaParam) {
                const nuevaPagina = parseInt(paginaParam);
                if (!isNaN(nuevaPagina) && nuevaPagina !== this.paginaActual) {
                    this.paginaActual = nuevaPagina;
                    this.renderizarTarjetas();
                    this.renderizarPaginacion();
                }
            }
        });
    }



    // Inicializar eventos para botones "Leer más"
    static inicializarEventosLeerMas() {
        document.addEventListener('click', (event) => {
            // Verificar si se hizo clic en un botón "Leer más"
            const boton = event.target.closest('.btnLeerMasNoticias');

            if (boton) {
                event.preventDefault();
                event.stopPropagation(); // Evitar propagación

                const id = parseInt(boton.getAttribute('data-id'));
                const noticia = this.listaNoticias.find(n => n.id == id);
                
                if (noticia) {
                    this.detallesTarjetaNoticia(id, noticia);
                }
            }
            
            // Verificar si se hizo clic en botón "Ver más" del carousel
            const btnVerNoticias = event.target.closest('.btnVerNoticias');
            if (btnVerNoticias && btnVerNoticias.dataset.id) {
                const id = parseInt(btnVerNoticias.dataset.id);
                this.irANoticiaPorID(id, btnVerNoticias);
            }
        });
    }



    // metodo para la creacion de las tarjetas de noticias recientes
    static crearTarjetasDelCaroussel(objeto){
        const carroNoticias = document.querySelector('.carroNoticias');
        if (!carroNoticias) return;
        
        const div = document.createElement('div');
        
        if(objeto.id == 1){
            div.classList.add('carousel-item', 'active');
        }else{
            div.classList.add('carousel-item');
        }

        div.innerHTML = `
            <img src="${objeto.rutaImagen}" class="d-block w-100 img-fluid" style="opacity: 0.7;" alt="Imagen">
            <div class="carousel-caption mx-auto col-sm-10 col-md-8 col-lg-6 order-lg-last d-md-block">
                <div class="fs-2 text-white">${objeto.asunto}</div>
            </div>
        `;

        // Crear botón "Ver más"
        const btnVerNoticia = document.createElement('button');
        btnVerNoticia.classList.add('btn', 'btn-sm', 'btn-outline-warning', 'btnVerNoticias');
        btnVerNoticia.innerHTML = 'Ver más';
        btnVerNoticia.dataset.id = objeto.id; // Guardar ID en dataset

        // Añadir botón al carousel-caption
        const caption = div.querySelector('.carousel-caption');
        if (caption) {
            caption.appendChild(btnVerNoticia);
        }
        
        carroNoticias.appendChild(div);
    }



    // metodo de redireccion por id
    static irANoticiaPorID(idNoticia){
        // Esta función ahora solo redirige, el evento está en inicializarEventosLeerMas
        window.location.href = `/guniversidadfrontend/public/template/html/noticias.html?id=${idNoticia}`;
    }



    // En el método crearTarjetaNoticia, cambia las clases de las columnas:
    static crearTarjetaNoticia(objeto) {
        return `
            <div class="card h-100 shadow-sm">
                <img class="card-img-top imgNoticias" src="${objeto.rutaImagen}" alt="Imagen">
                <div class="card-body d-flex flex-column">
                    <div class="card-header bg-transparent border-0 px-0 pt-0">
                        <h5 class="card-title">${objeto.asunto}</h5>
                    </div>
                    <p class="card-text flex-grow-1">${objeto.resumen(100)}</p>
                    <div class="card-footer bg-transparent border-top d-flex justify-content-between align-items-center mt-auto">
                        <span class="badge bg-warning text-dark">${objeto.tipo}</span>
                        <button class="btnLeerMasNoticias btn btn-sm btn-outline-warning" data-id="${objeto.id}"> 
                            Leer más
                        </button>
                    </div>
                </div>
            </div>
        `;
    }



    // Método para mostrar los detalles de las tarjetas
    static detallesTarjetaNoticia(id, noticia) {
        // Obtener elementos del modal
        const modal = document.getElementById('modalNoticias');
        const titulo = document.getElementById('tituloNoticiaDetalle');
        const contenido = document.getElementById('contenidoNoticiadetalle');
        
        if (!modal || !titulo || !contenido) {
            console.error('Elementos del modal no encontrados');
            return;
        }
        
        // Llenar el modal con la información de la noticia
        titulo.textContent = noticia.asunto;
        contenido.textContent = noticia.descripcion;
        
        // Asegurarse de que el modal tenga el data-id
        modal.setAttribute('data-id', id);
        
        // Mostrar el modal
        this.inicializarModal();
    }



    // Método para inicializar el modal
    static inicializarModal() {
        const modal = document.getElementById('modalNoticias');
        const cerrar = document.getElementById('cerrarModal');
        
        if (!modal || !cerrar) return;
        
        // Mostrar el modal con animación
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Configurar evento para cerrar el modal
        cerrar.onclick = () => {
            this.cerrarModalConAnimacion();
        };
        
        // Cerrar al hacer clic fuera del contenido
        modal.onclick = (event) => {
            if (event.target === modal) {
                this.cerrarModalConAnimacion();
            }
        };
    }



    static cerrarModalConAnimacion() {
        const modal = document.getElementById('modalNoticias');
        if (!modal) return;
        
        // Añadir clase de animación de salida
        modal.classList.add('cerrando');
        
        // Esperar a que termine la animación antes de ocultar
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('cerrando');
            document.body.style.overflow = 'auto'; // Restaurar scroll
        }, 300);
    }



    // Método para renderizar la paginación
    static renderizarPaginacion() {
        const contPaginacion = document.querySelector('#contPaginacion');
        if (!contPaginacion || this.totalPaginas <= 1) {
            if (contPaginacion) contPaginacion.innerHTML = '';
            return;
        }
        
        // Limpiar contenedor
        contPaginacion.innerHTML = '';
        
        // Crear elemento ul para la paginación
        const ulPaginacion = document.createElement('ul');
        ulPaginacion.className = 'pagination';
        
        // Botón "Anterior"
        const liAnterior = document.createElement('li');
        liAnterior.className = `page-item ${this.paginaActual === 1 ? 'disabled' : ''}`;
        liAnterior.innerHTML = `
            <a class="page-link" href="#" data-pagina="${this.paginaActual - 1}">
                <span aria-hidden="true">&laquo;</span>
            </a>
        `;
        ulPaginacion.appendChild(liAnterior);
        
        // Calcular qué números de página mostrar
        let inicioPagina = Math.max(1, this.paginaActual - 2);
        let finPagina = Math.min(this.totalPaginas, this.paginaActual + 2);
        
        // Ajustar si estamos cerca del inicio
        if (inicioPagina === 1) {
            finPagina = Math.min(this.totalPaginas, inicioPagina + 4);
        }
        
        // Ajustar si estamos cerca del final
        if (finPagina === this.totalPaginas) {
            inicioPagina = Math.max(1, finPagina - 4);
        }
        
        // Primera página si no está en el rango
        if (inicioPagina > 1) {
            const liPrimera = document.createElement('li');
            liPrimera.className = 'page-item';
            liPrimera.innerHTML = `<a class="page-link" href="#" data-pagina="1">1</a>`;
            ulPaginacion.appendChild(liPrimera);
            
            if (inicioPagina > 2) {
                const liEllipsis = document.createElement('li');
                liEllipsis.className = 'page-item disabled';
                liEllipsis.innerHTML = `<span class="page-link">...</span>`;
                ulPaginacion.appendChild(liEllipsis);
            }
        }
        
        // Números de página
        for (let i = inicioPagina; i <= finPagina; i++) {
            const liPagina = document.createElement('li');
            liPagina.className = `page-item ${i === this.paginaActual ? 'active' : ''}`;
            liPagina.innerHTML = `<a class="page-link" href="#" data-pagina="${i}">${i}</a>`;
            ulPaginacion.appendChild(liPagina);
        }
        
        // Última página si no está en el rango
        if (finPagina < this.totalPaginas) {
            if (finPagina < this.totalPaginas - 1) {
                const liEllipsis = document.createElement('li');
                liEllipsis.className = 'page-item disabled';
                liEllipsis.innerHTML = `<span class="page-link">...</span>`;
                ulPaginacion.appendChild(liEllipsis);
            }
            
            const liUltima = document.createElement('li');
            liUltima.className = 'page-item';
            liUltima.innerHTML = `<a class="page-link" href="#" data-pagina="${this.totalPaginas}">${this.totalPaginas}</a>`;
            ulPaginacion.appendChild(liUltima);
        }
        
        // Botón "Siguiente"
        const liSiguiente = document.createElement('li');
        liSiguiente.className = `page-item ${this.paginaActual === this.totalPaginas ? 'disabled' : ''}`;
        liSiguiente.innerHTML = `
            <a class="page-link" href="#" data-pagina="${this.paginaActual + 1}">
                <span aria-hidden="true">&raquo;</span>
            </a>
        `;
        ulPaginacion.appendChild(liSiguiente);
        
        contPaginacion.appendChild(ulPaginacion);
        
        this.inicializarEventosPaginacion();
    }



    // Método para inicializar eventos de paginación
    static inicializarEventosPaginacion() {
        const contPaginacion = document.querySelector('#contPaginacion');
        if (!contPaginacion) return;
        
        contPaginacion.addEventListener('click', (event) => {
            event.preventDefault();
            
            const link = event.target.closest('.page-link');
            if (!link || link.closest('.disabled')) return;
            
            const nuevaPagina = parseInt(link.getAttribute('data-pagina'));
            if (!isNaN(nuevaPagina) && nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
                this.cambiarPagina(nuevaPagina);
            }
        });
    }



    // Método para cambiar de página
    static cambiarPagina(nuevaPagina) {
        if (nuevaPagina === this.paginaActual) return;
        
        this.paginaActual = nuevaPagina;
        
        // Actualizar URL sin recargar la página
        const url = new URL(window.location);
        url.searchParams.set('pagina', nuevaPagina);
        window.history.pushState({}, '', url);
        
        // Re-renderizar tarjetas y paginación
        this.renderizarTarjetas();
        this.renderizarPaginacion();
        
        // Desplazarse suavemente al inicio de las noticias
        document.querySelector('#contTarjetaNoticia').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}





document.addEventListener('DOMContentLoaded', async function()
{
    c_noticia.inicializar();

    u_utiles.botonesNavegacion();

    if (document.querySelector('.importandoNavegacion')) {
        await u_utiles.cargarArchivosImportadosHTML('Navegacion', '.importandoNavegacion');
    }

    if (document.querySelector('.importandoFooter')) {
        await u_utiles.cargarArchivosImportadosHTML('Footer', '.importandoFooter');
    }
});