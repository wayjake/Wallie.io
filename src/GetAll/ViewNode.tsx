import { FC } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { SimpleIcon, Styles } from '../Interface'
import { DungeonNode } from '../Nodes'
import gun, { namespace } from '../gun'
import { useNavigate } from 'react-router-dom'
import useListen from '../GunApi/useListen'

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
   box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001, inset 0px 0px 0px 0px #fff9,
      inset 0px 0px 0px 0px #0001, inset 0px 0px 0px 0px #fff9,
      inset 0px 0px 0px 0px #0001;
   transition: box-shadow 0.6s cubic-bezier(0.79, 0.21, 0.06, 0.81);
`
const HeadLink = styled(Link)`
   font-style: italic;
   color: #333;
   margin-left: -5px;
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

const Menu = styled.div`
   flex: 1;
   display: flex;
   .simpleIcon {
      color: red;
      margin-left: 5px;
   }
`

export const ViewNode: FC<ViewNodeProps> = ({ node, onNodeRemoved }) => {
   const navigate = useNavigate()
   const head = useListen(node.head, 'node', true)
   const derefNode = () => {
      gun.get(namespace + '/node')
         .get(node.key)
         .put(null, (awk) => {
            console.log(`deleted ${node.key} awk:`, awk)
            onNodeRemoved(node.key)
         })
   }

   const onPostClicked = (event) => {
      if (event.detail > 1) {
         navigate(`/node/${node.key}`)
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
         {node.user && <User>@{node.user}</User>}
         <Message
            dangerouslySetInnerHTML={{
               __html: node.message || 'EMPTY MESSAGE',
            }}
         ></Message>
         <br />
         <Menu>
            <SimpleIcon
               content="[ ␡ ]"
               hoverContent={'[ ␡ ]'}
               style={Styles.warning}
               className="simpleIcon"
               onClick={() => derefNode()}
            />
         </Menu>
      </ViewNodeStyled>
   )
}
