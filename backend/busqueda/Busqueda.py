from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host=os.environ.get("MYSQL_HOST", "localhost"),
        user=os.environ.get("MYSQL_USER", "root"),
        password=os.environ.get("MYSQL_PASSWORD", ""),
        database=os.environ.get("MYSQL_DATABASE", "mastercook_db")
    )

@app.route("/api/cursos", methods=["GET"])
def get_cursos():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT 
                c.id_curso,
                c.nombre,
                c.fecha,
                c.precio,
                c.cupo,
                c.imagen_url,
                c.descripcion,
                c.instructor,
                c.duracion_horas,
                cat.nombre AS categoria,
                COUNT(r.id_reserva) AS inscritos,
                (c.cupo - COUNT(r.id_reserva)) AS cupos_disponibles
            FROM CURSOS c
            JOIN CATEGORIAS cat ON c.id_categoria = cat.id_categoria
            LEFT JOIN Reservacion r ON c.id_curso = r.id_curso
            LEFT JOIN ESTADOS_RESERVA e ON r.id_estado = e.id_estado
            WHERE e.nombre IS NULL OR e.nombre != 'Cancelada'
            GROUP BY c.id_curso
        """

        cursor.execute(query)
        cursos = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(cursos)
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Error al obtener cursos"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)