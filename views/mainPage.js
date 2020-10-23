class mainRage extends React.Component{

    constructor(props){

        super(props);
        this.state = {checked:flase};
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({checked : event.target.checked})
    }

    render(){
        return(

        <div>
            <input type= "checkbox" checked={this.state.checked} onChange={this.handleChange}/>
        </div>

        )
    }

}