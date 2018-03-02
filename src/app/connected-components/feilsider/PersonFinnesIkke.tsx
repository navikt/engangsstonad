import * as React from 'react';
import { connect } from 'react-redux';
import Person from '../../types/domain/Person';
import { ExternalProps } from '../../types';
import { personFinnes } from 'util/validation/validationUtils';

interface StateProps {
    person: Person;
}

type Props = StateProps & ExternalProps;

class PersonFinnesIkke extends React.Component<Props> {
    render() {
        const { person, history } = this.props;
        if (personFinnes(person)) {
            history.goBack();
        }
        return (<div>Personen finnes ikke</div>);
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
});

export default connect(mapStateToProps)(PersonFinnesIkke);
