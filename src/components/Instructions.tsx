const Instructions = () => {
  return (
    <div className="instructions">
      <h2>Instrucciones</h2>
      <p>
        Este editor te permite crear documentos PDF utilizando React PDF. Puedes editar el código en el panel izquierdo
        y ver el resultado en tiempo real en el panel derecho.
      </p>

      <h3>Componentes disponibles:</h3>
      <ul>
        <li>
          <code>Document</code> - Componente raíz para el PDF
        </li>
        <li>
          <code>Page</code> - Define una página del PDF
        </li>
        <li>
          <code>Text</code> - Para mostrar texto
        </li>
        <li>
          <code>View</code> - Contenedor similar a un div
        </li>
        <li>
          <code>StyleSheet</code> - Para crear estilos
        </li>
      </ul>

      <h3>Notas importantes:</h3>
      <ul>
        <li>
          No uses declaraciones <code>import</code> en tu código
        </li>
        <li>
          Asigna tu componente a la variable <code>result</code> al final del código
        </li>
        <li>
          No uses <code>return</code> fuera de una función
        </li>
        <li>
          Usa <code>StyleSheet.create()</code> para definir estilos
        </li>
      </ul>
    </div>
  )
}

export default Instructions

