from flask import Flask, request, jsonify, session
# Importa el conector de MySQL para Python
import mysql.connector# Importa CORS para permitir peticiones desde otros orígenes (como el frontend en React)
from flask_cors import CORS
# Crea la aplicación Flask
app = Flask(__name__)
# Habilita CORS para toda la app, permitiendo que el frontend consuma este backend
CORS(app)

app.secret_key = "Jujar2307."
# Define una ruta (endpoint) POST en /login
@app.route('/login', methods=['POST'])
def login():
    # Obtiene el JSON del cuerpo de la solicitud (usuario y contraseña)
    data = request.get_json()
    correo = data.get("username")
    password = data.get("password")

    # Se conecta a la base de datos MySQL ejecutándose en el contenedor llamado 'db'
    db = mysql.connector.connect(
        host="db",
        user="root",
        password="12345",
        database="mastercook_db"
    )
    # Crea un cursor que devuelve resultados como diccionarios
    cursor = db.cursor(dictionary=True)
    # Ejecuta una consulta SQL para buscar un usuario con ese username y password
    cursor.execute("SELECT * FROM USUARIO WHERE correo=%s AND contrasena=%s", (correo, password))
    # Obtiene el primer resultado (si existe)
    user = cursor.fetchone()
    cursor.close()
    db.close()  
    # Si encontró un usuario, devuelve mensaje exitoso
    if user:
        session['id_usuario'] = user['id_usuario']
        return jsonify({"message": "Login exitoso"})
    else:
    # Si no lo encontró, devuelve error 401 (no autorizado)
        return jsonify({"message": "Credenciales incorrectas"}), 401
    # Hace que la app se ejecute cuando este archivo se ejecuta directamente
if __name__ == '__main__':
# Ejecuta el servidor Flask accesible desde cualquier IP (útil en Docker)
    app.run(host='0.0.0.0', port=5000)