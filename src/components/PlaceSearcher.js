import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import fetch from "cross-fetch";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {Select as SelectMUI, TextField as TextFieldMUI} from "formik-material-ui";
import {DatePicker} from 'material-ui-pickers';
import Button from "@material-ui/core/Button/Button";
import styles from "./styles/placeStyle"

import Grid from '@material-ui/core/Grid';

function renderInputComponent(inputProps) {
  const {
    classes, inputRef = () => {
    }, ref, ...other
  } = inputProps;

  return (
    <TextField
      margin="normal"
      autoFocus
      required
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
          {" "} - {suggestion.properties.country}
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

  renderTextfield = (name,title,notRequired,multiline) => {
    return (
      <div className={this.props.classes.fieldContainer} key={title}>
        <Field
          required={!notRequired}
          className={this.props.classes.field}
          margin="normal"
          multiline={multiline}
          variant={"filled"}
          label={title}
          name={name}
          component={TextFieldMUI}
        />
      </div>
    )
  }

  renderDateTime = (name,title) => {
    return (
      <div className={this.props.classes.fieldContainer} key={title}>
        <Field
          name={name}
          render={({
                     form: {setFieldValue},
                     field: {value, name},
                     ...rest
                   }) => {
            return (
              <DatePicker
                margin="normal"
                name={name}
                required
                className={this.props.classes.field}
                keyboard
                clearable
                variant={"filled"}
                autoOk
                label={title}
                format="dd/MM/yyyy"
                placeholder="01/01/2018"
                mask={value =>
                  value
                    ? [/[0-3]/, /\d/, "/", /0|1/, /\d/, "/", /1|2/, /\d/, /\d/, /\d/]
                    : []
                }
                disableOpenOnEnter
                onChange={value => {setFieldValue(name, value);}}
                value={value}
                animateYearScrolling={false}
              />
            );
          }}
        />
      </div>


    )
  }

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

        <Formik
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={(values, {setSubmitting}) => {
            alert(values)
            setSubmitting(false);
          }}
          validationSchema={Yup.object().shape(
            {}
          )}
        >
          {({values}) => (
            <Form>
              {this.renderTextfield("name","Name",true)}
              {this.renderTextfield("description","Description",false,true)}
              <Grid container className={classes.fieldContainer} spacing={24}>
                <Grid className={classes.field} item xs={6}>
                  {this.renderDateTime("arrival","Arrival")}
                </Grid>
                <Grid className={classes.field} item xs={6}>
                  {this.renderDateTime("departure","Departure")}
                </Grid>
              </Grid>

              <Button submit variant="contained" className={classes.mymd} color="secondary">
                      Add Place
              </Button>

            </Form>
          )}
        </Formik>

      </div>
    );
  }
}

PlaceSearcher.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaceSearcher);
