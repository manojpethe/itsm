import { useToast } from '../state/ToastContext';

const Testlab = () => {

  const { showToast } = useToast();

  return (
    <>
      <div className="flex mt-1">
        <div className="m-auto max-w-[40%]">
          <div className='border border-amber-500 border-2 w-dvh h-150'>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Testlab