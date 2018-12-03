import {color} from '../../data/color'

export default {
  root: {
    backgroundColor: color.background,
    height: "100vh",
    width: "100vw",
    textAlign: 'center',
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
    display: "inline-block",
    padding: 30,
    textAlign: 'center',
    marginTop: "20%",
    backgroundColor: color.containerBackground
  },
  buttonLoginFacebook:
    {
      margin: 10,
      borderRadius: 2,
      backgroundColor: "#3b5998"
    },
  buttonLoginGoogle:
    {
      margin: 10,
      borderRadius: 2,
      backgroundColor: "#DF4B37"
    },
  buttonLoginLinkedIn:
    {
      margin: 10,
      borderRadius: 2,
      backgroundColor: "#0D77B7"
    }
}