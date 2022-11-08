import React, { useState } from 'react'
import RegProfile from './RegProfile'
import CardRegistration from './CardRegistration'
export interface userData {
    nameSurname: string,
    deliviryAddress: string,
    userEmail: string
}
const RegistrationProfileIndex: React.FC = () => {
    // const location = useLocation().pathname
    const [stage, setStage] = useState(1)
    const [userData, setUserData] = useState<userData>()
    return (
        <>
            {stage === 1 && <RegProfile setStage={setStage} setUserData={setUserData} />}
            {stage === 2 && <CardRegistration setStage={setStage} userData={userData} />}
        </>
    )
}

export default RegistrationProfileIndex