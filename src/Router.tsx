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
import { GeoLocation } from './GeoLocation'
import Dashboard from './Nodes/Dashboard'
import { Analytics } from '@vercel/analytics/react'

function Wrapper() {
   return (
      <AppWrapper>
         <Analytics />
         <Outlet />
      </AppWrapper>
   )
}

export default function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="*" element={<Wrapper />}>
               //the famous, get-all!
               <Route path="all" element={<GetAll />} />
               //blog & archive routes
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
               <Route path="dashboard" element={<BlogWrapper />}>
                  <Route path=":key" element={<Dashboard />} />
               </Route>
               <Route path="node" element={<BlogWrapper />}>
                  <Route
                     path="new"
                     element={<NewNode nodeAdded={() => {}} />}
                  />
                  <Route path=":key" element={<ViewNode />} />
               </Route>
               <Route path="*" element={<Navigate replace to="/all" />} />
               //deprecated
               <Route path="map" element={<ViewMap />} />
               <Route path="geo" element={<GeoLocation />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}
