import './App.css'
import Home from './components/Home'
import {Route, Switch} from 'react-router-dom'
import ItemCardDetails from './components/ItemCardDetails'

const App = () => (
   <Switch>
          
          <Route exact path="/" component={Home} />
       
          <Route
            exact
            path="/courses/:id"
            component={ItemCardDetails}
          />
         
        
          
        </Switch>


)

export default App
