# Utiliza como base la imagen oficial de Python versión 3.10
FROM python:3.10-alpine
WORKDIR /Reservasmain
COPY . /Reservasmain 
RUN pip install --no-cache-dir -r requirements.txt 
CMD ["python", "app.py"]
