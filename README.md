# Reto técnico

![example](https://raw.githubusercontent.com/andresleonardobg/prueba/main/assets/preview.png)

En este repositorio podra ver el codigo creado para la prueba que se me ha asignado igualmente podran ver este mismo proyecto desplegado en un hosting de firebase que podran ver [aquí](https://prueba-e876d.web.app/).

## Funcionamiento

Este código combina dos objetos: carouselProducts y carouselManager, que se utilizan para mostrar productos en un carrusel y controlar el desplazamiento del carrusel.

El objeto carouselProducts tiene los siguientes métodos:

1. **getProducts(urlApi, container)**: Este método realiza una solicitud fetch a una API (urlApi) para obtener los productos. Luego, utiliza el método displayProducts para mostrar los productos en el contenedor especificado (container).

2. **validateRatingStars(rating, initialRange)**: Este método se utiliza para determinar si una calificación de producto (rating) es suficiente para llenar una estrella. Compara la calificación con el rango inicial especificado y devuelve la cadena 'filled' si es mayor o igual.

3. **setHeight(count)**: Este método establece la altura de los elementos del carrusel en función de un contador esto basado en el diseño compartido. Si el contador es par, devuelve '320', de lo contrario, devuelve '400'.

4. **displayProducts(items, container)**: Este método recorre los elementos de los productos y crea la estructura HTML para mostrar cada producto en el contenedor especificado (container). Utiliza los métodos validateRatingStars y setHeight para establecer dinámicamente las estrellas y la altura de los elementos del carrusel.

El objeto carouselManager se encarga de controlar el desplazamiento del carrusel en respuesta a los eventos de clic en los botones izquierdo (buttonLeft) y derecho (buttonRight). Tiene los siguientes métodos:

1. **init(buttonLeft, buttonRight, carousel)**: Este método inicializa el objeto carouselManager y establece los controladores de eventos para los botones del carrusel. Cuando se hace clic en el botón izquierdo, se realiza un desplazamiento hacia la izquierda del carrusel y se actualiza la posición de los elementos. Cuando se hace clic en el botón derecho, se realiza un desplazamiento hacia la derecha y se actualiza la posición de los elementos. El método también tiene en cuenta la resolución de la pantalla para determinar la cantidad de desplazamiento necesario.

Después de definir los objetos **carouselProducts** y **carouselManager**, se utilizan para obtener los productos de una API y manipular el carrusel con los botones y el contenedor especificados.
