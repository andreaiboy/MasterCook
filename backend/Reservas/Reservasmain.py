from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Función para obtener conexión a la base de datos
def get_db_connection():
    return mysql.connector.connect(
        host="db",
        user="root",
        password="12345",
        database="mastercook_db"
    )


@app.route("/reservas/<int:id_usuario>", methods=["GET"])
def obtener_reservas_usuario(id_usuario):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        consulta = """
        SELECT r.id_reserva, c.nombre AS curso, c.fecha, c.precio, r.fecha_reserva,
               e.nombre AS estado, r.pagado, r.metodo_pago, r.codigo_confirmacion
        FROM Reservacion r
        JOIN CURSOS c ON r.id_curso = c.id_curso
        JOIN ESTADOS_RESERVA e ON r.id_estado = e.id_estado
        WHERE r.id_usuario = %s
        ORDER BY r.fecha_reserva DESC;
        """
        cursor.execute(consulta, (id_usuario,))
        reservas = cursor.fetchall()

        cursor.close()
        db.close()

        return jsonify({"reservas": reservas}), 200

    except Exception as e:
        print(f"Error al obtener reservas: {e}")
        return jsonify({"message": "Error al obtener reservas"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
