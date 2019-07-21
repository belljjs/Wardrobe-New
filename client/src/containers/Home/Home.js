import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import weatherShot from '../../asset/image/weatherShot.png';
import closetSelectedShot from '../../asset/image/closetSelectedShot.png';
import closetModalShot from '../../asset/image/closetModalShot.png';
import deleteModalShot from '../../asset/image/deleteModalShot.png';
import deleteShot from '../../asset/image/deleteShot.png';
import itemInfoShot from '../../asset/image/itemInfoShot.png';
import itemFileShot from '../../asset/image/itemFileShot.png';
import outfitShot from '../../asset/image/outfitShot.png';
// import addItemShot from '../../asset/image/addItemShot.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
// import { faSignInAlt} from '@fortawesome/free-solid-svg-icons'
// import { faPlus} from '@fortawesome/free-solid-svg-icons'
// import { faMinus} from '@fortawesome/free-solid-svg-icons'
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './Home.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
      label: 'Start with Weather',
      description: 'Find the weather of a city and get the proposal for the weather.',
      imgPath: weatherShot
    },
    {
      label: 'Open Closet',
      description: ' Click items to select for an outfit. ',
      imgPath: closetSelectedShot
    },
    {
      label: 'Confirm Outfit',
      description: 'Looks good? Then save it ',
      imgPath: closetModalShot
    },
    {
      label: 'Create Item',
      description: ' Choose a image of the item from your memory ',
      imgPath: itemFileShot
    },
    {
        label: 'Upload Items',
        description: ' Input info and submit for uploading ',
        imgPath: itemInfoShot
    },
    {
      label: 'Delete Item',
      description: 'Choose an item to delete ',
      imgPath: deleteShot
    },
    {
    label: 'Delete confirm',
    description: 'Make sure for the deleting ',
    imgPath: deleteModalShot
    },
    {
    label: 'Show Outfit List',
    description: 'Display all the outfits you have made',
    imgPath: outfitShot
    },
  ];

  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 600,
      flexGrow: 1,
      margin: 'auto',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 85,
      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
    },
    img: {
      maxHeight: 320,
      display: 'block',
      maxWidth: 600,
      overflow: 'hidden',
      width: '100%',
      margin: 'auto',
    }
  }));

const home =() => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;
  
    function handleNext() {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  
    function handleBack() {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  
    function handleStepChange(step) {
      setActiveStep(step);
    }
  

    return (
        <div>
            <h3 className="titleHome"> Plan Your Outfit</h3>

            <div className={classes.root} >
                <Paper square elevation={0} className={classes.header}>
                    <Typography component="div">
                        <Box className='box' textAlign='center' fontWeight="fontWeightBold" fontSize="h6.fontSize">
                        {tutorialSteps[activeStep].label}
                        </Box>
                        <Box textAlign='center' >
                        {tutorialSteps[activeStep].description}
                        </Box>
                        
                    </Typography>
                </Paper>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {tutorialSteps.map((step, index) => (
                    <div key={step.label} >
                        {Math.abs(activeStep - index) <= 2 ? (
                        <img className={classes.img} src={step.imgPath} alt={step.label} />
                        ) : null}
                    </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={activeStep}
                    nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                    }
                    backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                    }
                />
            </div>
        </div>
    );
}

export default home;