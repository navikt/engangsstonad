import * as React from 'react';
import CountryPicker from 'components/country-picker/CountryPicker';

export interface Props {}

export class Workbench extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <CountryPicker
          label="Velg land"
          language="no"
          utenlandsoppholdListe={[]}
          addVisit={() => null}
          deleteVisit={() => null}
          editVisit={() => null}
        />
      </div>
    );
  }
}
export default Workbench;
