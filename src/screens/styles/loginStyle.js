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
    }
}