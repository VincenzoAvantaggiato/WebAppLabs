import { ListGroup } from "react-bootstrap";

function SideBar (props) {
    return(
        <ListGroup className="my-2 mx-2">

            <ListGroup.Item active={props.list[0]} onClick={()=>props.setActive(0)}>All</ListGroup.Item>
            <ListGroup.Item active={props.list[1]} onClick={()=>props.setActive(1)}>Favorites</ListGroup.Item>
            <ListGroup.Item active={props.list[2]} onClick={()=>props.setActive(2)}>Best rated</ListGroup.Item>
            <ListGroup.Item active={props.list[3]} onClick={()=>props.setActive(3)}>Seen last month</ListGroup.Item>
            <ListGroup.Item active={props.list[4]} onClick={()=>props.setActive(4)}>Unseen</ListGroup.Item>
        </ListGroup>
    )
}

export default SideBar;