FROM python:3.8-slim-buster
WORKDIR /app
ENV PYTHONUNBUFFERED 1
COPY requirements.txt  .
RUN pip3 install -r requirements.txt
