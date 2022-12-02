import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SimpleIcon, Styles } from '../Interface'
import { DungeonNode } from '../Nodes'
import gun, { namespace } from '../gun'
import { useNavigate } from 'react-router-dom'
import useListen from '../GunApi/useListen'
import useKeyboard from '../utils/useKeyboard'
import { TimeAgo } from './TimeAgo'

type ViewNodeProps = {
   node: DungeonNode
   onNodeRemoved: (nodeKey: string) => void
}

const ViewNodeStyled = styled.div`
   margin-top: 15px;
   padding: 1em 1em 1em 1em;
   display: flex;
   flex-direction: column;
   border-radius: 10px;
   box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #e7e7e799,
      7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001, inset 0px 0px 0px 0px #fff9,
      inset 0px 0px 0px 0px #0001, inset 0px 0px 0px 0px #fff9,
      inset 0px 0px 0px 0px #0001;
   transition: box-shadow 0.6s cubic-bezier(0.79, 0.21, 0.06, 0.81);
   background-color: white;

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

const Title = styled.div`
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
`

export const ViewNode: FC<ViewNodeProps> = ({ node, onNodeRemoved }) => {
   const navigate = useNavigate()
   const head = useListen(node.head, 'node', true)
   const [isShowAdvanced, showAdvanced] = useState<boolean>(false)
   const keypressed = useKeyboard(['v'])

   const derefNode = () => {
      gun.get(namespace + '/node')
         .get(node.key)
         .put(null, (awk) => {
            console.log(`deleted ${node.key} awk:`, awk)
            onNodeRemoved(node.key)
         })
   }

   useEffect(() => {
      if (keypressed === 'v') {
         showAdvanced((isShowAdvanced) => !isShowAdvanced)
      }
   }, [keypressed])

   const onPostClicked = (event) => {
      if (event.detail > 1) {
         if (node.directionText) {
            return navigate(`/dashboard/${node.key}`)
         }
         navigate(`/node/${node.key}`)
         return
      }
      if (node.url) {
         return window.open(node.url, '_blank')
      }
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
         <Title>{node.directionText}</Title>
         <Message
            dangerouslySetInnerHTML={{
               __html: node.message || '',
            }}
         ></Message>
         <br />
         <Menu>
            {node.user && <User>@{node.user}</User>}
            {node.date && <TimeAgo date={node.date}></TimeAgo>}
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
