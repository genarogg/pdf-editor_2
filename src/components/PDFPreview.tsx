"use client"

import { useState, useEffect } from "react"
import { PDFViewer } from "@react-pdf/renderer"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import * as React from "react"
import * as Babel from "@babel/standalone"

// Componente de ejemplo predeterminado para mostrar cuando hay errores
const DefaultDocument = () => (
  <Document>
    <Page size="A4" style={{ padding: 30, backgroundColor: "#ffffff" }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Error en el código</Text>
        <Text>Por favor, corrige los errores en el editor.</Text>
      </View>
    </Page>
  </Document>
)

interface PDFPreviewProps {
  code: string
}

const PDFPreview = ({ code }: PDFPreviewProps) => {
  const [error, setError] = useState<string | null>(null)
  const [Component, setComponent] = useState<React.ComponentType>(() => DefaultDocument)

  useEffect(() => {
    const compileCode = async () => {
      try {
        // Transformar el código JSX a JavaScript usando Babel
        const transformedCode =
          Babel.transform(code, {
            presets: ["react"],
            filename: "preview.jsx",
          }).code || ""

        // Crear un módulo temporal para evaluar el código
        // Usamos una variable result para capturar el componente
        const moduleCode = `
          const React = arguments[0];
          const Document = arguments[1];
          const Page = arguments[2];
          const Text = arguments[3];
          const View = arguments[4];
          const StyleSheet = arguments[5];
          let result = null;
          
          ${transformedCode}
          
          return result;
        `

        // Evaluar el código transformado
        const evalFunction = new Function(moduleCode)

        // Ejecutar la función con las dependencias necesarias
        const CustomComponent = evalFunction(React, Document, Page, Text, View, StyleSheet)

        if (CustomComponent && typeof CustomComponent === "function") {
          setComponent(() => CustomComponent)
          setError(null)
        } else {
          throw new Error(
            "El código no devolvió un componente válido. Asegúrate de asignar tu componente a la variable 'result'.",
          )
        }
      } catch (err) {
        console.error("Error al compilar el código:", err)
        setError(err instanceof Error ? err.message : "Error desconocido")
        setComponent(() => DefaultDocument)
      }
    }

    compileCode()
  }, [code])

  return (
    <div className="pdf-viewer-container">
      {error ? (
        <div className="pdf-error">
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      ) : (
        <PDFViewer width="100%" height="100%">
          <Component />
        </PDFViewer>
      )}
    </div>
  )
}

export default PDFPreview

