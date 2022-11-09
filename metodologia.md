Metodologia

Para el proyecto primero se analizo como es que tenia que
estar el modelo para el back end ya que estaba diseñado de
una manera un tanto extraño asi que se cambiaron las tablas
como se muestra en el archivo "Diagrama"

En el archivo diagrama se puede ver que la tabla dogsize se
agrego directamente a los paseadores ya que no tenia sentido
que estuviera unida a los usuarios pues ellos no pueden o
no se les da alejir el tamaño preferible de los paseadores.
Mientras que el tamaño de los perros de los dueños esta como
un atributo en las tablas de los perros


En cuanto al número de tablas se dejo justo como ya venia en
el proyecto

Asi pues la tabla Schedules que son los horarios que tiene 
disponible los paseadores y los ScheduledWalkers son 
basicamente los horarios que le fue asigando al paseador
para pasear a cierto perro.

Inicialmente se queria crear solo una tabla para los usurios
y los paseadores, pero esto se descarto debido a que
tambien los usurios comunes se pueden registrar como
paseadores.

Una vez hecha la maquetacion de las tablas se procedio hacer
las vistas y las urls para consultarlas desde el lado del cliente
una vez terminado esto se hizo tambien las vistas necesarias
para consultar dada una instancia de cierto tipo, ya que
nada de estas estaban implementadas, como por ejemplo
buscar los perros registrador de un usuario en especifico

Posteriormente se hizo la maquetacion del front end pues 
primero habria que definir el numero de compnentes por vista
ya sea del usuario o del paseador, el cual se definio en el 
README.txt pues ya se tenia un premaquetado definido, por
falta de tiempo no se logro dar el estilo suficiente para 
que la vista quedara lo más parecida, sin embargo los
componentes se dejaron predispuestos a solo ponerle los
estilos pertinentes, los cuales ya no venian como
requerimientos pero si venian en la maquetación de la vista

Despúes de esto se procedio a implementar las peticines a la
base de datos desde los compoenentes con estados para que 
estos pudieran consumir la API que se tiene

Una vez terminada las petecines a la API y que ya estaba
seguro que las respues de los datos estaban correctas
lo unico que faltaba era resumir la logica de los
componentes para que mostraran y se comportara según
los datos consumidos por la API









