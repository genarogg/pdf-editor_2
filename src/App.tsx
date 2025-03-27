"use client"

import { useState } from "react"
import CodeEditor from "./components/CodeEditor"
import PDFPreview from "./components/PDFPreview"
import "./App.css"

function App() {
  // Código de ejemplo con JSX normal
  const [code, setCode] = useState<string>(`
// Ejemplo básico de React PDF
// No uses declaraciones import aquí, las dependencias ya están disponibles

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  }
});

// Puedes definir variables y usarlas en tu JSX
const data = "Mi Documento PDF";

// Componente PDF con JSX normal
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{data}</Text>
        <Text style={styles.text}>
          Este es un ejemplo de documento PDF creado con React PDF.
        </Text>
        <Text style={styles.text}>
          Puedes editar este código en el editor y ver los cambios en tiempo real.
        </Text>
      </View>
    </Page>
  </Document>
);

// En lugar de usar return, asigna el componente a una variable llamada result
// Esta variable será detectada por nuestro sistema
result = MyDocument;
  `)

  return (
    <div className="app-container">
      <header>
        <h1>Editor de PDF con React</h1>
      </header>
      <main>
        <div className="editor-container">
          <CodeEditor value={code} onChange={setCode} />
        </div>
        <div className="preview-container">
          <PDFPreview code={code} />
        </div>
      </main>
    </div>
  )
}

export default App

