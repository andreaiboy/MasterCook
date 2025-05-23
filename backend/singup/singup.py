from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    nombre = data.get("nombre")
    usuario = data.get("usuario")
    correo = data.get("email")
    contrasena = data.get("password")

    # Validaciones básicas
    if not all([nombre, usuario, correo, contrasena]):
        return jsonify({"message": "Todos los campos son obligatorios"}), 400

    try:
        # Conexión a MySQL (ajusta si cambian estos datos)
        db = mysql.connector.connect(
            host="db",
            user="root",
            password="12345",
            database="mastercook_db"
        )
        cursor = db.cursor()

        # Verificar si el usuario o correo ya existe
        cursor.execute("SELECT id_usuario FROM USUARIO WHERE nombre_usuario = %s OR correo = %s", (usuario, correo))
        if cursor.fetchone():
            return jsonify({"message": "Usuario o correo ya registrados"}), 409

        # Insertar nuevo usuario
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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5005)
