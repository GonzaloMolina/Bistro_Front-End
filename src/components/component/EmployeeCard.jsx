
import React from 'react';
import { withRouter } from 'react-router';


class EmployeeCard extends React.Component{
    
    handleOnClick(){
        this.props.history.push('/employee', this.props.employee);
    }

    render(){
        return (
            <React.Fragment>
                <div>
                    <div style={{margin: '2px'}}>
                        <button type='button' className='btn btn-secondary'
                            onClick = {() => {this.handleOnClick()}}
                        >
                            {this.props.employee.apellido+", "+ this.props.employee.nombre}
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(EmployeeCard);