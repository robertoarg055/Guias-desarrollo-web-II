import { BrowserRouter, Routes, Route } from 'react-router'
import  { IndexPage } from './pagos/IndexPage'  
import  { FavoritesPage } from './pagos/FavoritesPage'
import Layout from './layout/Layout'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/favoritos" element={<FavoritesPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App