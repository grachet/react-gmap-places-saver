import React, {Component} from 'react'
import {withStyles} from "@material-ui/core";

import styles from './styles/placeStyle'

 class TravelMap extends Component {

    render() {
        return (

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                />
            </div>

        )
    }
}


export default withStyles(styles)(TravelMap);