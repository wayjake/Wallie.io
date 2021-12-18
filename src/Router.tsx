import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VoteLandingPage from './Vote/Landing'
import { ViewNode, NewNode, NodesLanding } from './Nodes'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<NodesLanding />} />
                    <Route path="nodes" element={<NodesLanding />} />
                    <Route path="nodes/:id" element={<ViewNode />} />
                    <Route path="nodes/new" element={<NewNode />} />
                    <Route path="vote" element={<VoteLandingPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
