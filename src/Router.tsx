import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom'
import VoteLandingPage, { AppWrapper } from './Vote/Landing'
import { ViewNode, NewNode, NodesLanding } from './Nodes'

function Wrapper() {
    return (
        <AppWrapper>
            <Outlet />
        </AppWrapper>
    )
}

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Wrapper />}>
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
