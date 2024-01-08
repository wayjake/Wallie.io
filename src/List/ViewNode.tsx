import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SimpleIcon, Styles } from '../Interface'
import { DungeonNode } from '../Nodes'
import gun, { namespace } from '../api/gun'
import { useNavigate } from 'react-router-dom'
import useListen from '../api/useListen'
import useKeyboard from '../utils/useKeyboard'
import { TimeAgo } from './TimeAgo'
import useViewCount from './useViewCount'
import ViewCount from './ViewCount'

type ViewNodeProps = {
   node: DungeonNode
   onNodeRemoved: (nodeKey: string | undefined) => void
}

const ViewNodeStyled = styled.div`
   margin-top: 15px;
   padding: 1em 1em 1em 1em;
   display: flex;
   flex-direction: column;
   border-radius: 10px;
   box-shadow: -7px -7px 20px 0px var(--shadow-light1),
      -4px -4px 5px 0px var(--shadow-light2),
      7px 7px 20px 0px var(--shadow-dark1), 4px 4px 5px 0px var(--shadow-dark2),
      inset 0px 0px 0px 0px var(--shadow-light1),
      inset 0px 0px 0px 0px var(--shadow-dark2),
      inset 0px 0px 0px 0px var(--shadow-light1),
      inset 0px 0px 0px 0px var(--shadow-dark2);
   background-color: var(--card-color);

   img {
      width: 100%;
   }
`
const HeadLink = styled(Link)`
   font-style: italic;
   color: #333;
   margin-left: 0px;
   padding-bottom: 8px;
`
const User = styled.div`
   margin-top: 5px;
   text-decoration: none;
   font-weight: 600;
`

const Message = styled.div`
   margin-top: 1em;
`

const Title = styled.h4`
   margin: 4px 0px;
   font-weight: 800;
`

const Menu = styled.div`
   flex: 1;
   display: flex;
   .simpleIcon {
      color: red;
      margin-left: 5px;
   }
   .timeAgo {
      padding-left: 7px;
      padding-top: 5px;
      font-style: italic;
   }
   .viewCount {
      padding-left: 7px;
      padding-top: 5px;
   }
   .ogLink {
      padding-left: 7px;
      padding-top: 4px;
   }
   .nodeLink {
      padding-left: 7px;
      padding-top: 4px;
   }
`

export const ViewNode: FC<ViewNodeProps> = ({ node, onNodeRemoved }) => {
   const navigate = useNavigate()
   const head = useListen(node.head, 'node', true) as DungeonNode
   const [isShowAdvanced, showAdvanced] = useState<boolean>(false)
   const [views] = useViewCount(node.key)
   const keypressed = useKeyboard(['v'])

   const derefNode = () => {
      if (!node.key) {
         return
      }
      gun.get(namespace + '/node')
         .get(node.key)
         .put(null, (awk) => {
            onNodeRemoved(node.key)
         })
   }

   useEffect(() => {
      if (keypressed === 'v') {
         showAdvanced((isShowAdvanced) => !isShowAdvanced)
      }
   }, [keypressed])

   const onPostClicked = (event) => {
      //checks to see if it was double click
      if (event.detail <= 1) {
         return
      }
      // if there's a url, let's open it!
      if (node.url) {
         return window.open(node.url, '_blank')
      }
      if (node.directionText) {
         return navigate(`/dashboard/${node.key}`)
      }
      return navigate(`/node/${node.key}`)
   }

   function stripHtml(input: string) {
      let doc = new DOMParser().parseFromString(input, 'text/html')
      return doc.body.textContent || ''
   }
   const trimWithEllip = (input: string = '', length: number) => {
      return input.length > length ? input.substring(0, length) + '...' : input
   }

   return (
      <ViewNodeStyled onClick={onPostClicked}>
         {head && (
            <HeadLink to={`/node/${node.head}`}>
               re: {trimWithEllip(stripHtml(head.message), 20)}
            </HeadLink>
         )}
         {node.directionText && <Title>{node.directionText}</Title>}
         {node.message && (
            <Message
               dangerouslySetInnerHTML={{
                  __html: node.message || '',
               }}
            ></Message>
         )}
         <br />
         <Menu>
            {node.user && <User>@{node.user}</User>}
            {node.date && <TimeAgo date={node.date}></TimeAgo>}
            <ViewCount count={views} />
            {node.url && (
               <div className="ogLink">
                  <a href={node.url} target="_blank">
                     og-link
                  </a>
               </div>
            )}

            <div className="nodeLink">
               <Link to={'/node/' + node.key}>node-link</Link>
            </div>
            {isShowAdvanced && (
               <SimpleIcon
                  content="[ ␡ ]"
                  hoverContent={'[ ␡ ]'}
                  style={Styles.warning}
                  className="simpleIcon"
                  onClick={() => derefNode()}
               />
            )}
         </Menu>
      </ViewNodeStyled>
   )
}
