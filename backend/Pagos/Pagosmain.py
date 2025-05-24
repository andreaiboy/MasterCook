from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route("/pagos-pendientes/<int:id_usuario>", methods=["GET"])
def obtener_reservas_pendientes_pago(id_usuario):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        consulta = """
        SELECT 
            r.id_reserva,
            c.nombre AS curso,
            c.fecha,
            c.precio,
            r.fecha_reserva,
            r.codigo_confirmacion
        FROM Reservacion r
        JOIN CURSOS c ON r.id_curso = c.id_curso
        JOIN ESTADOS_RESERVA e ON r.id_estado = e.id_estado
        WHERE r.id_usuario = %s
          AND e.nombre = 'Pendiente'
        ORDER BY r.fecha_reserva DESC;
        """
        cursor.execute(consulta, (id_usuario,))
        pendientes = cursor.fetchall()

        cursor.close()
        db.close()

        return jsonify({"reservas_pendientes_pago": pendientes}), 200

    except Exception as e:
        print(f"Error al obtener reservas pendientes: {e}")
        return jsonify({"message": "Error al obtener reservas pendientes"}), 500


@app.route("/realizar-pago", methods=["POST"])
def realizar_pago():
    data = request.get_json()

    id_reserva = data.get("id_reserva")
    metodo_pago = data.get("metodo_pago")

    if not id_reserva or not metodo_pago:
        return jsonify({"message": "Faltan datos necesarios"}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        # Verificar que la reserva existe y no está pagada
        cursor.execute("""
            SELECT r.id_reserva, c.precio
            FROM Reservacion r
            JOIN CURSOS c ON r.id_curso = c.id_curso
            WHERE r.id_reserva = %s AND r.pagado = FALSE
        """, (id_reserva,))
        reserva = cursor.fetchone()

        if not reserva:
            return jsonify({"message": "Reserva no encontrada o ya pagada"}), 404

        monto = reserva["precio"]
        fecha_pago = datetime.now()

        # Insertar en la tabla PAGOS
        cursor.execute("""
            INSERT INTO PAGOS (id_reserva, monto, fecha_pago, metodo_pago)
            VALUES (%s, %s, %s, %s)
        """, (id_reserva, monto, fecha_pago, metodo_pago))

        # Actualizar la reserva: marcar como pagada y cambiar el estado a "Pagada"
        cursor.execute("""
            UPDATE Reservacion
            SET pagado = TRUE,
                metodo_pago = %s,
                id_estado = (SELECT id_estado FROM ESTADOS_RESERVA WHERE nombre = 'Pagada')
            WHERE id_reserva = %s
        """, (metodo_pago, id_reserva))

        db.commit()
        cursor.close()
        db.close()

        return jsonify({"message": "Pago registrado con éxito"}), 200

    except Exception as e:
        print(f"Error al registrar pago: {e}")
        return jsonify({"message": "Error al registrar el pago"}), 500

