import React from 'react';
import {TouchableOpacity as TouchableOpacityGesture} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import styles from '../styles/styles';

const propTypes = {
    /** Currency symbol of selected currency */
    currencySymbol: PropTypes.string.isRequired,

    /** Function to call when currency button is pressed */
    onCurrencyButtonPress: PropTypes.func.isRequired,
};

function CurrencySymbolButton(props) {
    return (
        <TouchableOpacityGesture onPress={props.onCurrencyButtonPress}>
            {/* gesture touchable to fix long press inconsistency */}
            <TouchableOpacity pointerEvents="none" activeOpacity={1}>
                {/* react touchable as child to allow touch hovering on desktop */}
                <Text style={styles.iouAmountText}>{props.currencySymbol}</Text>
            </TouchableOpacity>
        </TouchableOpacityGesture>
    );
}

CurrencySymbolButton.propTypes = propTypes;
CurrencySymbolButton.displayName = 'CurrencySymbolButton';

export default CurrencySymbolButton;
