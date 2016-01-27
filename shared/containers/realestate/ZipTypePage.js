'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';
import _ from 'lodash';

import {Link} from 'react-router';
import config                                 from '../../config';

import {bindActionCreators} from 'redux';
import * as housesActions from '../../actions/houses';
import ListingThumbCard from '../../components/ListingThumb/ListingThumbCard.js';

class ZipTypePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.city = this.props.params.city;
        this.zipType = this.props.params.zipType;
        this.saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
        this.props.getHousesIfNeeded(this.saleRent, this.city, this.zipType);
    }

    render() {
        let city = _.startCase(this.props.params.city.replace(/-+/g, ' '));
        let saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';

        return (
            <div style={{width:'100%'}}>
                {this.props.params.street &&
                <div>
                    {this.props.children}
                </div>
                }

                {!this.props.params.street &&
                <div>
                    {this.props.houses &&
                    <div>
                        <ul
                            style={{listStyle:'none', margin:'0px', padding:'0px'}}>
                            <li style={{display:'inline-block'}}>
                                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                      to="/houses-for-sale">Houses
                                    For Sale
                                </Link>
                                <span> / </span>
                            </li>
                            <li style={{display:'inline-block'}}>
                                <Link style={{textDecoration:'none', fontSize:13, color:'#424242'}}
                                      to={`/houses-for-${saleRent}/${city.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                    {_.startCase(city)}
                                </Link>
                                <span> / </span>
                            </li>
                            <li style={{display:'inline-block'}}>
                            <span style={{textDecoration:'none', fontSize:13, color:'#757575'}}>
                                {this.props.params.zipType}
                            </span>
                            </li>
                        </ul>
                        <h1 style={{fontSize:28}}>
                            {city} Houses for Sale </h1>
                        <hr/>

                        <ul style={{listStyle:'none',padding:0}}>
                            {this.props.houses.map(house=> {
                                return (
                                    <li style={{marginBottom:16,padding:0}}
                                        key={house.mls + house.city}>
                                        <Link
                                            to={this.props.location.pathname+'/'+house.address.street.toLowerCase().replace(/[\.\,]/g,'').replace(/[\s+]/g,'-')}>
                                            <ListingThumbCard house={house}/></Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    }
                </div>}
            </div>

        );
    }
}
function mapStateToProps(state) {
    return state.houses;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(housesActions, dispatch);
}
ZipTypePage.need = [
    housesActions.getHousesIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(ZipTypePage);



