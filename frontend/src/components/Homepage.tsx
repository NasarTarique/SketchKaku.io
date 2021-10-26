import {Link} from 'react-router-dom';
import  {getuser} from './store/actions'
import  { connect , ConnectedProps }  from 'react-redux';
import  { RootState } from './store/store'

const Homepage = (props:Propsfromredux) => {
  return (
    <div className="main-page">
      <div>
			  <input id="username" type="text" placeholder="Username" onChange={(e)=>props.userChange(e.target.value)} value={props.user} />
      </div>
      <div className="create-link mplink">
        <Link to="/create">CREATE</Link>
      </div>
      <div className="join-link mplink">
        <Link to="/join">JOIN</Link>
      </div>
      <div className="lobby-link mplink">
        <Link to="/lobby">LOBBY</Link>
      </div>
    </div>
  );
};

const mapState = (state:RootState) =>({
		user:state.user
})

const mapDispatch = {
		userChange: (username:string)=>getuser(username),
}
const connector = connect(mapState,mapDispatch);
type Propsfromredux = ConnectedProps<typeof connector>
export default connector(Homepage);
