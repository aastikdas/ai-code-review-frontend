import './App.css'
import { useState } from 'react'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import axios from 'axios'
import Markdown from 'react-markdown'


function App() {
  

  const [code, setCode] = useState(`function sum()
{
  return a+b;
}`)
 const [review, setReview] = useState('')

  async function reviewCode() {
    try {
      const res = await axios.post('https://ai-code-review-backend-45sx.onrender.com/',{code})
      console.log(res.data);
      setReview(res.data)
    } catch (err) {
      setReview("Gemini is currently overloaded. Please wait a few seconds and click 'Review' again.");
      console.log(err);
      console.log('hi');
    }
  }

  return (
    <>
      <main className='flex p-2 gap-4 bg-slate-600'>
        <div className="left w-[50vw] bg-amber-50 rounded-2xl p-1 basis-1/2 relative">
        <span className='m-auto p-3 flex justify-center border-b-4 rounded-b-2xl text-xl font font-semibold'>Enter your Code..</span>
          <div className="code h-[85vh] mt-2 overflow-y-scroll">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 18,
              }}
            />
          </div>
          <div className="review-btn">
            <button 
            className='bg-blue-400 p-3 rounded-2xl absolute bottom-3 right-8 hover:cursor-pointer'
            onClick={reviewCode}
            >Review</button>
          </div>
        </div>
        <div className="right basis-1/2 w-[50vw] bg-amber-50   rounded-2xl p-2 ">
        <span className='text-gray-700 flex justify-center border-b-4 rounded-b-2xl text-xl font font-semibold p-3'>AI Generated Review</span>
          <div className="aihelp h-[85vh] mt-2 overflow-scroll px-4 ">
              {
              <Markdown>{review}</Markdown>
              }
          </div>
        </div>
      </main>
    </>
  )
}

export default App
