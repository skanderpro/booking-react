import React, {Component} from "react";
import MainLayout from "../layouts/MainLayout";
import HomeBanner from "../components/components/HomeBanner";
import ClassesContainer from "../components/components/ClassesContainer";
import ExploreVenues from "../components/components/ExploreVenues";
import {connect} from 'react-redux';
import {fetchAllClasses} from './../redux/actions/classesAction';



class Home extends Component{

    state = {
        classes:[]
    }

    componentDidMount() {
        this.props.fetchAllClasses().then(response => {
            this.setState({
                classes:[...response.data[0]]
            })
        });
    }

    render() {
        return <MainLayout>
                <div className={'home-page'}>
                    <HomeBanner imageUrl={require('./../assets/images/3c7f5381e2dd10744597d4ffe67b8f38.jpg').default} />
                    <ClassesContainer classes={this.state.classes}/>
                    <ExploreVenues />
                </div>
            </MainLayout>;
    }
}
function mapStateToProps(state){
    return {};
}
function mapDispatchToProps(dispatch){
    return {
        fetchAllClasses:() => {
            return dispatch(fetchAllClasses())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home) ;