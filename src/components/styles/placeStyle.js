import createStyles from '../../styleGlobal'

const style = {
  fieldContainer: {
    display: "flex"
  },
  field: {
    flexGrow: 1
  },
  root: {
    padding: 20,
    marginTop: 80,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 100,
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
    height: 16,
  },
};

export default createStyles(style)