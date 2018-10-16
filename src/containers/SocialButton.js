import React from 'react'
import SocialLogin from 'react-social-login'
import Button from '@material-ui/core/Button';

const socialButton = ({children, triggerLogin,color, ...props}) => (
  <Button onClick={triggerLogin} {...props} variant="contained" style={{margin:10, borderRadius: 2,backgroundColor:color}} color="primary">
    {children}
  </Button>
)

export default SocialLogin(socialButton)