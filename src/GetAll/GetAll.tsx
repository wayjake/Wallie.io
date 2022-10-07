import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { TopBar } from '../Blog'
import gun, { namespace } from '../gun'
import { DungeonNode } from '../Nodes'
import styled from 'styled-components'
import { ViewNode } from './ViewNode'

const GetAllStyled = styled.div``
const ListNodesWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`
const ListNodes = styled.div`
   display: flex;
   flex-direction: column;
   width: 90%;
   @media only screen and (min-width: 600px) {
      width: 520px;
   }
`

const GetAll = () => {
   const [nodes, setNodes] = useState<DungeonNode[] | any[]>([])

   const onNodeRemoved = (nodeKey: string) => {
      setNodes((nodes) => nodes.filter((node) => node.key !== nodeKey))
   }

   useEffect(() => {
      const allNodesQuery = gun
         .get(namespace + '/node')
         .map()
         .on((newNode: DungeonNode | any = {}, key) => {
            const immutableNode =
               typeof newNode === 'object'
                  ? { ...newNode, key }
                  : { message: newNode, key }
            setNodes((nodes) => {
               const filtered = nodes.filter(
                  (node) => node.key !== key && !!node && !!node.message
               )
               if (immutableNode === null || !immutableNode.message)
                  return filtered
               return [...filtered, immutableNode].sort(
                  (node, nodeB) => nodeB.date - node.date
               )
            })
         })
      return () => {
         allNodesQuery.off()
         setNodes([])
         console.log(`cleared nodes`)
      }
   }, [])

   return (
      <GetAllStyled>
         <Helmet>
            <title>All Nodes - Wallie</title>
         </Helmet>
         <TopBar />
         {!nodes.length && <>loading..</>}
         {nodes.length && (
            <div
               style={{
                  position: 'fixed',
                  bottom: 0,
                  right: '1rem',
                  height: 42 / 2,
                  margin: '1rem 0',
                  background: 'grey',
                  color: 'white',
               }}
            >
               <b>Number of Nodes {nodes.length}</b>
            </div>
         )}
         <ListNodesWrapper>
            <ListNodes>
               {nodes.map((node) => (
                  <ViewNode
                     node={node}
                     key={node.key}
                     onNodeRemoved={onNodeRemoved}
                  />
               ))}
            </ListNodes>
         </ListNodesWrapper>
      </GetAllStyled>
   )
}

export default GetAll
