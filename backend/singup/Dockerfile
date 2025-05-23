# Utiliza como base la imagen oficial de Python versión 3.10
FROM python:3.10-alpine
WORKDIR /singup
COPY . /singup
RUN pip install --no-cache-dir -r requirements.txt 
CMD ["python", "singup.py"]
