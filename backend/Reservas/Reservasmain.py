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

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    nombre = data.get("nombre")
    usuario = data.get("usuario")
    correo = data.get("email")
    contrasena = data.get("password")

    if not all([nombre, usuario, correo, contrasena]):
        return jsonify({"message": "Todos los campos son obligatorios"}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor()

        cursor.execute("SELECT id_usuario FROM USUARIO WHERE nombre_usuario = %s OR correo = %s", (usuario, correo))
        if cursor.fetchone():
            return jsonify({"message": "Usuario o correo ya registrados"}), 409

        cursor.execute(
            "INSERT INTO USUARIO (nombre, nombre_usuario, correo, contrasena) VALUES (%s, %s, %s, %s)",
            (nombre, usuario, correo, contrasena)
        )
        db.commit()

        cursor.close()
        db.close()
        return jsonify({"message": "Registro exitoso"}), 201

    except Exception as e:
        print(f"Error en registro: {e}")
        return jsonify({"message": "Error interno del servidor"}), 500

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    usuario = data.get("usuario")
    contrasena = data.get("password")

    if not all([usuario, contrasena]):
        return jsonify({"message": "Campos incompletos"}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute(
            "SELECT id_usuario, nombre, nombre_usuario FROM USUARIO WHERE nombre_usuario = %s AND contrasena = %s",
            (usuario, contrasena)
        )
        user = cursor.fetchone()

        cursor.close()
        db.close()

        if user:
            return jsonify({"message": "Login exitoso", "user": user}), 200
        else:
            return jsonify({"message": "Credenciales incorrectas"}), 401

    except Exception as e:
        print(f"Error en login: {e}")
        return jsonify({"message": "Error interno del servidor"}), 500

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
