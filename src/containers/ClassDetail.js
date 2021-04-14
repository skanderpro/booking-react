import React, {Component} from "react";
import MainLayout from "../layouts/MainLayout";
import DetailClassTopBanner from "../components/components/DetailClassTopBanner";
import ClassDetailTopBlock from "../components/components/ClassDetailTopBlock";
import ClassDetailContentContainer from "../components/components/ClassDetailContentContainer";
import ShopBanner from "../components/components/ShopBanner";

class ClassDetail extends Component{

    componentDidMount() {
        this.calcClassDetailTopContainer();
        window.onresize = (event) => {
           this.calcClassDetailTopContainer();
        };
    }

    calcClassDetailTopContainer = () => {
        let height = document.getElementById('class-detail-top-block').offsetHeight;
        document.getElementById('class-detail-container').style.paddingTop = `${170 + 90 + (height - 410)}px`;
        console.log(height )
    }

    render() {
        return <MainLayout>
            <DetailClassTopBanner />
            <div className={'class-detail-container'} onLoad={this.calcClassDetailTopContainer}  id={'class-detail-container'}>
                <ClassDetailTopBlock />
                <ClassDetailContentContainer />

            </div>
            <ShopBanner />
        </MainLayout>;
    }
}
export default ClassDetail;