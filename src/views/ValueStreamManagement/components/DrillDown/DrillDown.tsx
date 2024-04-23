import { makeStyles } from "@material-ui/styles";
import { useState} from "react";
import TabView from "../TabView";
import InsertChartOutlinedRoundedIcon from '@material-ui/icons/InsertChartOutlinedRounded';
import BaseModal from "components/UI/BaseModal/BaseModal2";

const useStyles = makeStyles(() => ({
  // icon wrapper
  sm: {
    right: 10,
    display: 'flex',
    position: 'absolute',
    bottom: 10,
  },
  chartIcon: {
    color: '#555D62',
    cursor: 'pointer',
    transition: 'transform 300ms',
    
    "&:hover" : {
      color: '#0077C8',
      transform: 'translateY(-5px)'
    }
  },
  closeIcon: {
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 300ms',
    fontSize: '18px',

    "&:hover" : {
      transform: 'translateY(-3px)'
    }
  },
  modalTitle: {
    display: 'flex',
    position: 'absolute',
    fontFamily: "Open Sans",
    fontSize: '20px',
    color: '#707070',
    textAlign: 'left',
    fontWeight: 400,
    paddingTop: 15
  },
  modalBody: {
    paddingTop: 50,
    padding: 10,
    width: "100%"
  }
}));

type Props = { 
  tabViewTitles: string[],
  tabComponents: React.ReactNode[];
  customProps?: any;
  widgetName?: string;
  onClick?: (boolean) => void;
}

export const DrillDown = ({
  tabViewTitles,
  tabComponents,
  customProps,
  widgetName,
  onClick
} : Props) => {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className={classes.sm}>
      {/* <BaseModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        maxWidth="xl"> */}
       <BaseModal maxWidth="lg" open={modalIsOpen} setOpen={setModalIsOpen} title={`${widgetName} - Drill Down`}>
        {/* <div className={classes.modalTitle}>
          {widgetName} - Drill Down
        </div> */}
        <div className={classes.modalBody}>
          <TabView
            tabTitles={tabViewTitles}
            tabContents={tabComponents}
            customProps={{...customProps}}
          />
        </div>
      </BaseModal>   

      <InsertChartOutlinedRoundedIcon 
        className={classes.chartIcon} 
        onClick={() => {
          setModalIsOpen(true);
          onClick?.(true)}} />
    </div>
  );
}