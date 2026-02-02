export class m_noticia
{
    constructor(id, asunto, descripcion, tipo, rutaImagen){
        this.id = id;
        this.asunto = asunto;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.rutaImagen = rutaImagen;
    }


    
    // metodo que devuelve la version corta de la noticia
    resumen(longitud = 100){
        return this.descripcion.length > longitud ? 
            this.descripcion.substring(0, longitud) + '...' : this.descripcion;
    }



    // lista estatica de noticias
    static noticiasEstaticas()
    {
        let listaNoticias = [];

        for(let i=1; i<=100; i++){
            listaNoticias.push(
                new m_noticia(`${i}`, `Noticia numero ${i}`, 
                `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat quaerat, commodi architecto voluptatem amet inventore 
                esse hic earum. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                mollitia recusandae! Repudiandae nisi temporibus aspernatur cupiditate, eveniet, expedita eius ex minima officia quia 
                tenetur eligendi!`, "Comunicado", "/guniversidadfrontend/public/img/IMG-20251114-WA0022-copia.jpg")
            )
        }
        return listaNoticias;
    }


    
    // metodo para cargar las noticias recientes
    static listarNoticiasRecientes()
    {
        let lista = this.noticiasEstaticas(); 
        let lista5recientes = [];

        lista.forEach(noticia => {
            if (noticia.id > 0 && noticia.id < 6) {
                lista5recientes.push(noticia)
            }
        })
        return lista5recientes;
    }
}