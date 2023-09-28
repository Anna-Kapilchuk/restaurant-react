import { BuildOutlined } from "@mui/icons-material"
import { Box, Button, Container, Input, LinearProgress, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { SetUserContext, UserContext } from "../restaurantContext/Context"
import axios from "axios"
import { UPLOAD_PROFILE_IMG_URL } from "../infra/urls"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './Profile.css'


const Profile = () => {

    const [file, setFile] = useState('')
    const user = useContext(UserContext)
    const setUser = useContext(SetUserContext)
    const [inFlight, setInFlight] = useState(false)
    const [progress, setProgress] = useState(0);

    const handlefileSelect = (event) => {
        if (event.target.files) {
            setFile(event.target.files[0])
        }
    }

    const handleUploadProgress = (progressEvent) => {
        setProgress(progressEvent.progress * 100)
    }

    const handleUploadClick = async () => {
        setInFlight(true)
        const response = await axios.post(UPLOAD_PROFILE_IMG_URL, 
            {file: file}, 
            {headers: {'Content-Type': 'multipart/form-data'},
            onUploadProgress: handleUploadProgress}
            )
            setUser({user: response.data})
            setInFlight(false)

    }

    return(
        <>
        <Container>
            <section className="vh-100" style={{ backgroundColor: 'white'}}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="12" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                        <MDBRow className="g-0">
                            <MDBCol md="12" className="gradient-custom text-center text-white"
                            style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                            <MDBCardImage src={user?.user?.img_url}
                                alt="Avatar" className="my-5" style={{ width: '20em', borderRadius: '50%' }} fluid />
                            <MDBTypography tag="h5">{`${user?.user?.first_name} ${user?.user?.last_name}`}</MDBTypography>
                            </MDBCol>
                            <MDBCol md="12">
                            <MDBCardBody className="p-4">
                            <input type="file" accept="image/*" onChange={handlefileSelect} />
                                <Button onClick={handleUploadClick} disabled={inFlight || file == ''}>UPLOAD</Button>
                                <hr className="mt-0 mb-4" style={{color:'white'}} />
                                <MDBTypography tag="h6">Information</MDBTypography>
                                <hr className="mt-0 mb-4" />
                                <MDBRow className="pt-1">
                                <MDBCol size="12" className="mb-3">
                                    <MDBTypography tag="h6">Email</MDBTypography>
                                    <MDBCardText className="text-muted">{user?.user?.email}</MDBCardText>
                                </MDBCol>
                                <MDBCol size="12" className="mb-3">
                                    <MDBTypography tag="h6">Address</MDBTypography>
                                    <MDBCardText className="text-muted">{user?.user?.address}</MDBCardText>
                                </MDBCol>
                                </MDBRow>

                                <MDBTypography tag="h6">Information</MDBTypography>
                                <hr className="mt-0 mb-4" />
                                <MDBRow className="pt-1">
                                <MDBCol size="12" className="mb-3">
                                    <MDBTypography tag="h6"></MDBTypography>
                                    <MDBCardText className="text-muted"></MDBCardText>
                                </MDBCol>
                                <MDBCol size="12" className="mb-3">
                                    <MDBTypography tag="h6"></MDBTypography>
                                    <MDBCardText className="text-muted"></MDBCardText>
                                </MDBCol>
                                </MDBRow>

                            </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                        </MDBCard>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </section>
                </Container>
                    </>
    )
}

export default Profile


{/* <>
<Container style={{marginTop:'3em'}}>
        {inFlight &&
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
        }
        <img src={user?.user?.img_url} height={'300em'}/>
        <br/>
        <input type="file" accept="image/*" onChange={handlefileSelect} />
        <Button onClick={handleUploadClick} disabled={inFlight || file == ''}>UPLOAD</Button>
        <Box>
            <Typography variant="h3">
                {`${user?.user?.first_name} ${user?.user?.last_name}`}
            </Typography>
            <Typography variant="h6">
                 {user.user.email}
            </Typography>
        </Box>
    </Container>
</> */}