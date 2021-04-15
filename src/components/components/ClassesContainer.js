import React,{useEffect} from "react";
import { Search } from 'akar-icons';
import {connect} from 'react-redux'
const feather = require('feather-icons');

function ClassesContainer(props) {
    useEffect(() => {
        console.log(feather.icons)
    },[])

    return <div className={'classes-section'}>
        <div className={'classes-container'}>
            <div className={'classes-search'}>
                <div className={'search-title'}>
                    Class search
                </div>
                <div className={'search-navs row no-gutters'}>
                    <div className={'col-lg-3 search-field-container'}>
                        <div className={'input-container '}>
                            <span className={'icon icon-search'}><Search /></span>
                            <input type={'text'} className={'input-field'}/>
                        </div>
                    </div>
                    <div className={'col-lg-3 location-container'}>
                        <span className={'icon icon-location'} dangerouslySetInnerHTML={{__html: feather.icons['map-pin'].toSvg()}}/>
                        <select>
                            <option>Class Location</option>
                            <option>Text</option>
                        </select>

                    </div>
                    <div className={'col-lg-3 skill-container'}>
                        <span  className={'icon icon-skill'} dangerouslySetInnerHTML={{__html: feather.icons['layers'].toSvg()}}/>
                        <select>
                            <option>Skill level</option>
                            <option>Text</option>
                        </select>
                    </div>
                    <div className={'col-lg-3 button-container text-right'}>
                        <button className={'btn btn-pink btn-search-classes '}>Find class</button>
                    </div>
                </div>
            </div>
            <h2 className={'portfolio-navs-header'}>Our Great Classes</h2>
            <div className={'portfolio-navs text-center'}>
                <span className={'d-inline-block portfolio-nav active'}>
                    All Levels
                </span>
                <span  className={'d-inline-block portfolio-nav'}>
                    Beginner
                </span>
                <span  className={'d-inline-block portfolio-nav'}>
                    Enthusiast
                </span>
                <span className={'d-inline-block portfolio-nav'}>
                    Experienced
                </span>
                <span className={'d-inline-block portfolio-nav'}>
                    Advanced
                </span>
                <span className={'d-inline-block portfolio-nav'}>
                    Professional
                </span>
            </div>
            <div className={'classes-list row'}>
                { props.classes.map((classItem, index) =>  {
                    console.log(classItem)
                    return <div className={'classes-item col-lg-4 col-md-6'} key={`classesItem_${index}`}>
                        <div className={'classes-item-container'}>
                            <div className={'image-container'}
                                 style={{backgroundImage: `url(${props.settings.mainUrl + `/storage/${classItem.image_url}`})`}}>

                            </div>
                            <div className={'text-container'}>
                                <span className={'btn btn-pink class-level d-inline-block'}>{classItem.level}</span>
                                <div className={'meta-block row'}>
                                    <div className={'col-6 date-container'}>
                                        <span className={'icon'}><i className="far fa-calendar-alt"></i></span>
                                        <span className={'text'}>{classItem.date}</span>
                                    </div>
                                    <div className={'col-6 location-container'}>
                                        <span className={'icon'}><i className="fas fa-map-marker-alt"></i></span>
                                        <span className={'text'}>Glasgow, UK</span>
                                    </div>

                                </div>
                                <div className={'class-title'}>
                                    {classItem.name}
                                </div>
                            </div>
                        </div>

                    </div>

                })

                }
            </div>

        </div>
    </div>
}
function mapStateToProps(state) {
    return {

        settings: state.settings,
    };
}
export default connect(mapStateToProps)(ClassesContainer);