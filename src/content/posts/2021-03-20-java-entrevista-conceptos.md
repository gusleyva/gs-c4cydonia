---
template: blog-post
title: Conceptos para una entrevista de Java - Parte 1
slug: /java-entrevista-conceptos
date: 2021-03-20 20:15
description: Java - Conceptos necesarios para una entrevista
featuredImage: /assets/2021/05_git_diff.jpeg
---

> ### Una entrevista puede ser incomoda, sin embargo, como todo en la vida, entre mejor se este preparado, uno se sentirá mas seguro de si mismo y los resultados serán mejores.

Los conceptos que se presentan a continuación te ayudarán con la parte básica de una entrevista como desarrollador Java, de igual manera, estos conceptos aplican en cualquier lenguaje orientado a objetos, como lo es C#, entre otros.

> **A veces las estructuras de datos son la solución a todo el problema.**  
> **Quieres remover duplicados? Utiliza un HashSet**

_Interface_ – Tipo abstracto que solo admite métodos abstractos. Usualmente es utilizado para especificar el comportamiento de la clase que lo implementará.

![Concepto-interfaz](/assets/2021/04_Interface_Class.png "Concepto-interfaz")

_Abstract class_ – Es una clase abstracta que puede tener métodos abstractos y métodos con implementación, al igual que la interfaz ayuda a especificar el comportamiento de la clasa que debe implementar esta clase abstracta.

_Overriding_ – Permite a una subclase o clase hija implementar el método con el comportamiento necesario para ese escenario, el comportamiento de la clase padre o “super class” será ignorado. El método debe tener el mismo nombre, parametros que acepta, el mismo tipo de retorno.

_Overloading_ – Es un método con el mismo nombre que otro método existente pero que puede aceptar mas o menos paramétros.

_Static_ – Esta palabra reservada es utilizada para el uso de memoria.
- Variable -> Variable de clase (Class variable)
- Method -> Método de clase (Class method)

_Final_ – Es una palabra reservada que puede aplicarse a una variable, método o una clase.
- Variable -> Variable constante, el valor es asignado y no puede cambiarse.
- Método -> No permite la sobre-escritura (overriding).

_Classes_ -> No permite la herencia (Inheritance), la clase no podrá tener un comportamiento distinto.

**Modificadores de acceso**
- Public -> Todos pueden verlo y accesar a el.
- Protected -> Acceso solo a la clases en el mismo paquete (Package) y clases hija/sub-clases.
- Default -> Acceso a clases en el mismo paquete (package).
- Private -> Acceso solo  permitido en la misma clase (También a través de reflection, pero esa es otra historia…).

_Immutable_
- Son estas clases que no puede ser modificadas una vez que han sido creadas.
- Todos los campos de una clase inmutable (immutable) deben ser “final”.

>### “Un buen código es alto en cohesión y bajo en acoplamiento (coupling)”

_Cohesión_: Una sola tarea, un solo objetivo.  

_Acoplamiento (Coupling)_: Relación o dependencia entre clases.

## Collections
### Interfaces

#### List
- Orden de inserción.
- Acceso a través de indices.
- Permite duplicados.
- Permite elementos null y puede tener muchos objetos null.

#### Set
- Objetos únicos sin un orden en especifico.
- No permite duplicados.
- Permite un element null.

##### Map
- Objetos que se almacenan en pares Key-value.
- Solo un element key null.
- Permite multiples valores nulls.

## Estructuras de Datos
**(Implementaciones de las Interfaces)**

![Estructuras-datos](/assets/2021/02_Data_Structures.jpeg "Estructuras-datos")

>### “A veces las estructuras de datos son la solución a todo el problema.
>**Quieres remover duplicados?** Utiliza un _HashSet_  
>**Quieres organizar los datos para busquedas veloces?** Utiliza un _b-tree_
>#### La lista continúa….”

### List interface
**ArrayList** – Proporciona acceso a través de índices.  
**LinkedList** – Una relación hacia el elemento previo y el siguiente element, permite agregar y eliminar elementos de una forma sencilla.  
**Vector** – Vector es la versión sincronizada de ArrayList.

#### Time Complexity
![List](/assets/2021/2021-03-20-List.png "List")

### Map interface
**HashMap** – Estructura key-value non-synchronized.  
**HashTable** – Estructura key-value synchronized.  
**LinkedHashMap** – Garantiza el orden de inserción.  
**TreeMap** – Mantiene un orden por clasificación (sort order), por default es orden natural de menor a mayor.  

#### Time Complexity
![Map](/assets/2021/2021-03-20-map.png "Map")

### Set interface
**HashSet**
- Objeto para guardar elementos.
- Es rápido.
- O(1) para funciones de inserción (add), busqueda (contains) y borrado (remove) debido a la función hash distribuye los elementos uniforme en los la tabla hash.  

**LinkedHashSet**
- Mantiene orden de inserción.
- Es el Segundo en desempeño, casi similar a HashSet.  

**TreeSet**
- Es una implementación de SortedSet.  
- Mantiene los elementos en un orden por clasificación (sort order), definida por una interface Comparable o Comparator.  
- Es un poco mas lento debido a la operación de ordenamiento que debe efectuar en cada insercción.  
- No permite elementos null y lanza la excepción throw java.lang.NullPointerException cuando intentas insertar un elemento null.
- O(log*n): Insertar (add), remover (remove), buscar (contains).  

#### Time Complexity
![Set](/assets/2021/2021-03-20-set.png "Set")

## Resumen
Las clases collection utilizadas habitualmente son descritas en la tabla de abajo.

![Resumen](/assets/2021/2021-03-20-resumen.png "Resumen")