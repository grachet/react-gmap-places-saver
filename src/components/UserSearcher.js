import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';


function renderInputComponent(inputProps) {
  const {
    classes, inputRef = () => {
    }, ref, ...other
  } = inputProps;

  return (
    <TextField
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

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function match(text, query) {
  return (
    query
      .trim()
      .split(" ")
      .reduce((result, word) => {
        if (!word.length) return result;
        const wordLen = word.length;
        const regex = new RegExp(escapeRegexCharacters(word), 'i');
        const {index = -1} = text.match(regex);
        if (index > -1) {
          result.push([index, index + wordLen]);
          // Replace what we just found with spaces so we don't find it again.
          text =
            text.slice(0, index) +
            new Array(wordLen + 1).join(' ') +
            text.slice(index + wordLen);
        }
        return result;
      }, [])
      .sort((match1, match2) => {
        return match1[0] - match2[0];
      })
  );
};

function renderSuggestion(suggestion, {query, isHighlighted}) {
  const matches = match(suggestion.title, query);
  const parts = parse(suggestion.title, matches);

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
      </div>
    </MenuItem>
  );
}

const styles = theme => ({
  root: {
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

class IntegrationAutosuggest extends React.Component {

  state = {
    single: '',
    suggestions: [],
  };

  getSuggestionValue = (suggestion) => {
    this.props.setUser(suggestion.value);
    return suggestion.title;
  }



  getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim().toLowerCase());
    let count = 0;

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp(escapedValue, 'i');
    return this.props.users.filter(suggestion => regex.test(suggestion.title)).slice(0, 4);
  }

  // getSuggestions = (value) => {
  //   const inputValue = deburr(value.trim()).toLowerCase();
  //   const inputLength = inputValue.length;
  //   let count = 0;
  //
  //   //todo
  //   return inputLength === 0
  //     ? []
  //     : this.props.users.filter(suggestion => {
  //       const keep =
  //         count < 4 && suggestion.title.slice(0, inputLength).toLowerCase() === inputValue;
  //
  //       if (keep) {
  //         count += 1;
  //       }
  //
  //       return keep;
  //     });
  // }


  handleSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, {newValue}) => {
    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const {classes} = this.props;

    console.log("users", this.props.users);

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Search users from our database',
            value: this.state.single,
            onChange: this.handleChange('single'),
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

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
