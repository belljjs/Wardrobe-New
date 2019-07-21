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
import startWeather from '../../asset/image/startWeather.png';
import closetSelectedShot from '../../asset/image/closetSelectedShot.png';
import closetModalShot from '../../asset/image/closetModalShot.png';
import deleteConfirm from '../../asset/image/deleteConfirm.png';
import deleteItem from '../../asset/image/deleteItem.png';
import itemInfoShot from '../../asset/image/itemInfoShot.png';
import addItemShot from '../../asset/image/addItemShot.png';
import outfitList from '../../asset/image/outfitList.png';
import './Home.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
      label: 'Start with Weather',
      description: 'Find the weather of a city and get the proposal for the weather.',
      imgPath: startWeather
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
      imgPath: addItemShot
    },
    {
        label: 'Upload Items',
        description: ' Input info and submit for uploading ',
        imgPath: itemInfoShot
    },
    {
      label: 'Delete Item',
      description: 'Choose an item to delete ',
      imgPath: deleteItem
    },
    {
    label: 'Confirm Deleting',
    description: 'Make sure the item for deleting ',
    imgPath: deleteConfirm
    },
    {
    label: 'Show Outfit List',
    description: 'Display all the outfits you have made',
    imgPath: outfitList
    },
  ];

  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 600,
      flexGrow: 1,
      margin: 'auto',
      backgroundColor: 'whitesmoke'
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 85,
      paddingLeft: theme.spacing(4),
      backgroundColor: 'whitesmoke',
    },
    img: {
      maxHeight: 320,
      display: 'block',
      maxWidth: 600,
      overflow: 'hidden',
      width: '90%',
      margin: 'auto'
    },
    autoplay: {
        backgroundColor: 'whitesmoke'
    },
    stepper: {
        backgroundColor: 'whitesmoke'
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
                    className={classes.autoplay}
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
                    className={classes.stepper}
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