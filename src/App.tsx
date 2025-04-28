import {CssBaseline} from '@mui/material';
import {Routes, Route} from 'react-router';
import {Login} from './pages/Login.tsx';
import {Register} from './pages/Register.tsx';
import {Home} from './pages/Home.tsx';
import {CreatePost} from './pages/CreatePost.tsx';
import Header from './components/Header.tsx';

function App() {

  return (
    <>
      <CssBaseline/>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/create-post'} element={<CreatePost/>}/>
      </Routes>
    </>
  );
}

export default App;
