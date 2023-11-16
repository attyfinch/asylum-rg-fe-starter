import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// from Data Vis/charts components
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';

// Update/Clear Query Buttons
import YearLimitsSelect from './YearLimitsSelect';

// Graph selection buttons (3) determines view
import ViewSelect from './ViewSelect';

// Action Creator that resets viz query
import { resetVisualizationQuery } from '../../../state/actionCreators';

// Test Data - I will be replacing this with the API
import test_data from '../../../data/test_data.json';

// Utility + Styles
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }

  /*
    API Call Helper Function
    I made this modular so that it's easy to incorporate new endpoints as they
    are built. 
  */

  async function fetchAsylumData(type) {
    const res = await axios.get(
      `https://hrf-asylum-be-b.herokuapp.com/cases/${type}`
    );
    return res.data;
  }

  /*
    I updated this function to make it async to allow for simultaneous API calls.
    New data can easily be added using the fetchAsylumData helper function by simply
    adding additional calls.

    Notes:
    - Years, view, and office arguments removed b/c they are not needed for 
      the app to function.
  */

  async function updateStateWithNewData(stateSettingCallback) {
    try {
      const [fiscalData, citizenshipData] = await Promise.all([
        fetchAsylumData('fiscalSummary'),
        fetchAsylumData('citizenshipSummary'),
      ]);
      // This callback function sends the data to state (via the YearLimitsSelect component)
      // Note the shape of the data, this is important and will break if not formatted correctly.
      stateSettingCallback([
        { ...fiscalData, citizenshipResults: citizenshipData },
      ]);
      return [{ ...fiscalData, citizenshipResults: citizenshipData }];
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}
export default connect(null, {})(GraphWrapper);
