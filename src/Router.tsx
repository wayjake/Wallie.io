import {
    BrowserRouter,
    Outlet,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { AppWrapper } from './Vote/Landing'
import { ViewNode, NewNode } from './Nodes'
import { GetAll } from './GetAll'

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
                <Route path="*" element={<Wrapper />}>
                    <Route path="all" element={<GetAll />} />
                    <Route
                        path="node/new"
                        element={<NewNode nodeAdded={() => {}} />}
                    />
                    <Route path="node/:key" element={<ViewNode />} />
                    <Route
                        path="*"
                        element={<Navigate replace to="/node/new" />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
