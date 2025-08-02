import Stats from './components/Stats';
import UrlForm from './components/UrlForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-center text-3xl font-bold pt-10">URL Shortener App</h1>
      <UrlForm />
      <Stats />
    </div>
  );
}

export default App;
