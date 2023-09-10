import {Component} from 'react'
import './index.css'
import ItemCard from '../ItemCard'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}


class Home extends Component{
     state={
        courses:[],
        apiStatus: apiStatusConstants.initial,
     }
    renderNavBar=()=>(
         <div className="Image-logo-container">
        <Link to="/">  <img className="logo" src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png" alt="website logo"/> </Link>

         </div>

    )
    componentDidMount(){
      this.getCourses()
    }
    getCourses=async()=>{
        this.setState({
          apiStatus: apiStatusConstants.inProgress,
        })
        const response=await fetch("https://apis.ccbp.in/te/courses")
        const fetcheddata=await response.json()
        if(response.ok){
              const updateddetails=fetcheddata.courses.map(each=>({
                  id:each.id,
                  logoUrl:each.logo_url,
                  name:each.name

              }))
              this.setState({courses:updateddetails,
                apiStatus: apiStatusConstants.success,})
            
        }else{
            this.setState({
            apiStatus: apiStatusConstants.failure,
          })
        }




    }
    displayCourses=()=>{
         const{courses}=this.state
        return(
          <ul className="cards">
            {
              courses.map(each=>(
                <ItemCard cardDetails={each} key={each.id}/>
              ))
            }

          </ul>
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
       <Link to="/"> <button> Retry </button> </Link>

      </div>

    )
     getViews=()=>{
       const {apiStatus}=this.state
        switch (apiStatus) {
        case apiStatusConstants.success:
          return this.displayCourses()
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
          {this.renderNavBar()}
          {this.getViews()}
        </>
        )
    }
}
export default Home