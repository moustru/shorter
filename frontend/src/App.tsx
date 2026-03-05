import { useState } from 'react'
import './App.css'
import { httpInstance } from './axios.config'

function App() {
  const [link, setLink] = useState('')
  const [newLink, setNewLink] = useState('')

  const generate = async () => {
    const res = await httpInstance.post('/link', { link })

    setNewLink(res.data.link);
  }

  const copyLink = () => {
    navigator.clipboard.writeText(newLink);
  }

  return (
    <>
      <h1>Link Shorter</h1>

      <div className="input-wrapper">
        <input value={link} onChange={(e) => setLink(e.currentTarget.value)} />
        <button onClick={generate}>Получить ссылку</button>
      </div>

      {newLink && 
        <div className="link-wrapper">
          <a href={newLink} target='_blank' rel="nofollow">{newLink}</a>
          <button onClick={copyLink}>Скопировать ссылку</button>
        </div>
      }

    </>
  )
}

export default App
