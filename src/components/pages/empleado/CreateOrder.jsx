import React from 'react';
import { withRouter } from 'react-router';
import API from '../../../service/api';
import StepForm from '../../component/StepForm';
import Lottie from 'lottie-react';
import spin from '../../img/Animation -SpinLoading.json';
import check from '../../img/Animation - Check.json';
import { wait } from '@testing-library/user-event/dist/utils';
import logo from "../../img/bistrot.jpg";

class CreateOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            form: this.formComponent(),
            content: {},
            flag: false,
            checkFlag: false
        }
    }

    componentDidMount(){
        if(this.props.content === undefined){this.props.history.push('/');}
        else{
            this.setState(state => ({content: this.props.content}));
        }
    }

    getMenu = () => {
        console.log(this.state.content);
        const headers= {
            auth: {username: this.state.content.email, password: this.state.content.pass}
        }
        return API.getAuth('menu/'+this.state.content.menuId, headers)
    }

    formComponent = () => <StepForm menu={this.getMenu} create={this.doCreate} {...this.props}/>

    doCreate = (plt, beb) =>{
        console.log(this.state);
        console.log(plt);
        console.log(beb);
        const headers= {
            auth: {username: this.state.content.email, password: this.state.content.pass}
        }
        this.setState(state => ({flag: true}))
        API.post('orden/new', {
            mesaId: this.state.content.mesaId,
            mozoId: this.state.content.id,
            bebidas: beb,
            platos: plt
        }, headers)
        .then(res => {
            console.log(res);
            wait(3000).then(res => {
                this.setState(state => ({checkFlag: true}));
            }).then(res2 => 
                wait(2000).then(res2 => {
                    this.props.history.push('/table', this.state.content)
                }))
        })
        .catch(err => console.log(err.message));
    }

    renderLoad(){
        if(this.state.flag && !this.state.checkFlag){
            return (
                <div>
                    <div className='card' 
                        style={{
                            marginTop: '2%',
                            marginLeft:'3%', 
                            marginRight:'3%',
                            zIndex: '0', 
                            backgroundColor: 'rgba(250, 250, 250, 0.4)', 
                            borderRadius:'20px',
                            height:'120'
                        }}>
                        <Lottie
                            animationData={spin}
                            style={{
                                right: "50%",
                                zIndex: 1,
                                overflow: "hidden",
                                width: '30%',
                                height: '30%',
                                margin: '0 auto'
                            }}
                        />
                    </div>
                </div>
            )
        }else{
            return(
            <div>

                <div className='card' 
                style={{
                    marginTop: '2%',
                    marginLeft:'3%', 
                        marginRight:'3%',
                        zIndex: '0', 
                        backgroundColor: 'rgba(250, 250, 250, 0.4)', 
                        borderRadius:'20px',
                        height:'120'
                    }}
                    >
                    <Lottie
                    animationData={check}
                    style={{
                        right: "50%",
                        zIndex: 1,
                        overflow: "hidden",
                        width: '30%',
                        height: '30%',
                        margin: '0 auto'
                    }}
                    />
                </div>
            </div>
            )
        }
    }

    renderComponent(){
        if(this.state.flag){
            return (
            <div className='base' style={{
                backgroundImage: `url(${logo})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
                zIndex: '-10'
            }}>
                <div className='navbar' style={{
                    backgroundColor: 'green',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    zIndex: 10
                }}>
                </div>
                {this.renderLoad()}
            </div>
            
        )}
        else{
            return this.state.form;
        }
    }

    render(){
        return(
            <React.Fragment>
                {
                    this.renderComponent()
                }
            </React.Fragment>
        );
    }
}

export default withRouter(CreateOrder)