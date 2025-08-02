import { useState } from 'react';
import axios from 'axios';

function UrlForm() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortened, setShortened] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');
setShortened(false);

    try {
  const response = await axios.post('http://localhost:5000/url/shorten', { longUrl });
   if(response.status===200)
   {
    setShortUrl(`http://localhost:5000/${response.data.shortUrlCode}`);
      setShortened(true);
         setTimeout(() => {
          setShortened(false);
        }, 3000);
   }
   else{
    setError(response.statusText);
   }
} catch (error) {
  //console.error('Error:', error.response ? error.response.data : error.message);
  setError('Error:'+ error.message);
}
finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="url"
          placeholder="Enter a long URL..."
          className="p-2 border rounded"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        {/* <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button> */}
         <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        ></button>
        
      </form>

      {shortUrl && (
        <div className="mt-4 text-green-600">
          Short URL: <a href={shortUrl} className="underline" target="_blank">{shortUrl}</a>
        </div>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default UrlForm;
