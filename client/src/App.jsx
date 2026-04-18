import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/pages';

function App() {
  const [text, setText] = useState('');
  const [pages, setPages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then(setPages)
      .catch(() => setError('Unable to load saved pages.'));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError('');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Save failed');
      }

      const newPage = await response.json();
      setPages((current) => [newPage, ...current]);
      setText('');
    } catch (err) {
      setError('Unable to save the page.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <header>
        <h1>Hello Pages</h1>
        <p>Type something and save it to the list below.</p>
      </header>

      <form onSubmit={handleSubmit} className="page-form">
        <label htmlFor="page-input">New page text</label>
        <textarea
          id="page-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows="4"
          placeholder="Enter page content..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <section className="page-list">
        <h2>Saved Pages</h2>
        {pages.length === 0 ? (
          <p>No pages saved yet.</p>
        ) : (
          <ul>
            {pages.map((page) => (
              <li key={page.id}>
                <div className="page-item-text">{page.text}</div>
                <div className="page-item-meta">{new Date(page.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
