import {color} from '../../data/color'

export default {
  root: {
    backgroundColor: color.background,
    height: "100vh",
    width: "100vw"
  },
  grow: {
    flexGrow: 1,
  },
  icon: {
    marginRight: 10,
    verticalAlign: 'middle'
  },
  loginTitle: {

    color: color.text
  },
  loginSubtitle: {
    color: color.accent,
    marginBottom: 10
  },
  paperContainer: {
    padding: 30,
    textAlign: 'center',
    position: 'absolute',
    margin: "auto",
    top: '20%',
    backgroundColor: color.containerBackground
  }
}