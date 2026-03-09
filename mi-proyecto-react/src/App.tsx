import { useState, useEffect } from 'react'
import './App.css'

// ==========================================
// 1. COMPONENTE BÁSICO CON PROPS
// ==========================================
function Saludo({ nombreInicial }: { nombreInicial: string }) {
  const [nombre, setNombre] = useState(nombreInicial);

  return (
    <div className="tutorial-card">
      <h2>1. Componente y Props</h2>
      <p>📝 Hola, <strong>{nombre}</strong>. Este componente recibió tu nombre inicial como "prop" desde el componente principal.</p>
    </div>
  )
}

// ==========================================
// 2. COMPONENTE CON STATE (Estado) Y EVENTOS
// ==========================================
function Contador() {
  const [contador, setContador] = useState(0)

  return (
    <div className="tutorial-card">
      <h2>2. Estado y Eventos (onClick)</h2>
      <p>Profundidad actual: <strong>{contador}</strong> metros.</p>
      <button onClick={() => setContador(contador + 1)}> ⏬ Descender 1m </button>
      <button onClick={() => setContador(0)} style={{ marginLeft: '10px' }}> 🔄 Superficie </button>
    </div>
  )
}

// ==========================================
// 3. EVENTOS EN FORMULARIOS (Inputs)
// ==========================================
function FormularioSimple() {
  const [texto, setTexto] = useState('')

  return (
    <div className="tutorial-card">
      <h2>3. Formularios (onChange)</h2>
      <p>Escribe tu reporte en la consola de comunicación:</p>
      <input
        type="text"
        placeholder="Escribe tu reporte aquí..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <p style={{ marginTop: '15px' }}>
        Reporte actual: <strong>{texto || "(Consola vacía)"}</strong>
      </p>
    </div>
  )
}

// ==========================================
// 4. EFFECTS (Efectos Secundarios)
// ==========================================
function Temporizador() {
  const [segundos, setSegundos] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos((s) => s + 1)
    }, 1000)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="tutorial-card">
      <h2>4. Efectos (useEffect)</h2>
      <p>⏱️ Tiempo de inmersión: <strong>{segundos}</strong> segundos.</p>
    </div>
  )
}

// ==========================================
// 5. RENDERIZADO CONDICIONAL (Nuevo)
// ==========================================
function RenderizadoCondicional() {
  const [lucesEncendidas, setLucesEncendidas] = useState(false);

  return (
    <div className="tutorial-card">
      <h2>5. Renderizado Condicional (If/Ternario)</h2>
      <p>Dependiendo del estado, la interfaz cambia (ej. operador ternario <code>? :</code> o compuerta lógica <code>&&</code>).</p>
      <p>Estado de los focos: <strong>{lucesEncendidas ? '💡 ENCENDIDOS' : '🌑 APAGADOS'}</strong></p>
      <button onClick={() => setLucesEncendidas(!lucesEncendidas)}>
        {lucesEncendidas ? 'Apagar Luces' : 'Encender Luces'}
      </button>

      {/* Si lucesEncendidas es true, se dibuja este elemento */}
      {lucesEncendidas && (
        <p style={{ marginTop: '15px', color: '#6ee7b7' }}>
          ⚠️ ¡Cuidado con no asustar a la fauna bioluminiscente!
        </p>
      )}
    </div>
  )
}

// ==========================================
// 6. LISTAS Y KEYS (Nuevo)
// ==========================================
function RenderizadoDeListas() {
  // Un arreglo de datos simple
  const inventario = [
    '📸 Cámara para corales',
    '🧭 Brújula magnética',
    '🔦 Batería de repuesto',
    '🧪 Kit de muestras de agua'
  ];

  return (
    <div className="tutorial-card">
      <h2>6. Renderizado de Listas (.map)</h2>
      <p>En React usamos la función <code>.map()</code> de JavaScript para dibujar listas. Recuerda usar siempre la prop <strong>key</strong>.</p>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {inventario.map((item, index) => (
          <li key={index} style={{ background: 'rgba(255,255,255,0.05)', margin: '5px 0', padding: '10px', borderRadius: '8px' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ==========================================
// 7. COMPONENTE CON CHILDREN (Nuevo)
// ==========================================
// Este componente sirve como un "envoltorio" para lo que le pases dentro
function CompartimentoEstanco({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: '2px dashed rgba(125, 211, 252, 0.5)', padding: '15px', borderRadius: '12px', marginTop: '15px' }}>
      <p style={{ margin: '0 0 10px 0', fontSize: '0.85em', color: '#7dd3fc', textTransform: 'uppercase' }}>
        [ Compartimento Sellado]
      </p>
      {/* Aquí es donde se inyecta el contenido que pongas dentro de las etiquetas */}
      {children}
    </div>
  )
}

function PropsChildren() {
  return (
    <div className="tutorial-card">
      <h2>7. Props Especiales (children)</h2>
      <p>Puedes pasar elementos HTML o componentes enteros dentro de otro componente usando la prop especial <code>children</code>.</p>
      <CompartimentoEstanco>
        <p style={{ margin: 0 }}>¡Este texto está protegido de la presión abismal y envuelto en un componente personalizado!</p>
      </CompartimentoEstanco>
    </div>
  )
}

// ==========================================
// APLICACIÓN PRINCIPAL
// ==========================================
function App() {
  return (
    <div className="app-container">
      {/* Sistema de partículas (24 peces) */}
      <div className="particles-underwater">
        {[...Array(24)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {/* Lecho marino (15 Corales y Rocas) */}
      <div className="seabed">
        <div className="rock rock-1"></div>
        <div className="rock rock-2"></div>
        <div className="rock rock-3"></div>
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`coral coral-${i + 1}`}></div>
        ))}
      </div>

      {/* Contenido principal de la página */}
      <h1>React Abismal 🌊</h1>
      <p style={{ textAlign: 'center', color: '#bae6fd', marginBottom: '3rem' }}>
        Guía interactiva del ecosistema de componentes.
      </p>

      {/* Renderizamos todos los módulos de aprendizaje */}
      <Saludo nombreInicial="Estudiante Explorador" />
      <Contador />
      <FormularioSimple />
      <Temporizador />
      {/* Nuevos módulos de aprendizaje */}
      <RenderizadoCondicional />
      <RenderizadoDeListas />
      <PropsChildren />
    </div>
  )
}

export default App
