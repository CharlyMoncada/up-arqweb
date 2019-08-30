# up-arqweb
Trabajo Practico

App - Agenda Personal

Esta aplicacion nos permite tener una agenda personal de contactos, en la cual se pueden mostrar, crear, editar y borrar contactos.

Los endpoints que se utilizaran seran los siguientes:

* api/agenda (methods=['GET']) --> Retorna agenda

* api/contact (methods=['POST']) --> Crea contacto

* api/contact/<int:id> (methods=['GET']) --> Retorna contacto

* api/contact/<int:id> (methods=['DELETE']) --> Borra contacto

* api/contact (methods=['PUT']) --> Modifica contacto

