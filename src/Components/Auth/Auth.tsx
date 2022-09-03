import React, { useState } from 'react'
import Login from './Login/Login'
import PasswordRecovery from './Login/PasswordRecovery/PasswordRecovery'
import CreatePassword from './Registration/CreatePassword/CreatePassword'
import RegistarationCode from './Registration/RegistarationCode/RegistarationCode'
import Registration from './Registration/Registration'

const Auth: React.FC = () => {

    const [stage, setStage] = useState(2)

    return (
        <>
            {stage === 1 && <Login setStage={setStage} />}
            {stage === 2 && <Registration setStage={setStage} />}
            {stage === 3 && <RegistarationCode setStage={setStage} />}
            {stage === 4 && <CreatePassword />}
            {stage === 5 && <PasswordRecovery setStage={setStage} />}
        </>
    )
}

export default Auth
