import './App.css';
import ModalProvider from './providers/modalProvider';

function App() {
  return (
    <ModalProvider>
      <div className="flex h-10 items-center gap-4 rounded-md bg-white px-4 font-sans">
        <span className="text-body1 font-medium">레귤러</span>
        <span className="text-body1 font-semibold">세미볼드</span>
        <span className="text-body1 font-bold">볼드</span>
      </div>
    </ModalProvider>
  );
}

export default App;
