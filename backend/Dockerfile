# Utiliza como base la imagen oficial de Python versión 3.10
FROM python:3.10 
WORKDIR /app 
COPY . /app  
RUN pip install --no-cache-dir -r requirements.txt 
CMD ["python", "app.py"]
