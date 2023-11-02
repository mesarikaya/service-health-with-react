import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Domain from '../hierarchy/domain';
import Technology from '../hierarchy/techArea';
import Category from '../hierarchy/category';
import Criteria from '../hierarchy/criteria';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store/store';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Tabcomponent(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.handleChange(newValue)
  };

  return (
    <div className='tabdatas'>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Domain" {...a11yProps(0)} />
          <Tab label="Technology Area" {...a11yProps(1)} />
          <Tab label="Category" {...a11yProps(2)} />
          <Tab label="Criteria" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Domain setSnack={props?.setSnack} message={props?.message} setDuration={props?.setDuration} setVariant={props?.setVariant} loadDomain={props.loadDomain} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Technology setSnack={props?.setSnack} message={props?.message} setDuration={props?.setDuration} setVariant={props?.setVariant} loadTechArea={props.loadTechArea} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Category setSnack={props?.setSnack} message={props?.message} setDuration={props?.setDuration} setVariant={props?.setVariant} loadCategory={props.loadCategory} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Criteria setSnack={props?.setSnack} message={props?.message} setDuration={props?.setDuration} setVariant={props?.setVariant} loadCriteria={props.loadCriteria} />
      </TabPanel>
    </Box>
    </div>
  );
}
