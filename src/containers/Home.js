import React, {Component} from "react";
import MainLayout from "../layouts/MainLayout";
import HomeBanner from "../components/components/HomeBanner";
import ClassesContainer from "../components/components/ClassesContainer";
import ExploreVenues from "../components/components/ExploreVenues";

class Home extends Component{
    render() {
        return <MainLayout>
                <div className={'home-page'}>
                    <HomeBanner imageUrl={require('./../assets/images/3c7f5381e2dd10744597d4ffe67b8f38.jpg').default} />
                    <ClassesContainer />
                    <ExploreVenues />
                </div>
            </MainLayout>;
    }
}
export default Home;