import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter} from 'react-router-dom'
import axios from 'axios'
// practicing the toast
// import { ToastContainer, toast } from 'react-toastify';
// const popup=()=>{
//   toast('hi this is tost',{autoClose:3000,style:{color:'red'},position:"bottom-center"})
// }

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>
)
  


