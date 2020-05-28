import React, { useState } from 'react'
import { makeStyles, Modal, Backdrop, Fade, Typography, Button } from '@material-ui/core'
import JobInput from './JobInput'
import { IoLogoUsd } from 'react-icons/io'
import { FaRoad, FaBox, FaCity, FaBuilding, FaHouseDamage } from 'react-icons/fa'
import { ROOT_API } from '../../api_endpoint'
import axios from 'axios'
import { useAuth } from '../../store'


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        backgroundColor: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        paddingBottom: 20,
        borderRadius: 10,
        width: 900,
        outline: "none",
        maxHeight: "80%",
        overflowY: "auto"
    },
    inputLabel: {
        "&$cssFocused": {
          color: "green",
        },
      },
      textOutlineInput: {
        '&$cssFocused $notchedOutline': {
          borderColor: `#27ae60 !important`,      
        }
      },
      cssFocused: {},
      notchedOutline: {
        borderWidth: '1px',    
      },
}))

export default function NewJobModal(props) {

    const classes = useStyles()
    const { authToken } = useAuth()

    const [moneyMade, setMoneyMade] = useState("")
    const [kmDriven, setKmDriven] = useState("")
    const [goodsType, setGoodsType] = useState("")
    const [fromCity, setFromCity] = useState("")
    const [toCity, setToCity] = useState("")
    const [fromCompany, setFromCompany] = useState("")
    const [toCompany, setToCompany] = useState("")
    const [damage, setDamage] = useState("")

    const _submitJob = () => {
        axios.post(`${ROOT_API}/v1/jobs/create`, {
            km_driven: kmDriven,
            to_city: toCity,
            from_city: fromCity,
            from_company: fromCompany,
            to_company: toCompany,
            damage: damage,
            goods_type: goodsType,
            money_made: moneyMade
        }, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }).then(res => {
            console.log(res.data)
            props.closeModal()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.modalOpen}
                onClose={props.closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={props.modalOpen}>
                <div className={classes.modalPaper}>
                    <Typography variant="h4">Submit New Job</Typography>
                    <Typography variant="h6">Please fill out every field in this form to successfully submit the job you completed.</Typography>
                    {console.log(toCompany)}
                    <JobInput icon={<IoLogoUsd/>} value={moneyMade} setValue={(e) => setMoneyMade(e)} label="ex. 45000" extraMessage='Do not type "." or "," just type the number' title="Money Earned"/>
                    <JobInput icon={<FaRoad/>} value={kmDriven} setValue={(e) => setKmDriven(e)} label="ex. 320" extraMessage='Do not type "km" just type the number' title="Kilometers Driven"/>
                    <JobInput icon={<FaBox/>} value={goodsType} setValue={(e) => setGoodsType(e)} label="ex. Fruits" title="Goods Type"/>
                    <JobInput icon={<FaCity/>} value={fromCity} setValue={(e) => setFromCity(e)} label="ex. Frankfurt" title="Starting City"/>
                    <JobInput icon={<FaCity/>} value={toCity} setValue={(e) => setToCity(e)} label="ex. London" title="Destination City"/>
                    <JobInput icon={<FaBuilding/>} value={fromCompany} setValue={(e) => setFromCompany(e)} label="ex. Drekkar Trans" title="Starting Company"/>
                    <JobInput icon={<FaBuilding/>} value={toCompany} setValue={(e) => setToCompany(e)} label="ex. ACC" title="Destination Company"/>
                    <JobInput icon={<FaHouseDamage/>} value={damage} setValue={(e) => setDamage(e)} label="ex. 5 (if there is no damage you can leave this empty" title="Cargo Damage" extraMessage='Do not type "%" just type the number'/>

                    <Button style={{backgroundColor: props.vtc.main_color, color: "white", marginTop: 20}} onClick={_submitJob}>Submit Job</Button>
                </div>
                </Fade>
            </Modal>
        </div>
    )
}