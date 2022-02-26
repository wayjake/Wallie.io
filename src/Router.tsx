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
import { ViewMap } from './Map'
import { NewPost, ViewPost, ViewPostList, BlogWrapper } from './Blog'
import ViewArchive from './Blog/ViewArchive'
import EditPost from './Blog/EditPost'

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
                    <Route path="map" element={<ViewMap />} />
                    <Route path="archive" element={<ViewArchive />} />
                    <Route path="blog" element={<BlogWrapper />}>
                        <Route path="" element={<ViewPostList />} />
                        <Route path=":key" element={<ViewPost />} />
                    </Route>
                    <Route path="post" element={<BlogWrapper />}>
                        <Route path="new" element={<NewPost />} />
                        <Route path="edit/:key" element={<EditPost />} />
                        <Route
                            path="*"
                            element={<Navigate replace to="/post/new" />}
                        />
                    </Route>
                    <Route
                        path="node/new"
                        element={<NewNode nodeAdded={() => {}} />}
                    />
                    <Route path="node/:key" element={<ViewNode />} />
                    <Route path="*" element={<Navigate replace to="/blog" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
