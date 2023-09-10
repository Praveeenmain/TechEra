import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import './index.css'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ItemCardDetails extends Component{
    state={
         itemDetails:{},
         apiStatus: apiStatusConstants.initial,
    }
     renderNavBar=()=>(
         <div className="Image-logo-container">
          <img className="logo" src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png" alt="website logo"/>

         </div>

     )
    componentDidMount(){
      this.getItemDetails()
    }
    getItemDetails=async()=>{
        const {match} = this.props
        const {params} = match
        const {id} = params
          this.setState({
          apiStatus: apiStatusConstants.inProgress,
        })
        const response=await fetch(`https://apis.ccbp.in/te/courses/${id}`)
        const data=await response.json()
        console.log(data)
        if(response.ok){
              const updatedData={
                description:data.course_details.description,
                id:data.course_details.id,
                imageUrl:data.course_details.image_url,
                name:data.course_details.name


              }
            
              this.setState({
                itemDetails:updatedData,
                apiStatus: apiStatusConstants.success
              })




        }else{
            this.setState({
                apiStatus: apiStatusConstants.failure,
              })
      }
    


    
    }
    getSuccess=()=>{
         const{itemDetails}=this.state
         
         return(
              <div className="card-container">
                  <div>
                  <img className="image" src={itemDetails.imageUrl} alt={itemDetails.name}/>
                  </div>
                    <div>
                    <h1> {itemDetails.name}</h1>
                    <p> {itemDetails.description}</p>
                  </div>
              </div>



          
         )
    }
    getLoader=()=>(
      <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
    getfailureView=()=>(
      <div>
       <img src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png" alt=" failure view"/>
       <h1> Something went wrong</h1>
       <p> We canot see to find the page</p>
       <Link to="/courses/:id"> <button> Retry</button> </Link>

      </div>

    )
    getViews=()=>{
       const {apiStatus}=this.state
        switch (apiStatus) {
        case apiStatusConstants.success:
          return this.getSuccess()
        case apiStatusConstants.failure:
          return this.getfailureView()
        case apiStatusConstants.inProgress:
          return this.getLoader()
        default:
          return null
    }
      
   



   }
    render(){
      return(
        <>
        {
          this.renderNavBar()
        }
         {
          this.getViews()
         }
        </>
      )
    }

  } 
  export default ItemCardDetails