import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // เปลี่ยน URL และ Endpoint ให้ตรงกับ Route ของ Backend คุณ
    fetch('http://localhost:3001/api/v2/users')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Fetch error:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-2xl font-bold text-sky-400 mb-4">Frontend Integration Test</h1>

      {loading && <p className="text-yellow-400">Loading data from backend...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}

      {data && (
        <pre className="bg-slate-800 p-4 rounded-lg border border-slate-700 font-mono text-sm overflow-x-auto text-emerald-400">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default App