import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ChannelPage from './pages/Channel/ChannelPage';
import Feed from './pages/Feed/Feed';
import SearchFeed from './pages/SearchFeed/SearchFeed';
import Video from './pages/Video/Video';

function App() {

  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <Navbar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
        <Routes>
          <Route path='/' exact element={<Feed sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />} />
          <Route path='/video/:id' exact element={<Video />} />
          <Route path='/channel/:id' exact element={<ChannelPage />} />
          <Route path='/search/:searchTerm' exact element={<SearchFeed />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
