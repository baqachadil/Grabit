import React from 'react'
import FacebookLogin from 'react-facebook-login' 

export default function FacebookComponent({componentClicked, responseFacebook}) {


    return (
        <FacebookLogin appId="1082097762141876"
            autoLoad={false}
            fields="name,email,picture"
            icon="fa-facebook"
            onClick={componentClicked}
            callback={responseFacebook}/>
    )
}
