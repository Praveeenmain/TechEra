import './index.css'
import {Link} from 'react-router-dom'

const ItemCard=(props)=>{
    const{cardDetails}=props
    const{logoUrl,id,name}=cardDetails
    return(
       <Link className="link" to={`/courses/${id}`} >
        <li className="card">
        <img className="logo" src={logoUrl} alt={name}/>
        <h1 className="logoname"> {name}</h1>
        </li>
        </Link>
    )
}
export default ItemCard