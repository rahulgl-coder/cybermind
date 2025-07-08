// App.jsx
import React from 'react';
import Nav from './Components/Navbar';
import Searchs from './Components/Search';
import JobList from './Components/JobGrid';
import Form from './Components/Form';
import { useModal } from './context/Jobcontext'; // make sure path is correct
import Header from './Components/Header';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isFormOpen, closeForm } = useModal();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
       <Header/>
      <JobList />

      {/* Modal for Job Form */}
      {isFormOpen && (
         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white  rounded-[16px]  relative w-[700px] h-[630px]"> 
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <Form />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
