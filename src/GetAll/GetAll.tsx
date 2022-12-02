import { useEffect, useState } from 'react'
import { TopBar } from '../Blog'
import gun, { namespace } from '../gun'
import { DungeonNode } from '../Nodes'
import styled from 'styled-components'
import { ViewNode } from './ViewNode'
import LoadingWheel from '../Interface/LoadingWheel'
import moment from 'moment'
import { isNull, isString, random } from 'lodash'

const GetAllStyled = styled.div`
   .loadingwheel {
      margin: 0 auto;
      padding-top: 42px;
   }
`
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
const NoContent = styled.div`
   margin: 0 auto;
   text-align: center;
   height: 100%;
   font-size: 22px;
   padding: 0 17px;
   padding-top: 42px;
   max-width: 320px;
`

const GetAll = () => {
   const [nodes, setNodes] = useState<DungeonNode[] | any[]>([])
   const [longLoad, setLongLoad] = useState<boolean>(false)

   const onNodeRemoved = (nodeKey: string) => {
      setNodes((nodes) => nodes.filter((node) => node.key !== nodeKey))
   }

   const getNodes = (): Promise<DungeonNode[]> => {
      return new Promise((resolve) => {
         setNodes((nodes) => {
            resolve(nodes)
            return nodes
         })
      })
   }

   // init the page title
   useEffect(() => {
      document.title = `
         Wallie, the front page
      `
   })

   // Wait 3 seconds and if there still aren't any nodes
   // update the component state to show the 404-ish state
   useEffect(() => {
      setTimeout(() => {
         setNodes((nodes: any) => {
            if (!nodes || !nodes.length) {
               setLongLoad(true)
            }
            return nodes
         })
      }, 3000)
   }, [])

   // Get reddit posts to start filling in some content
   useEffect(() => {
      type RedditPost = {
         author: string //maps to user
         distinguished: string
         thumbnail: string
         title: string //maps to node.directionText
         url: string
         selftext: string //maps to node.message
         created_utc: Number
      }

      type RedditPostResponse = {
         data: {
            children: [{ data: RedditPost }]
         }
      }
      const getPolitics = async () => {
         const channel = ['politics', 'popular', 'conservative'][random(0, 2)]
         const res = await fetch(`https://www.reddit.com/r/${channel}/new.json`)
         const {
            data: { children: redditPosts },
         } = (await res.json()) as RedditPostResponse
         const {
            author: user,
            thumbnail,
            title: directionText,
            selftext: message,
            url,
            created_utc: date,
         }: RedditPost = redditPosts[random(0, redditPosts?.length - 1)]?.data
         const post: any = {
            user,
            thumbnail,
            url,
            date: Date.now(),
            directionText,
            message,
         }
         gun.get(namespace + `/node`)
            .get(user)
            .put(post, (awk) => console.log(awk))
      }
      getPolitics()
   }, [])

   const deleteNode = (key): Promise<void> => {
      return new Promise((resolve) => {
         gun.get(namespace + '/node')
            .get(key)
            .put(null, (awk) => {
               console.log(`deleted ${key} awk:`, awk)
               onNodeRemoved(key)
               resolve()
            })
      })
   }

   // handle Nuclear event codes
   useEffect(() => {
      async function downHandler({ key }): Promise<void> {
         if (key !== 'N') {
            return
         }
         const nodes = await getNodes()
         for (const node of nodes) {
            const isOld = moment(node.date).isBefore(
               moment(new Date()).subtract(3, 'days')
            )
            const isReservedKey = ['wrfrn32', 'clock'].includes(key)
            if (isOld && !isReservedKey) {
               await deleteNode(node.key)
            }
         }
      }
      window.addEventListener('keydown', downHandler)
      return () => {
         window.removeEventListener('keydown', downHandler)
      }
   }, [])

   // get all of the nodes
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
                  // if there's NOT already an item by this key
                  // and the node actually exists
                  // and there is a message
                  (node) => node.key !== key && !!node && isString(node.message)
               )
               // if the new node is null ignore it
               // if the new node's message has nothing on it, ignore it
               if (isNull(immutableNode) || !isString(immutableNode.message)) {
                  return filtered
               }
               return [...filtered, immutableNode].sort(
                  (node, nodeB) => nodeB.date - node.date
               )
            })
         })
      return () => {
         allNodesQuery.off()
         setNodes([])
      }
   }, [])

   return (
      <GetAllStyled>
         <TopBar />
         {!nodes.length && !longLoad && (
            <LoadingWheel className="loadingwheel" />
         )}
         {!nodes.length && longLoad && (
            <NoContent>
               It doesn't look like there's anything here... yet
            </NoContent>
         )}
         {!!nodes.length && (
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
