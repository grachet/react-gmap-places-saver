import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import fetch from "cross-fetch";

const styles = theme => ({
  root: {
    padding: 20,
    marginTop: 100,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function renderInputComponent(inputProps) {
  const {
    classes, inputRef = () => {
    }, ref, ...other
  } = inputProps;

  return (
    <TextField
      autoFocus
      variant={"filled"}
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
  const matches = match(suggestion.properties.name, query);
  const parts = parse(suggestion.properties.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{fontWeight: 500}}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{fontWeight: 300}}>
              {part.text}
            </strong>
          );
        })}

        <strong key={1} style={{fontWeight: 300}}>
          {" "}  - {suggestion.properties.country}
        </strong>
      </div>
    </MenuItem>
  );
}


function getSuggestions(data) {
  let suggestions = data.features

  console.log("suggestions", suggestions);
  return suggestions
}

function shouldRenderSuggestions(value) {
  return value.trim().length > 2;
}

function getSuggestionValue(suggestion) {
  console.log(suggestion) //todo
  return suggestion.properties.name;
}


class PlaceSearcher extends React.Component {

  state = {
    searchValue: '',
    suggestions: [],
  };


  handleSuggestionsFetchRequested = ({value}) => {
    fetch("http://photon.komoot.de/api/?q=" + value + "&lang=fr&limit=4")
      .then(rep => rep.json())
      .then(data => this.setState({
        suggestions: getSuggestions(data),
      }))
      .catch(error => {
        console.error(error);
      });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = () => (event, {newValue}) => {
    this.setState({
      searchValue: newValue,
    });
  };

  render() {
    const {classes} = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      shouldRenderSuggestions,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            label: "Search a place",
            value: this.state.searchValue,
            onChange: this.handleChange(),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}

PlaceSearcher.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaceSearcher);
