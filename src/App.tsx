import './App.css';
import ModalProvider from '@/providers/ModalProvider';

function App() {
  return (
    <ModalProvider>
      <div className="items-cssenter flex h-10 gap-4 rounded-md bg-white px-4 font-sans">
        <span className="text-body1 font-medium">레귤러</span>
        <span className="text-body1 font-semibold">세미볼드</span>
        <span className="text-body1 font-bold">볼드</span>
      </div>
    </ModalProvider>
  );
}

export default App;
