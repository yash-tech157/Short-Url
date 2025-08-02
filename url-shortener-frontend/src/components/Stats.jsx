import { useEffect, useState } from 'react';
import axios from 'axios';

function Stats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/url/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">URL Statistics</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Long URL</th>
            <th className="p-2 border">Short URL Code</th>
            <th className="p-2 border">Clicks</th>
            <th className="p-2 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="p-2 border">{item.longUrl}</td>
               <td className="p-2 border">
                {item.shortUrlCode}
              </td>
              <td className="p-2 border text-center">{item.clickCount}</td>
              <td className="p-2 border">{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
