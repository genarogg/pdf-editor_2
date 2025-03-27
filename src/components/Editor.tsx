"use client"

import { useRef, useEffect } from "react"
import * as monaco from "monaco-editor"
import type { editor } from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"

// Configurar los workers de Monaco
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker()
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker()
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker()
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker()
    }
    return new editorWorker()
  },
}

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

const Editor = ({ value, onChange }: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    if (editorRef.current) {
      // Configurar el editor Monaco
      monacoEditorRef.current = monaco.editor.create(editorRef.current, {
        value,
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: {
          enabled: true,
        },
        scrollBeyondLastLine: false,
        fontSize: 14,
        wordWrap: "on",
        lineNumbers: "on",
        folding: true,
        renderLineHighlight: "all",
      })

      // Escuchar cambios en el editor
      monacoEditorRef.current.onDidChangeModelContent(() => {
        const newValue = monacoEditorRef.current?.getValue() || ""
        onChange(newValue)
      })

      // Limpiar al desmontar
      return () => {
        monacoEditorRef.current?.dispose()
      }
    }
  }, [])

  // Actualizar el valor del editor cuando cambia el prop value
  useEffect(() => {
    if (monacoEditorRef.current && value !== monacoEditorRef.current.getValue()) {
      monacoEditorRef.current.setValue(value)
    }
  }, [value])

  return <div ref={editorRef} className="monaco-editor-container" />
}

export default Editor

