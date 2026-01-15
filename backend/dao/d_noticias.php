<?php

require_once __DIR__ . "/../utilidades/u_conexion.php";

class NoticiasDao
{
    //FUNCIÓN PARA OBTTENER TODAS LAS NOTICIAS
    public static function listarNoticias(): array
    {
        try {
            $instanciaConexion = ConexionUtil::conectar();

            $sql = "SELECT * FROM noticias ORDER BY fecha_creacion DESC";
            $stmt = $instanciaConexion->prepare($sql);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return [];
        }
    }

    //FUNCIÓN PARA OBTTENER LAS 5 NOTICIAS MÁS RECIENTES
    public static function obtenerNoticiasRecientes()
    {
        try {
            $instanciaConexion = ConexionUtil::conectar();

            $sql = "SELECT * FROM noticias ORDER BY fecha_creacion DESC LIMIT 5";
            $stmt = $instanciaConexion->prepare($sql);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return [];
        }
    }

    //FUNCIÓN PARA OBTTENER UNA NOTICIA POR ID
    public static function obtenerNoticiaPorId(int $id)
    {
        try {
            $instanciaConexion = ConexionUtil::conectar();

            $sql = "SELECT * FROM noticias WHERE id = :id";
            $stmt = $instanciaConexion->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            $noticia = $stmt->fetch(PDO::FETCH_ASSOC);

            return $noticia;
        } catch (PDOException $e) {
            return null;
        }
    }
}
