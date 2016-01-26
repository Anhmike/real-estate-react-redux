'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import Grid, {Cell} from 'react-mdl/lib/Grid';
import {Card, CardTitle, CardActions} from 'react-mdl/lib/Card';
import {connect}                   from 'react-redux';
import strformat                     from 'strformat';
import {Link} from 'react-router';
import config                                 from '../../config';
import {sendEvent}                          from '../../utils/googleAnalytics';
import CityCard from '../../components/City/CityCard';

import {bindActionCreators} from 'redux';
import * as articleActions from '../../actions/article';
import * as zipsActions from '../../actions/zips';

class HousesForSalePageContainer extends Component {
    static contextTypes = {i18n: PropTypes.object};

    state = {
        linkToShare: '',
        isSharing: false
    };

    handleQuizCardClick = (article) => {
        this.props.history.pushState(null, `/articles/${article.id}`, {
            embed: this.props.location.query.embed,
            assigneeId: this.props.location.query.assigneeId
        });

        sendEvent('article card', 'view details');
    };

    handleTabChange = (category) => {
        this.props.history.pushState(null, this.props.location.pathname, {
            ...this.props.location.query,
            category: category !== 'ALL' ? category : undefined
        });

        sendEvent('articles page', 'category', category);
    };

    componentDidMount() {
        this.props.getZIPsIfNeeded();
    }

    componentWillReceiveProps(nextProps) {
        this.cities = _.unique(_.pluck(nextProps.zips, 'key').map(city=>city.toLowerCase().trim()));
    }

    render() {
        return (
            <div style={{maxWidth:"100%"}}>

                {this.cities &&
                <Grid>
                    {this.cities.map(city=> {
                        return (
                            <Cell
                                cols="4"
                                key={city}>
                                <Link to="houses-for-sale/:city">
                                    {city}
                                </Link>
                            </Cell>
                        );
                    })}
                </Grid>
                }

                {this.props.params.city &&
                <div>
                    {this.props.children}

                </div>
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    return state.zips;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(zipsActions, dispatch);
}
HousesForSalePageContainer.need = [
    zipsActions.getZIPsIfNeeded
]
export default connect(mapStateToProps, mapDispatchToProps)(HousesForSalePageContainer);




