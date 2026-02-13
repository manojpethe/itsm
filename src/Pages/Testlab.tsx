import { useToast } from '../state/ToastContext';

const Testlab = () => {

    const { showToast } = useToast();

  return (
    <div className="flex gap-4 p-4"

>
      <button 
        className="btn btn-success" 
        onClick={() => showToast('Saved!', 'success', 3)}
      >
        Success (3s)
      </button>

      <button 
        className="btn btn-error" 
        onClick={() => showToast('Failed!', 'error', 5)}
      >
        Error (5s)
      </button>
    </div>
  );
};

export default Testlab