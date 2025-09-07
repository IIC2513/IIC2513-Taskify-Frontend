# IIC2513-Taskify-Frontend
Aquí se encontrará todo lo relacionado con el frontend del proyecto Taskify para las cápsulas de IIC2513-2025-2.

---
 ## 🎥 Cápsula 1 
 
 Esta cápsula se enfocó en **diseño de frontend** y en el uso de **React Hooks** para manejar estado y comportamientos simples en la interfaz. Se trabajó con useState, useEffect y useRef para construir componentes reutilizables (como la progress bar y las tarjetas de tarea) y permitir pequeñas interacciones. 

 ### Para levantar el proyecto

Con yarn ya instalado  

```bash
yarn create vite
```
Luego nombran el proyecto como ustedes quieran.

Seleccionan las opciones:
- React (como framework)
- JavaScript + SWC (como variante)

Como siguiente paso ejecutan este código con el nombre de su proyecto

```bash
cd nombre-proyecto
```
```bash
yarn
```
 ---

 ## 🎥 Cápsula 5: Conexión a la API

El frontend se comunica con el backend a través de **endpoints REST** definidos en la Cápsula 4. 

### Resumen de lo hecho:

1. **Consumir los endpoints de backend** usando `axios`.  
2. **Actualizar el estado del frontend** según la respuesta del backend (mostrar tareas, agregar tareas, completear tareas, eliminar tareas, registrar usuario y logear usuario).  
3. **Manejar errores y estados** para mejorar la experiencia de usuario.  
4. **Enviar datos en el formato correcto** según lo que el backend espera (`JSON` con los campos requeridos). 

Lo importante es instalar la librería axios:

```bash
yarn add axios
```

Además, se agrega `.env` para variable de entorno URL del backend:

```bash
VITE_BACKEND_URL=http://localhost:3000
```
Ejemplo simple para agregar una tarea:

```javascript

import { useEffect, useRef, useState } from "react";
import "./Task.css";
import axios from "axios";

export default function Tarea({
  id,
  title,
  desc,
  done = false,
  onChange = () => {} , 
  onDelete = () => {},
  userId,
}) {
  const [isDone, setIsDone] = useState(done);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleComplete = async () => {
    try {
      //actualizar localmente primero
      setIsDone(true);

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`,
        {
          status: "COMPLETED",
          userId, 
        }
      );
      console.log("Tarea completada:", response.data);

      // Actualizamos estado local con los datos del backend
      setIsDone(response.data.status === "COMPLETED");
      onChange(response.data); 
    } catch (error) {
      console.error("Error al completar tarea:", error);
      setIsDone(false); // revertir si falla
    }
  };
```

Se reliza logica similar para los diferentes endpoints creados en el backend.
